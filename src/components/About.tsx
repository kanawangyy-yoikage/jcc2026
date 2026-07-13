import { Users, Camera, CalendarDays, Layers, ArrowRight } from 'lucide-react';
import { m, staggerContainer, fadeUp, viewOnce, easeOutExpo } from '../lib/motion';
import { stats } from '../data/divisions';

const iconMap = {
  users: Users,
  camera: Camera,
  calendar: CalendarDays,
  layers: Layers,
};

export default function About() {
  return (
    <section id="tentang" className="py-20 md:py-28 content-auto">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="rounded-[20px] md:rounded-[28px] border border-neutral-800 bg-black shadow-sm shadow-white/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-neutral-900">
              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewOnce}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              >
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
                  Tentang JCC
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tight leading-[1.1] text-white">
                  Journalism
                  <br />
                  Creative Club
                  <br />
                  Skensa
                </h2>
              </m.div>
            </div>

            <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-between gap-10">
              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewOnce}
                transition={{ duration: 0.5, delay: 0.06, ease: easeOutExpo }}
                className="max-w-xl"
              >
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                  JCC Skensa adalah wadah bagi siswa SMKN 1 Kedungwuni yang memiliki minat di
                  bidang jurnalistik, fotografi, videografi, desain, dan media sosial.
                </p>
                <p className="mt-4 text-base md:text-lg text-neutral-400 leading-relaxed">
                  Kami belajar, berkarya, dan berkontribusi untuk menyampaikan informasi dan
                  inspirasi.
                </p>
                <a
                  href="#divisi"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white group"
                >
                  Selengkapnya tentang JCC
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </m.div>

              <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={viewOnce}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
              >
                {stats.map((stat) => {
                  const Icon = iconMap[stat.icon];
                  return (
                    <m.div
                      key={stat.label}
                      variants={fadeUp}
                      className="group rounded-2xl border border-transparent hover:border-neutral-800 hover:bg-neutral-950/80 p-3 transition-colors duration-200"
                    >
                      <Icon className="h-5 w-5 text-neutral-500 mb-3 transition-transform duration-200 group-hover:scale-110 group-hover:text-white" />
                      <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-neutral-500">{stat.label}</p>
                    </m.div>
                  );
                })}
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
