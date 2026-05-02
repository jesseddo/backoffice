import { ASSESSMENT_META } from '../data';
import type { Question } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { InfoBanner } from './ui/InfoBanner';

type Step2ReviewProps = {
  questions: Question[];
  onRemoveQuestion: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
};

function MetaItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-md px-3.5 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-neutral-500 mb-0.5">
        {label}
      </div>
      <div className="text-sm font-medium text-neutral-900">{value}</div>
    </div>
  );
}

function QuestionRow({
  q,
  onRemove,
}: {
  q: Question;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-neutral-200 last:border-b-0 group">
      <span className="text-[13px] font-medium text-eddo-600 bg-eddo-50 px-2 py-0.5 rounded min-w-[36px] text-center">
        {q.prefix}
      </span>
      <div className="flex-1">
        <div className="text-sm text-neutral-900 leading-relaxed">{q.text}</div>
        <div
          className={`text-[11px] mt-0.5 ${
            q.warning ? 'text-amber-700' : 'text-neutral-500'
          }`}
        >
          {q.warning && (
            <span className="inline-block mr-1" aria-hidden>
              ⚠
            </span>
          )}
          {q.hint}
        </div>
      </div>
      <button
        type="button"
        aria-label={`Remove ${q.prefix}`}
        onClick={onRemove}
        className="opacity-50 hover:opacity-100 text-neutral-500 hover:text-red-600 transition-colors p-1 -m-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

export function Step2Review({
  questions,
  onRemoveQuestion,
  onBack,
  onNext,
}: Step2ReviewProps) {
  return (
    <div>
      <InfoBanner>
        We extracted {questions.length} question
        {questions.length === 1 ? '' : 's'} from the uploaded document. Review
        and edit below.
      </InfoBanner>
      <Card
        title="Review extracted questions"
        subtitle="Confirm the questions look right. You can remove or edit any question."
      >
        <div className="grid grid-cols-2 gap-3 mb-4">
          <MetaItem label="Subject" value={ASSESSMENT_META.subject} />
          <MetaItem label="Grade level" value={ASSESSMENT_META.gradeLevel} />
          <MetaItem label="Unit" value={ASSESSMENT_META.unit} />
          <MetaItem label="Questions detected" value={questions.length} />
        </div>

        <div>
          {questions.map((q) => (
            <QuestionRow
              key={q.id}
              q={q}
              onRemove={() => onRemoveQuestion(q.id)}
            />
          ))}
          {questions.length === 0 && (
            <div className="text-sm text-neutral-500 py-6 text-center">
              No questions remaining. Go back and re-upload your assessment.
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-between mt-5">
        <Button onClick={onBack}>← Back</Button>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={questions.length === 0}
        >
          Generate feedback preview
        </Button>
      </div>
    </div>
  );
}
