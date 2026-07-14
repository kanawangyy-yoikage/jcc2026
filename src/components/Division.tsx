import { m, staggerContainer, fadeUp, viewOnce } from '../lib/motion';
import { divisions } from '../data/divisions';
import { SectionHeading } from './ui/section-heading';

export default function Division() {
  return (
    <section id="divisi" className="py-20 md:py-28 bg-neutral-950/60 content-auto">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Divisi Kami"
          title="Empat jalur kreatif untuk berkembang"
          description="Pilih divisi yang sesuai minatmu. Setiap divisi punya mentor, proyek nyata, dan ruang bereksperimen."
        />

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <m.article
                key={div.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                className="group relative rounded-[20px] border border-neutral-800 bg-black p-6 shadow-sm shadow-white/5 hover:shadow-md hover:border-white transition-[box-shadow,border-color] duration-250 will-change-transform"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-900 bg-neutral-950 transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black">
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-white uppercase">
                  {div.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{div.description}</p>
              </m.article>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
