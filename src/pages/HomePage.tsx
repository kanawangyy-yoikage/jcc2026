import { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const About = lazy(() => import('../components/About'));
const Division = lazy(() => import('../components/Division'));
const Gallery = lazy(() => import('../components/Gallery'));
const Timeline = lazy(() => import('../components/Timeline'));
const RegistrationForm = lazy(() => import('../components/RegistrationForm'));
const FAQ = lazy(() => import('../components/FAQ'));
const Footer = lazy(() => import('../components/Footer'));

function SectionFallback({ height = 'min-h-[240px]' }: { height?: string }) {
  return (
    <div
      className={`${height} w-full animate-pulse bg-gradient-to-b from-neutral-950 to-black`}
      aria-hidden
    />
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback height="min-h-[360px]" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Division />
        </Suspense>
        <Suspense fallback={<SectionFallback height="min-h-[420px]" />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<SectionFallback height="min-h-[480px]" />}>
          <Timeline />
        </Suspense>
        <Suspense fallback={<SectionFallback height="min-h-[640px]" />}>
          <RegistrationForm />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FAQ />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback height="min-h-[280px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
