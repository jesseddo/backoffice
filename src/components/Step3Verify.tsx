import { useState } from 'react';
import { FEEDBACK_SAMPLES, REVIEWER_CONFIDENCE } from '../data';
import type {
  FeedbackLevel,
  FeedbackSample,
  LookFor,
  LookForsMap,
  Question,
  ScoringCriteria,
} from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Checkbox } from './ui/Checkbox';

type Step3VerifyProps = {
  questions: Question[];
  lookFors: LookForsMap;
  scoring: ScoringCriteria;
  onToggleLookFor: (questionId: string, lookForId: string) => void;
  onEditLookFor: (questionId: string, lookForId: string, text: string) => void;
  onDeleteLookFor: (questionId: string, lookForId: string) => void;
  onAddLookFor: (questionId: string) => void;
  onChangeScoring: (next: ScoringCriteria) => void;
  onBack: () => void;
  onNext: () => void;
};

function ConfidenceBar() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="text-xs text-neutral-600 whitespace-nowrap">
        Reviewer confidence
      </div>
      <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-eddo-500 rounded-full transition-all"
          style={{ width: `${REVIEWER_CONFIDENCE}%` }}
        />
      </div>
      <div className="text-xs font-medium text-neutral-700 whitespace-nowrap">
        {REVIEWER_CONFIDENCE}%
      </div>
    </div>
  );
}

function LookForRow({
  lf,
  autoFocus,
  onToggle,
  onEdit,
  onDelete,
}: {
  lf: LookFor;
  autoFocus: boolean;
  onToggle: () => void;
  onEdit: (text: string) => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-2 py-1.5 ${
        lf.included ? '' : 'opacity-50'
      }`}
    >
      <Checkbox checked={lf.included} onChange={onToggle} />
      <input
        type="text"
        value={lf.text}
        autoFocus={autoFocus}
        placeholder="Describe what to look for…"
        onChange={(e) => onEdit(e.target.value)}
        className={`flex-1 bg-transparent text-[13px] text-neutral-900 placeholder:text-neutral-400 outline-none border-b border-transparent hover:border-neutral-200 focus:border-eddo-500 transition-colors py-1 ${
          lf.included ? '' : 'line-through decoration-neutral-400'
        }`}
      />
      <button
        type="button"
        aria-label="Delete look-for"
        onClick={onDelete}
        className="opacity-50 hover:opacity-100 text-neutral-500 hover:text-red-600 transition-colors p-1 -m-1"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

function QuestionLookForGroup({
  question,
  lookFors,
  onToggle,
  onEdit,
  onDelete,
  onAdd,
}: {
  question: Question;
  lookFors: LookFor[];
  onToggle: (lfId: string) => void;
  onEdit: (lfId: string, text: string) => void;
  onDelete: (lfId: string) => void;
  onAdd: () => void;
}) {
  const lastLfId = lookFors[lookFors.length - 1]?.id;
  return (
    <div className="border border-neutral-200 rounded-md px-4 py-3 bg-white mb-3 last:mb-0">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-[13px] font-medium text-eddo-600 bg-eddo-50 px-2 py-0.5 rounded min-w-[36px] text-center mt-0.5">
          {question.prefix}
        </span>
        <div className="text-[13px] text-neutral-700 leading-snug pt-1">
          {question.text || (
            <span className="italic text-neutral-400">(no question text)</span>
          )}
        </div>
      </div>
      <div className="pl-1">
        {lookFors.length === 0 ? (
          <div className="text-xs text-neutral-500 italic py-1.5">
            No look-fors yet. Add one below.
          </div>
        ) : (
          lookFors.map((lf) => (
            <LookForRow
              key={lf.id}
              lf={lf}
              autoFocus={lf.id === lastLfId && lf.text === ''}
              onToggle={() => onToggle(lf.id)}
              onEdit={(text) => onEdit(lf.id, text)}
              onDelete={() => onDelete(lf.id)}
            />
          ))
        )}
        <button
          type="button"
          onClick={onAdd}
          className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-medium text-eddo-600 hover:text-eddo-700"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add look-for
        </button>
      </div>
    </div>
  );
}

function ScoringField({
  level,
  label,
  value,
  onChange,
}: {
  level: FeedbackLevel;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const badgeStyles: Record<FeedbackLevel, string> = {
    strong: 'bg-level-strong-bg text-level-strong-text',
    developing: 'bg-level-develop-bg text-level-develop-text',
    emerging: 'bg-level-emerge-bg text-level-emerge-text',
  };
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeStyles[level]}`}
        >
          {label}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full bg-neutral-50 border border-neutral-200 rounded-md px-3 py-2 text-[13px] text-neutral-900 leading-relaxed outline-none focus:border-eddo-500 focus:ring-1 focus:ring-eddo-500/30 transition-colors resize-y"
      />
    </div>
  );
}

