import type { ReactNode } from 'react';

type InfoBannerProps = {
  children: ReactNode;
};

export function InfoBanner({ children }: InfoBannerProps) {
  return (
    <div className="flex items-start gap-2 px-4 py-3 rounded-md bg-blue-50 text-blue-900 text-[13px] mb-4 border border-blue-100">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="shrink-0 mt-0.5"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h0" />
      </svg>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
