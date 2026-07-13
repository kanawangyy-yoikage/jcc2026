import { m, viewOnce, easeOutExpo } from '../lib/motion';
import { faqItems } from '../data/divisions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { SectionHeading } from './ui/section-heading';

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: easeOutExpo,
    },
  },
};

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 content-auto">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <m.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <SectionHeading
              eyebrow="FAQ"
              title="Pertanyaan yang sering diajukan"
              description="Masih ragu? Cek jawaban di sini atau hubungi kami lewat Instagram JCC."
              className="mb-0"
            />

            <m.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewOnce}
              transition={{ duration: 0.5, delay: 0.15, ease: easeOutExpo }}
              className="mt-8 hidden lg:block"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs text-neutral-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Klik pertanyaan untuk membuka jawaban
              </div>
            </m.div>
          </m.div>

          <m.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewOnce}
            className="lg:col-span-7"
          >
            <Accordion type="single" collapsible className="w-full" defaultValue="faq-1">
              {faqItems.map((faq, index) => (
                <m.div
                  key={faq.id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                >
                  <AccordionItem value={faq.id} className="faq-item">
                    <AccordionTrigger>
                      <span className="inline-flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-neutral-800 bg-neutral-950 px-1 text-[10px] font-semibold tracking-wide text-neutral-500 transition-colors duration-300 group-data-[state=open]:border-white group-data-[state=open]:bg-white group-data-[state=open]:text-black">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <m.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: easeOutExpo, delay: 0.05 }}
                      >
                        {faq.answer}
                      </m.p>
                    </AccordionContent>
                  </AccordionItem>
                </m.div>
              ))}
            </Accordion>
          </m.div>
        </div>
      </div>
    </section>
  );
}
