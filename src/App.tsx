import { useState } from 'react';
import {
  INITIAL_LOOK_FORS,
  INITIAL_META,
  INITIAL_QUESTIONS,
  INITIAL_SCORING,
  INITIAL_TEACHERS,
} from './data';
import type {
  AssessmentMeta,
  LookFor,
  LookForsMap,
  Phase,
  Question,
  QuestionKind,
  ScoringCriteria,
  Teacher,
} from './types';
import { Step1Upload } from './components/Step1Upload';
import { Step2Review } from './components/Step2Review';
import { Step3Verify } from './components/Step3Verify';
import { Step4Assign } from './components/Step4Assign';
import { Step5Confirm } from './components/Step5Confirm';
import { Stepper } from './components/Stepper';
import { SuccessState } from './components/SuccessState';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);

function nextQuestionPrefix(questions: Question[]): string {
  const numbers = questions
    .map((q) => parseInt(q.prefix.replace(/^Q/i, ''), 10))
    .filter((n) => !Number.isNaN(n));
  const max = numbers.length ? Math.max(...numbers) : 0;
  return `Q${max + 1}`;
}

const KIND_HINTS: Record<QuestionKind, string> = {
  text: 'Text response',
  cer: 'Text response (CER)',
  drawing: 'Drawing response',
};

export default function App() {
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [meta, setMeta] = useState<AssessmentMeta>(INITIAL_META);
  const [lookFors, setLookFors] = useState<LookForsMap>(INITIAL_LOOK_FORS);
  const [scoring, setScoring] = useState<ScoringCriteria>(INITIAL_SCORING);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [dueDate, setDueDate] = useState('2026-05-15');
  const [phase, setPhase] = useState<Phase>('idle');
  const [loadingMsg, setLoadingMsg] = useState('Setting up Google Forms...');

  const handleRemoveQuestion = (id: string) => {
    setQuestions((qs) => qs.filter((q) => q.id !== id));
  };

  const handleEditQuestion = (id: string, text: string) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const handleChangeQuestionKind = (id: string, kind: QuestionKind) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === id ? { ...q, kind, hint: KIND_HINTS[kind] } : q,
      ),
    );
  };

  const handleAddQuestion = () => {
    setQuestions((qs) => {
      const id = `new-${newId()}`;
      const newQ: Question = {
        id,
        prefix: nextQuestionPrefix(qs),
        text: '',
        kind: 'text',
        hint: 'Text response',
        addedByUser: true,
        committed: false,
      };
      return [...qs, newQ];
    });
  };

  const handleSetCommitted = (id: string, committed: boolean) => {
    setQuestions((qs) =>
      qs.map((q) => (q.id === id ? { ...q, committed } : q)),
    );
  };

  const handleToggleLookFor = (questionId: string, lookForId: string) => {
    setLookFors((map) => ({
      ...map,
      [questionId]: (map[questionId] ?? []).map((lf) =>
        lf.id === lookForId ? { ...lf, included: !lf.included } : lf,
      ),
    }));
  };

  const handleEditLookFor = (
    questionId: string,
    lookForId: string,
    text: string,
  ) => {
    setLookFors((map) => ({
      ...map,
      [questionId]: (map[questionId] ?? []).map((lf) =>
        lf.id === lookForId ? { ...lf, text } : lf,
      ),
    }));
  };

  const handleDeleteLookFor = (questionId: string, lookForId: string) => {
    setLookFors((map) => ({
      ...map,
      [questionId]: (map[questionId] ?? []).filter(
        (lf) => lf.id !== lookForId,
      ),
    }));
  };

  const handleAddLookFor = (questionId: string) => {
    setLookFors((map) => {
      const lf: LookFor = {
        id: `${questionId}-lf-${newId()}`,
        text: '',
        included: true,
      };
      return {
        ...map,
        [questionId]: [...(map[questionId] ?? []), lf],
      };
    });
  };

  const handleToggleTeacher = (id: string) => {
    setTeachers((ts) =>
      ts.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)),
    );
  };

  const handleToggleAll = () => {
    setTeachers((ts) => {
      const allChecked = ts.every((t) => t.checked);
      return ts.map((t) => ({ ...t, checked: !allChecked }));
    });
  };

  const handleCreate = async () => {
    setPhase('creating');
    setLoadingMsg('Setting up Google Forms...');
    await sleep(900);
    setLoadingMsg('Creating workspace entries...');
    await sleep(900);
    setLoadingMsg('Done!');
    await sleep(400);
    setPhase('done');
  };

  const handleCreateAnother = () => {
    setQuestions(INITIAL_QUESTIONS);
    setMeta(INITIAL_META);
    setLookFors(INITIAL_LOOK_FORS);
    setScoring(INITIAL_SCORING);
    setTeachers(INITIAL_TEACHERS);
    setDueDate('2026-05-15');
    setPhase('idle');
    setLoadingMsg('Setting up Google Forms...');
    setStep(0);
  };

  const showStepperAndContent = phase !== 'done';

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-wizard mx-auto px-6 py-10">
        <header className="mb-8">
          <div className="text-xs uppercase tracking-wider text-eddo-600 font-medium mb-1">
            Eddo
          </div>
          <h1 className="text-xl font-medium text-neutral-900">
            Create assessment
          </h1>
        </header>

        {showStepperAndContent && (
          <Stepper current={step} onStepClick={setStep} />
        )}

        {phase === 'done' ? (
          <SuccessState
            teachers={teachers}
            onCreateAnother={handleCreateAnother}
          />
        ) : (
          <>
            {step === 0 && <Step1Upload onNext={() => setStep(1)} />}
            {step === 1 && (
              <Step2Review
                questions={questions}
                meta={meta}
                onMetaChange={setMeta}
                onRemoveQuestion={handleRemoveQuestion}
                onEditQuestion={handleEditQuestion}
                onChangeQuestionKind={handleChangeQuestionKind}
                onAddQuestion={handleAddQuestion}
                onSetCommitted={handleSetCommitted}
                onBack={() => setStep(0)}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step3Verify
                questions={questions}
                lookFors={lookFors}
                scoring={scoring}
                onToggleLookFor={handleToggleLookFor}
                onEditLookFor={handleEditLookFor}
                onDeleteLookFor={handleDeleteLookFor}
                onAddLookFor={handleAddLookFor}
                onChangeScoring={setScoring}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <Step4Assign
                teachers={teachers}
                dueDate={dueDate}
                onToggleTeacher={handleToggleTeacher}
                onToggleAll={handleToggleAll}
                onChangeDueDate={setDueDate}
                onBack={() => setStep(2)}
                onNext={() => setStep(4)}
              />
            )}
            {step === 4 && (
              <Step5Confirm
                questions={questions}
                meta={meta}
                teachers={teachers}
                dueDate={dueDate}
                phase={phase}
                loadingMsg={loadingMsg}
                onBack={() => setStep(3)}
                onCreate={handleCreate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