const SAMPLE_LEVEL_STYLES: Record<FeedbackLevel, { label: string; classes: string }> = {
  strong: {
    label: 'Strong',
    classes: 'bg-level-strong-bg text-level-strong-text',
  },
  developing: {
    label: 'Developing',
    classes: 'bg-level-develop-bg text-level-develop-text',
  },
  emerging: {
    label: 'Emerging',
    classes: 'bg-level-emerge-bg text-level-emerge-text',
  },
};

function SampleCard({ sample }: { sample: FeedbackSample }) {
  const style = SAMPLE_LEVEL_STYLES[sample.level];
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-md px-4 py-3.5 mb-2.5 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${style.classes}`}
        >
          {style.label}
        </span>
        <span className="text-xs text-neutral-500">{sample.questionRef}</span>
      </div>
      <div className="text-[13px] italic text-neutral-600 leading-relaxed mb-2">
        &ldquo;{sample.studentResponse}&rdquo;
      </div>
      <div className="text-[13px] text-neutral-900 leading-relaxed pl-3 border-l-2 border-eddo-500">
        {sample.aiFeedback}
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`transition-transform ${open ? 'rotate-90' : ''}`}
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Step3Verify({
  questions,
  lookFors,
  scoring,
  onToggleLookFor,
  onEditLookFor,
  onDeleteLookFor,
  onAddLookFor,
  onChangeScoring,
  onBack,
  onNext,
}: Step3VerifyProps) {
  const [testOpen, setTestOpen] = useState(false);

  return (
    <div>
      <Card
        title="Verify AI understanding"
        subtitle="Review what the AI is looking for. Edit, remove, or add criteria — these will be used to score student responses."
      >
        <ConfidenceBar />
      </Card>

      <Card title="Look-fors by question" className="!pb-5">
        {questions.length === 0 ? (
          <div className="text-sm text-neutral-500 py-2">
            No questions to verify. Go back and add at least one question.
          </div>
        ) : (
          questions.map((q) => (
            <QuestionLookForGroup
              key={q.id}
              question={q}
              lookFors={lookFors[q.id] ?? []}
              onToggle={(lfId) => onToggleLookFor(q.id, lfId)}
              onEdit={(lfId, text) => onEditLookFor(q.id, lfId, text)}
              onDelete={(lfId) => onDeleteLookFor(q.id, lfId)}
              onAdd={() => onAddLookFor(q.id)}
            />
          ))
        )}
      </Card>

      <Card
        title="Scoring criteria"
        subtitle="Edit the descriptions the AI uses to assign each performance level."
      >
        <ScoringField
          level="strong"
          label="Strong"
          value={scoring.strong}
          onChange={(v) => onChangeScoring({ ...scoring, strong: v })}
        />
        <ScoringField
          level="developing"
          label="Developing"
          value={scoring.developing}
          onChange={(v) => onChangeScoring({ ...scoring, developing: v })}
        />
        <ScoringField
          level="emerging"
          label="Emerging"
          value={scoring.emerging}
          onChange={(v) => onChangeScoring({ ...scoring, emerging: v })}
        />
      </Card>

      <div className="bg-white border border-neutral-200 rounded-lg mb-4 overflow-hidden">
        <button
          type="button"
          onClick={() => setTestOpen((o) => !o)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors"
          aria-expanded={testOpen}
        >
          <div className="flex items-center gap-2 text-left">
            <ChevronIcon open={testOpen} />
            <span className="text-base font-medium text-neutral-900">
              Run a test
            </span>
            <span className="text-xs text-neutral-500">
              See how the AI would respond to sample answers
            </span>
          </div>
        </button>
        {testOpen && (
          <div className="px-6 pb-5 pt-1 border-t border-neutral-200">
            <div className="text-[13px] text-neutral-600 mb-3 mt-3">
              We generated sample student responses and ran them through the
              reviewer using your current look-fors and scoring criteria.
            </div>
            {FEEDBACK_SAMPLES.map((s) => (
              <SampleCard key={s.id} sample={s} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-5">
        <Button onClick={onBack}>← Back</Button>
        <Button variant="primary" onClick={onNext}>
          Looks good, assign
        </Button>
      </div>
    </div>
  );
}
