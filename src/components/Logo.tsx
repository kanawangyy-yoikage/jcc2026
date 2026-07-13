import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * JCC Skensa logo mark. Same asset used on countdown.html, shown to the
 * left of the "JCC" wordmark across the app (navbar, admin login, admin
 * dashboard header, etc).
 */
export default function Logo({ className }: LogoProps) {
  return (
    <img
      src="/images/logo-jcc.png"
      alt="JCC Skensa"
      className={cn('h-8 w-8 object-contain shrink-0', className)}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
