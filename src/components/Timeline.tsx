import { CalendarClock } from 'lucide-react';
import { m, viewOnce, easeOutExpo } from '../lib/motion';
import { timelineItems } from '../data/divisions';
import { SectionHeading } from './ui/section-heading';

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 md:py-28 bg-neutral-950/60 content-auto">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Timeline"
          title="Alur rekrutmen 2026"
          description="Ikuti setiap tahap dengan teliti. Pastikan data dan kehadiranmu sesuai jadwal."
        />

        <div className="relative max-w-3xl mx-auto">
          <div
            className="absolute left-[19px] md:left-1/2 top-2 bottom-2 w-px bg-neutral-800 md:-translate-x-px"
            aria-hidden
          />

          <div className="space-y-8 md:space-y-12">
            {timelineItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <m.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewOnce}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.04, 0.16),
                    ease: easeOutExpo,
                  }}
                  className="relative grid grid-cols-[40px_1fr] md:grid-cols-[1fr_40px_1fr] gap-4 md:gap-6 items-start"
                >
                  <div
                    className={`hidden md:block ${
                      isLeft ? 'text-right order-1' : 'order-3 col-start-3'
                    }`}
                  >
                    {isLeft && <TimelineCard item={item} />}
                  </div>

                  <div className="relative z-10 flex justify-center order-1 md:order-2 md:col-start-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-black shadow-sm shadow-white/5">
                      <span className="text-[11px] font-semibold tracking-wide text-white">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <div className="order-2 md:hidden">
                    <TimelineCard item={item} />
                  </div>

                  <div className={`hidden md:block ${isLeft ? 'order-3' : 'order-1 text-right'}`}>
                    {!isLeft && <TimelineCard item={item} />}
                  </div>
                </m.div>
              );
            })}
          </div>

          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewOnce}
            className="mt-12 flex items-center justify-center gap-2 text-xs text-neutral-500"
          >
            <CalendarClock className="h-3.5 w-3.5" />
            Jadwal dapat menyesuaikan kebijakan sekolah
          </m.div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item }: { item: (typeof timelineItems)[number] }) {
  return (
    <div className="rounded-[20px] border border-neutral-800 bg-black p-5 md:p-6 shadow-sm shadow-white/5 hover:border-white hover:shadow-md transition-[border-color,box-shadow] duration-250">
      <p className="text-xs font-medium tracking-wide text-neutral-500">{item.date}</p>
      <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white">{item.title}</h3>
      <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{item.description}</p>
    </div>
  );
}
