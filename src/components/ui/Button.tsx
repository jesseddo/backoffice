import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = 'secondary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-medium transition-colors active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none';
  const styles =
    variant === 'primary'
      ? 'bg-eddo-500 text-white hover:bg-eddo-600 border border-eddo-500'
      : 'bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50';
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
