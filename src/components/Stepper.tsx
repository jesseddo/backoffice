import { STEP_LABELS } from '../data';

type StepperProps = {
  current: number;
  onStepClick: (n: number) => void;
};

export function Stepper({ current, onStepClick }: StepperProps) {
  return (
    <div className="flex border-b border-neutral-200 pb-4 mb-6">
      {STEP_LABELS.map((label, i) => {
        const state =
          i < current ? 'done' : i === current ? 'active' : 'future';
        const clickable = i <= current;
        return (
          <button
            key={label}
            type="button"
            disabled={!clickable}
            onClick={() => clickable && onStepClick(i)}
            className={`flex-1 flex flex-col items-center gap-1 px-1 py-2 text-xs transition-colors ${
              state === 'active'
                ? 'text-eddo-600 font-medium'
                : state === 'done'
                  ? 'text-neutral-700 hover:text-eddo-600'
                  : 'text-neutral-400 cursor-not-allowed'
            }`}
          >
            <span
              className={`inline-flex items-center justify-center w-[22px] h-[22px] rounded-full text-[11px] font-medium border-[1.5px] ${
                state === 'active'
                  ? 'border-eddo-500 bg-eddo-50 text-eddo-600'
                  : state === 'done'
                    ? 'border-eddo-500 bg-eddo-500 text-white'
                    : 'border-neutral-300 bg-white text-neutral-400'
              }`}
            >
              {state === 'done' ? (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2.5 6.2L4.8 8.5L9.5 3.8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
