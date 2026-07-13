import * as React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-2xl border border-neutral-800 bg-black px-4 py-2 text-sm text-white transition-all duration-200 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15 focus-visible:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
