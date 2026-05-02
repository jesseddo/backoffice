import type { Teacher } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Checkbox } from './ui/Checkbox';

type Step4AssignProps = {
  teachers: Teacher[];
  dueDate: string;
  onToggleTeacher: (id: string) => void;
  onToggleAll: () => void;
  onChangeDueDate: (date: string) => void;
  onBack: () => void;
  onNext: () => void;
};

export function Step4Assign({
  teachers,
  dueDate,
  onToggleTeacher,
  onToggleAll,
  onChangeDueDate,
  onBack,
  onNext,
}: Step4AssignProps) {
  const allChecked = teachers.every((t) => t.checked);
  return (
    <div>
      <Card
        title="Assign to teachers"
        subtitle="Select which teachers should receive this assessment. Each teacher gets their own Google Form and workspace entry automatically."
      >
        <button
          type="button"
          onClick={onToggleAll}
          className="text-[13px] font-medium text-eddo-600 hover:text-eddo-700 mb-2"
        >
          {allChecked ? 'Deselect all teachers' : 'Select all teachers'}
        </button>

        <div>
          {teachers.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 py-2.5 border-b border-neutral-200 last:border-b-0"
            >
              <Checkbox
                checked={t.checked}
                onChange={() => onToggleTeacher(t.id)}
              />
              <div>
                <div className="text-sm font-medium text-neutral-900 leading-tight">
                  {t.name}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {t.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-4" />

        <div className="text-[13px] font-medium text-neutral-900 mb-1.5">
          Due date
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => onChangeDueDate(e.target.value)}
          className="w-[200px]"
        />
      </Card>

      <div className="flex justify-between mt-5">
        <Button onClick={onBack}>← Back</Button>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={teachers.every((t) => !t.checked)}
        >
          Review and confirm
        </Button>
      </div>
    </div>
  );
}
