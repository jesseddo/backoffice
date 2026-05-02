import type { Teacher } from '../types';
import { Card } from './ui/Card';

type SuccessStateProps = {
  teachers: Teacher[];
  onCreateAnother: () => void;
};

function buildTeacherSentence(teachers: Teacher[]): string {
  const names = teachers.map((t) => t.name);
  if (names.length === 0) return 'no teachers';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

export function SuccessState({
  teachers,
  onCreateAnother,
}: SuccessStateProps) {
  const selected = teachers.filter((t) => t.checked);
  const count = selected.length;
  const teacherSentence = buildTeacherSentence(selected);

  return (
    <Card className="text-center">
      <div className="flex flex-col items-center pt-4 pb-2">
        <div className="w-12 h-12 rounded-full bg-eddo-50 flex items-center justify-center mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            className="text-eddo-600"
            aria-hidden
          >
            <path
              d="M5 12.5l4.5 4.5L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-lg font-medium text-neutral-900 mb-1.5">
          Assessment is live
        </div>
        <div className="text-sm text-neutral-700 max-w-md leading-relaxed mb-1">
          {count} Google Form{count === 1 ? '' : 's'} created and assigned to{' '}
          {teacherSentence}.
        </div>
        <div className="text-sm text-neutral-600 mb-6">
          Students can begin submitting responses.
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm font-medium text-eddo-600 hover:text-eddo-700"
          >
            View in workspace →
          </a>
          <button
            type="button"
            onClick={onCreateAnother}
            className="text-sm font-medium text-eddo-600 hover:text-eddo-700"
          >
            Create another assessment →
          </button>
        </div>
      </div>
    </Card>
  );
}
