import React from 'react';
import { Ear, DraftingCompass, Rocket, TrendingUp } from 'lucide-react';
import { PROCESS_STEPS } from '../../config/site.config';
import { SectionKicker } from '../common/SectionKicker';
import { Reveal, RevealGroup } from '../common/Reveal';

const STEP_ICONS = [Ear, DraftingCompass, Rocket, TrendingUp];

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      aria-label="رویه کار همکاری"
      className="relative overflow-hidden bg-parch py-24 text-void sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-8%] top-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(78,125,95,0.10),transparent_66%)] blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <SectionKicker tone="light">رویه کار · HOW WE WORK</SectionKicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 text-2xl font-black leading-[1.5] tracking-tight sm:text-4xl sm:leading-[1.45]">
                از نشست نخست تا{' '}
                <span className="text-aurora-warm">زیست‌بوم زنده</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-sm text-sm font-light leading-8 text-clay">
              مسیر همکاری روشن و مرحله‌به‌مرحله است؛ هر گام با توافق شما آغاز و با تحویل قابل‌سنجش بسته می‌شود.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="relative mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.13}>
          {/* خط اتصال */}
          <span aria-hidden="true" className="absolute right-[12%] left-[12%] top-12 hidden h-px bg-gradient-to-l from-terra/40 via-gold/40 to-sage/40 lg:block" />

          {PROCESS_STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length];
            return (
              <div key={step.index} data-reveal className="relative">
                <div className="group h-full rounded-3xl border border-void/8 bg-paper p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-light">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-void text-milk shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="font-latin text-3xl font-bold text-void/10 tabular-nums" dir="ltr">
                      {step.index}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-extrabold text-void">{step.title}</h3>
                  <p className="mt-2.5 text-xs font-light leading-7 text-clay">{step.body}</p>
                </div>
              </div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
};

export default ProcessSection;
