import { m, viewOnce, easeOutExpo } from '../../lib/motion';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewOnce}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center mx-auto max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-neutral-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </m.div>
  );
}
