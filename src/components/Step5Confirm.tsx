import { ASSESSMENT_META, REVIEWER_CONFIDENCE } from '../data';
import type { Phase, Question, Teacher } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { InfoBanner } from './ui/InfoBanner';

type Step5ConfirmProps = {
  questions: Question[];
  teachers: Teacher[];
  dueDate: string;
  phase: Phase;
  loadingMsg: string;
  onBack: () => void;
  onCreate: () => void;
};

function formatDueDate(iso: string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function buildQuestionBreakdown(questions: Question[]): string {
  const text = questions.filter((q) => q.kind !== 'drawing').length;
  const drawing = questions.filter((q) => q.kind === 'drawing').length;
  const parts: string[] = [];
  if (text) parts.push(`${text} text`);
  if (drawing) parts.push(`${drawing} drawing`);
  return `${questions.length} (${parts.join(', ')})`;
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-2.5 border-b border-neutral-200 last:border-b-0 text-sm">
      <span className="text-neutral-600">{label}</span>
      <span className="text-neutral-900 font-medium text-right">{value}</span>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin text-eddo-500"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Step5Confirm({
  questions,
  teachers,
  dueDate,
  phase,
  loadingMsg,
  onBack,
  onCreate,
}: Step5ConfirmProps) {
  const selected = teachers.filter((t) => t.checked);
  const teacherLabel =
    selected.length === 0
      ? 'No teachers selected'
      : selected.map((t) => t.name).join(', ');

  if (phase === 'creating') {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <Spinner />
          <div className="mt-4 text-sm text-neutral-700">{loadingMsg}</div>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <Card
        title="Confirm and create"
        subtitle="Review everything before we set it up. This will create Google Forms and workspace entries for each selected teacher."
      >
        <div>
          <SummaryRow
            label="Assessment"
            value={`${ASSESSMENT_META.unit} — ${ASSESSMENT_META.gradeLevel}`}
          />
          <SummaryRow
            label="Questions"
            value={buildQuestionBreakdown(questions)}
          />
          <SummaryRow
            label="Reviewer confidence"
            value={`${REVIEWER_CONFIDENCE}%`}
          />
          <SummaryRow label="Teachers" value={teacherLabel} />
          <SummaryRow label="Google Forms to create" value={selected.length} />
          <SummaryRow label="Due date" value={formatDueDate(dueDate)} />
        </div>
      </Card>

      <InfoBanner>
        This assessment will be saved to the assessment library for future use
        by other coaches in your district.
      </InfoBanner>

      <div className="flex justify-between mt-5">
        <Button onClick={onBack}>← Back</Button>
        <Button
          variant="primary"
          onClick={onCreate}
          disabled={selected.length === 0}
        >
          Create assessment
        </Button>
      </div>
    </div>
  );
}
