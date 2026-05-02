import { useState } from 'react';
import { INITIAL_QUESTIONS, INITIAL_TEACHERS } from './data';
import type { Phase, Question, Teacher } from './types';
import { Step1Upload } from './components/Step1Upload';
import { Step2Review } from './components/Step2Review';
import { Step3Preview } from './components/Step3Preview';
import { Step4Assign } from './components/Step4Assign';
import { Step5Confirm } from './components/Step5Confirm';
import { Stepper } from './components/Stepper';
import { SuccessState } from './components/SuccessState';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function App() {
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [dueDate, setDueDate] = useState('2026-05-15');
  const [phase, setPhase] = useState<Phase>('idle');
  const [loadingMsg, setLoadingMsg] = useState('Setting up Google Forms...');

  const handleRemoveQuestion = (id: string) => {
    setQuestions((qs) => qs.filter((q) => q.id !== id));
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
                onRemoveQuestion={handleRemoveQuestion}
                onBack={() => setStep(0)}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step3Preview
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
