import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDown, ArrowUpLeft, Sparkles } from 'lucide-react';
import { HERO, MARQUEE_ITEMS } from '../../config/site.config';
import { ECOSYSTEMS } from '../../config/ecosystems.config';

interface HeroSectionProps {
  onOpenCollaboration: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCollaboration }) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    (context, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!reduced) {
        // ورود سینمایی عناصر
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo('[data-hero]', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.2 })
          .fromTo(
            '[data-hero-orbit]',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
            0.1
          );

        // پارالاکس اشاره‌گر
        const x1 = gsap.quickTo(blob1Ref.current, 'x', { duration: 1.6, ease: 'power2.out' });
        const y1 = gsap.quickTo(blob1Ref.current, 'y', { duration: 1.6, ease: 'power2.out' });
        const x2 = gsap.quickTo(blob2Ref.current, 'x', { duration: 2, ease: 'power2.out' });
        const y2 = gsap.quickTo(blob2Ref.current, 'y', { duration: 2, ease: 'power2.out' });
        const xO = gsap.quickTo(orbRef.current, 'x', { duration: 1.2, ease: 'power2.out' });
        const yO = gsap.quickTo(orbRef.current, 'y', { duration: 1.2, ease: 'power2.out' });

        const onMove = contextSafe
          ? contextSafe((e: MouseEvent) => {
              const nx = (e.clientX / window.innerWidth - 0.5) * 2;
              const ny = (e.clientY / window.innerHeight - 0.5) * 2;
              x1(nx * 50);
              y1(ny * 36);
              x2(nx * -38);
              y2(ny * -28);
              xO(nx * 16);
              yO(ny * 12);
            })
          : null;

        if (onMove) window.addEventListener('mousemove', onMove as EventListener, { passive: true });
        return () => window.removeEventListener('mousemove', onMove as EventListener);
      } else {
        gsap.set('[data-hero]', { opacity: 1 });
        gsap.set('[data-hero-orbit]', { opacity: 1 });
      }
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="top"
      aria-label="معرفی منظومه بُرهان"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-ink"
    >
      {/* ── پس‌زمینه آئورا ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]" />
        <div
          ref={blob1Ref}
          className="aurora-blob drift-slow right-[8%] top-[-12%] h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(106,92,255,0.32)_0%,transparent_68%)]"
        />
        <div
          ref={blob2Ref}
          className="aurora-blob drift-slower bottom-[-22%] left-[4%] h-[38rem] w-[38rem] bg-[radial-gradient(circle,rgba(66,240,181,0.22)_0%,transparent_66%)]"
        />
        <div className="aurora-blob left-[32%] top-[28%] h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(77,216,255,0.16)_0%,transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* حلقه مداری تزئینی */}
      <div
        ref={orbRef}
        data-hero-orbit
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        <div className="h-[46rem] w-[46rem] rounded-full border border-white/[0.05]">
          <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-cyan shadow-[0_0_16px_rgba(77,216,255,0.9)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]">
          <span className="absolute right-6 top-10 h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_12px_rgba(66,240,181,0.9)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet/20" />
      </div>

      {/* ── محتوا ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-28 pt-36 text-center sm:pt-40">
        <span
          data-hero
          className="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[11px] font-medium tracking-wide text-fog sm:text-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan" />
          {HERO.kicker}
        </span>

        <h1 data-hero className="mt-7 max-w-4xl text-[2.1rem] font-black leading-[1.28] tracking-tight text-milk sm:text-5xl lg:text-[3.9rem] lg:leading-[1.22]">
          {HERO.titleLine1}
          <br />
          <span className="text-aurora">{HERO.titleHighlight}</span>
        </h1>

        <p data-hero className="mt-6 max-w-2xl text-sm font-light leading-8 text-fog sm:text-base sm:leading-9">
          {HERO.subtitle}
        </p>

        <div data-hero className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => document.getElementById('businesses')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-milk px-7 py-3.5 text-sm font-bold text-ink shadow-[0_0_40px_-8px_rgba(242,239,232,0.35)] transition-all duration-300 hover:scale-[1.03] hover:bg-gradient-to-l hover:from-violet hover:to-cyan hover:shadow-glow-violet"
          >
            <span>{HERO.ctaPrimary}</span>
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
          <button
            type="button"
            onClick={onOpenCollaboration}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-milk backdrop-blur-md transition-all duration-300 hover:border-violet/50 hover:bg-violet/10"
          >
            <span>{HERO.ctaSecondary}</span>
            <ArrowUpLeft className="h-4 w-4 text-violet transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* نشان زیست‌بوم‌ها */}
        <div data-hero className="mt-14 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {ECOSYSTEMS.map((eco, i) => (
            <button
              key={eco.slug}
              type="button"
              onClick={() => document.getElementById('businesses')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-dark cursor-pointer rounded-full px-4 py-2 text-[11px] text-fog transition-all duration-300 hover:-translate-y-0.5 hover:text-milk sm:text-xs"
            >
              <span className="font-latin ml-1.5 text-[10px] text-violet/80">0{i + 1}</span>
              {eco.shortTitle.replace('زیست‌بوم ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* ── مارکی پایانی ── */}
      <div className="relative z-10 border-t border-white/[0.06] bg-ink-soft/60 py-4 backdrop-blur-sm" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-ink to-transparent" />
        <div className="marquee-track gap-0">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6 text-[13px] font-light text-dusk" dir="rtl">
              <span className="whitespace-nowrap">{item}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-violet/50" />
            </span>
          ))}
        </div>
      </div>

      {/* راهنمای اسکرول */}
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-dusk sm:flex"
      >
        <span className="text-[10px] tracking-widest">{HERO.scrollHint}</span>
        <span className="flex h-9 w-5.5 items-start justify-center rounded-full border border-white/15 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-gradient-to-b from-violet to-cyan" />
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
