import { Button } from './ui/Button';
import { Card } from './ui/Card';

type Step1UploadProps = {
  onNext: () => void;
};

function UploadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 16V4M12 4l4 4M12 4L8 8" />
      <path d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" />
    </svg>
  );
}

function DropZone() {
  return (
    <div className="border-[1.5px] border-dashed border-neutral-300 rounded-md py-8 px-6 text-center cursor-pointer hover:border-eddo-500 transition-colors">
      <div className="flex justify-center text-neutral-500 mb-2">
        <UploadIcon />
      </div>
      <div className="text-sm text-neutral-600">
        Drag and drop or{' '}
        <span className="text-eddo-600 font-medium">browse files</span>
      </div>
    </div>
  );
}

export function Step1Upload({ onNext }: Step1UploadProps) {
  return (
    <div>
      <Card
        title="Upload assessment"
        subtitle="Upload the OSE assessment and answer key. We'll extract the questions and build the reviewer instructions automatically."
      >
        <div className="text-[13px] font-medium text-neutral-900 mb-1.5">
          Assessment document
        </div>
        <div className="text-xs text-neutral-500 mb-3">
          PDF or document from OpenSciEd
        </div>
        <DropZone />

        <div className="h-4" />

        <div className="text-[13px] font-medium text-neutral-900 mb-1.5">
          Answer key / rubric
        </div>
        <div className="text-xs text-neutral-500 mb-3">
          Scoring guide, look-fors, or rubric for this assessment
        </div>
        <DropZone />
      </Card>

      <div className="flex items-center gap-3 my-4 text-xs text-neutral-500">
        <div className="flex-1 h-px bg-neutral-200" />
        <span>or select from previously created assessments</span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg px-6 py-3.5 mb-4 flex items-center gap-2 text-neutral-600 text-sm cursor-pointer hover:border-neutral-300 transition-colors">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M16 16l4 4" />
        </svg>
        Search existing assessments...
      </div>

      <div className="flex justify-end mt-5">
        <Button variant="primary" onClick={onNext}>
          Extract questions
        </Button>
      </div>
    </div>
  );
}
