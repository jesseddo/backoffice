import { FEEDBACK_SAMPLES, REVIEWER_CONFIDENCE } from '../data';
import type { FeedbackLevel, FeedbackSample } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

type Step3PreviewProps = {
  onBack: () => void;
  onNext: () => void;
};

const LEVEL_STYLES: Record<FeedbackLevel, { label: string; classes: string }> =
  {
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

function FeedbackCard({ sample }: { sample: FeedbackSample }) {
  const style = LEVEL_STYLES[sample.level];
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-md px-4 py-3.5 mb-2.5">
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

export function Step3Preview({ onBack, onNext }: Step3PreviewProps) {
  return (
    <div>
      <Card
        title="Preview AI feedback"
        subtitle="We generated sample student responses and ran them through the reviewer. Check that the feedback makes sense before assigning."
      >
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
      </Card>

      {FEEDBACK_SAMPLES.map((s) => (
        <FeedbackCard key={s.id} sample={s} />
      ))}

      <div className="flex justify-between mt-5">
        <Button onClick={onBack}>← Back</Button>
        <Button variant="primary" onClick={onNext}>
          Looks good, assign
        </Button>
      </div>
    </div>
  );
}
