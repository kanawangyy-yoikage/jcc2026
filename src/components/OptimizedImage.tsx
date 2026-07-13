import { useState } from 'react';
import { cn } from '../lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  webpSrc?: string;
  /** Show soft skeleton until loaded */
  skeleton?: boolean;
}

/**
 * GPU-friendly image: async decode, lazy by default, optional WebP,
 * content-box skeleton to avoid layout shift.
 */
export default function OptimizedImage({
  src,
  alt,
  webpSrc,
  className,
  skeleton = true,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  const img = (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      onLoad={() => setLoaded(true)}
      className={cn(
        'will-change-transform',
        skeleton && !loaded && 'opacity-0',
        skeleton && loaded && 'opacity-100 transition-opacity duration-300',
        className
      )}
      {...rest}
    />
  );

  if (webpSrc) {
    return (
      <div className={cn('relative overflow-hidden', skeleton && 'bg-neutral-900')}>
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          {img}
        </picture>
      </div>
    );
  }

  return (
    <div className={cn(skeleton && 'relative bg-neutral-900 overflow-hidden h-full w-full')}>
      {img}
    </div>
  );
}
