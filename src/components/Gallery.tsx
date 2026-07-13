import { m, viewOnce, easeOutExpo } from '../lib/motion';
import { galleryImages } from '../data/divisions';
import { SectionHeading } from './ui/section-heading';

export default function Gallery() {
  return (
    <section id="galeri" className="py-20 md:py-28 content-auto">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <SectionHeading
            eyebrow="Galeri Kegiatan"
            title="Momen di balik layar"
            className="mb-0"
          />
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewOnce}
            className="text-sm text-neutral-500 max-w-xs sm:text-right"
          >
            Dokumentasi liputan, latihan, dan kebersamaan anggota JCC.
          </m.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {galleryImages.map((img, i) => {
            const span =
              i === 0
                ? 'col-span-2 md:col-span-3 md:row-span-2'
                : i === 1
                  ? 'col-span-1 md:col-span-3'
                  : 'col-span-1 md:col-span-2';

            return (
              <m.figure
                key={img.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewOnce}
                transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.2), ease: easeOutExpo }}
                className={`group relative overflow-hidden rounded-[20px] border border-neutral-800 bg-neutral-950 shadow-sm shadow-white/5 ${span} ${
                  i === 0 ? 'aspect-[4/3] md:aspect-auto md:min-h-[420px]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover grayscale transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.04] group-hover:grayscale-0 will-change-transform"
                />
                <div className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10 pointer-events-none" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 translate-y-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs font-medium text-white drop-shadow-sm">{img.alt}</span>
                </figcaption>
              </m.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
