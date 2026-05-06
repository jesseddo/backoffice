import { META_PLACEHOLDERS } from '../data';
import type { AssessmentMeta, Question, QuestionKind } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { InfoBanner } from './ui/InfoBanner';

type Step2ReviewProps = {
  questions: Question[];
  meta: AssessmentMeta;
  onMetaChange: (next: AssessmentMeta) => void;
  onRemoveQuestion: (id: string) => void;
  onEditQuestion: (id: string, text: string) => void;
  onChangeQuestionKind: (id: string, kind: QuestionKind) => void;
  onAddQuestion: () => void;
  onSetCommitted: (id: string, committed: boolean) => void;
  onBack: () => void;
  onNext: () => void;
};

const TYPE_OPTIONS: { kind: QuestionKind; label: string }[] = [
  { kind: 'text', label: 'Text' },
  { kind: 'cer', label: 'CER' },
];

function TypePill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[11px] leading-none px-2.5 py-1 rounded-full transition-colors ${
        active
          ? 'bg-eddo-500 text-white'
          : 'bg-white text-neutral-600 border border-neutral-200 hover:border-eddo-300 hover:text-eddo-600'
      }`}
    >
      {children}
    </button>
  );
}

function DraftCompose({
  q,
  autoFocus,
  onEdit,
  onChangeKind,
  onRemove,
  onSave,
}: {
  q: Question;
  autoFocus: boolean;
  onEdit: (text: string) => void;
  onChangeKind: (kind: QuestionKind) => void;
  onRemove: () => void;
  onSave: () => void;
}) {
  const trimmed = q.text.trim();
  const canSave = trimmed.length > 0;
  return (
    <div className="rounded-md border border-dashed border-eddo-300 bg-eddo-50/40 p-2.5">
      <div className="flex items-center gap-1.5 mb-1.5">
        {TYPE_OPTIONS.map((opt) => (
          <TypePill
            key={opt.kind}
            active={q.kind === opt.kind}
            onClick={() => onChangeKind(opt.kind)}
          >
            {opt.label}
          </TypePill>
        ))}
      </div>
      <textarea
        value={q.text}
        autoFocus={autoFocus}
        placeholder="Type your question…"
        onChange={(e) => onEdit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && q.text === '') {
            e.preventDefault();
            onRemove();
            return;
          }
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canSave) {
            e.preventDefault();
            onSave();
          }
        }}
        rows={1}
        className="w-full bg-white border border-neutral-200 rounded-md px-2.5 py-1.5 text-sm text-neutral-900 leading-relaxed placeholder:text-neutral-400 outline-none focus:border-eddo-500 focus:ring-1 focus:ring-eddo-500/30 resize-none [field-sizing:content] min-h-[2.25rem]"
      />
      <div className="flex items-center justify-between mt-2 gap-2">
        <span className="text-[11px] text-eddo-700 font-medium truncate">
          Added by you · {q.hint}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {q.text === '' ? (
            <span className="text-[11px] text-neutral-400 whitespace-nowrap">
              Press Esc to remove
            </span>
          ) : (
            <span className="text-[11px] text-neutral-400 whitespace-nowrap hidden sm:inline">
              ⌘ + Enter to save
            </span>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className="text-[12px] font-medium px-3 py-1 rounded-md bg-eddo-500 text-white hover:bg-eddo-600 transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function CommittedRow({
  q,
  onEdit,
}: {
  q: Question;
  onEdit: () => void;
}) {
  return (
    <>
      <div className="text-sm text-neutral-900 leading-relaxed">{q.text}</div>
      <div className="text-[11px] mt-0.5 text-eddo-700 font-medium flex items-center gap-1.5">
        <span>Added by you · {q.hint}</span>
        <span className="text-neutral-300" aria-hidden>
          ·
        </span>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-eddo-600 hover:text-eddo-700 hover:underline"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden
          >
            <path
              d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Edit
        </button>
      </div>
    </>
  );
}

function MetaInput({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1.5 cursor-text focus-within:border-eddo-500 focus-within:ring-1 focus-within:ring-eddo-500/30 transition-colors">
      <span className="block text-[10px] uppercase tracking-wide text-neutral-500 leading-tight">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-[13px] font-medium text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal outline-none leading-tight"
      />
    </label>
  );
}

function MetaStatic({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1.5">
      <div className="text-[10px] uppercase tracking-wide text-neutral-500 leading-tight">
        {label}
      </div>
      <div className="text-[13px] font-medium text-neutral-900 leading-tight">
        {value}
      </div>
    </div>
  );
}

function QuestionRow({
  q,
  autoFocus,
  onRemove,
  onEdit,
  onChangeKind,
  onSave,
  onReopen,
}: {
  q: Question;
  autoFocus: boolean;
  onRemove: () => void;
  onEdit: (text: string) => void;
  onChangeKind: (kind: QuestionKind) => void;
  onSave: () => void;
  onReopen: () => void;
}) {
  const isDraft = !!q.addedByUser && !q.committed;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-neutral-200 last:border-b-0 group">
      <span className="text-[13px] font-medium text-eddo-600 bg-eddo-50 px-2 py-0.5 rounded min-w-[36px] text-center mt-0.5">
        {q.prefix}
      </span>
      <div className="flex-1 min-w-0">
        {isDraft ? (
          <DraftCompose
            q={q}
            autoFocus={autoFocus}
            onEdit={onEdit}
            onChangeKind={onChangeKind}
            onRemove={onRemove}
            onSave={onSave}
          />
        ) : q.addedByUser ? (
          <CommittedRow q={q} onEdit={onReopen} />
        ) : (
          <>
            <div className="text-sm text-neutral-900 leading-relaxed">
              {q.text}
            </div>
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
          </>
        )}
      </div>
      <button
        type="button"
        aria-label={`Remove ${q.prefix}`}
        onClick={onRemove}
        className="opacity-50 hover:opacity-100 text-neutral-500 hover:text-red-600 transition-colors p-1 -m-1 mt-0.5"
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
  meta,
  onMetaChange,
  onRemoveQuestion,
  onEditQuestion,
  onChangeQuestionKind,
  onAddQuestion,
  onSetCommitted,
  onBack,
  onNext,
}: Step2ReviewProps) {
  const lastId = questions[questions.length - 1]?.id;
  const hasOpenDraft = questions.some(
    (q) => q.addedByUser && !q.committed,
  );
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
        <div className="grid grid-cols-[1fr_1fr_1.5fr_0.8fr] gap-2 mb-4">
          <MetaInput
            label="Subject"
            value={meta.subject}
            placeholder={META_PLACEHOLDERS.subject}
            onChange={(v) => onMetaChange({ ...meta, subject: v })}
          />
          <MetaInput
            label="Grade level"
            value={meta.gradeLevel}
            placeholder={META_PLACEHOLDERS.gradeLevel}
            onChange={(v) => onMetaChange({ ...meta, gradeLevel: v })}
          />
          <MetaInput
            label="Unit"
            value={meta.unit}
            placeholder={META_PLACEHOLDERS.unit}
            onChange={(v) => onMetaChange({ ...meta, unit: v })}
          />
          <MetaStatic label="Questions" value={questions.length} />
        </div>

        <div>
          {questions.map((q) => (
            <QuestionRow
              key={q.id}
              q={q}
              autoFocus={!!q.addedByUser && q.id === lastId && q.text === ''}
              onRemove={() => onRemoveQuestion(q.id)}
              onEdit={(text) => onEditQuestion(q.id, text)}
              onChangeKind={(kind) => onChangeQuestionKind(q.id, kind)}
              onSave={() => onSetCommitted(q.id, true)}
              onReopen={() => onSetCommitted(q.id, false)}
            />
          ))}
          {questions.length === 0 && (
            <div className="text-sm text-neutral-500 py-6 text-center">
              No questions remaining. Go back and re-upload your assessment.
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onAddQuestion}
          className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-eddo-600 hover:text-eddo-700"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add question
        </button>
      </Card>

      <div className="flex items-center justify-between mt-5 gap-4">
        <Button onClick={onBack}>← Back</Button>
        <div className="flex items-center gap-3">
          {hasOpenDraft && (
            <span className="text-[12px] text-neutral-500">
              Save or remove your draft to continue
            </span>
          )}
          <Button
            variant="primary"
            onClick={onNext}
            disabled={questions.length === 0 || hasOpenDraft}
          >
            Verify AI understanding
          </Button>
        </div>
      </div>
    </div>
  );
}
