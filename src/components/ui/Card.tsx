import type { ReactNode } from 'react';

type CardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, subtitle, children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white border border-neutral-200 rounded-lg p-6 mb-4 ${className}`}
    >
      {title && (
        <div className="text-base font-medium text-neutral-900 mb-1">
          {title}
        </div>
      )}
      {subtitle && (
        <div className="text-[13px] text-neutral-600 mb-4 leading-relaxed">
          {subtitle}
        </div>
      )}
      {children}
    </div>
  );
}
