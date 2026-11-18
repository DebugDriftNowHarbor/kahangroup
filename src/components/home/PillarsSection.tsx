import React from 'react';
import { Layers, BrainCircuit, Globe2 } from 'lucide-react';
import { VALUE_PILLARS } from '../../config/ecosystems.config';
import { SectionKicker } from '../common/SectionKicker';
import { Reveal, RevealGroup } from '../common/Reveal';

const PILLAR_ICONS = [Layers, BrainCircuit, Globe2];
const PILLAR_GLOWS = [
  'group-hover:shadow-[0_0_50px_-12px_rgba(106,92,255,0.5)]',
  'group-hover:shadow-[0_0_50px_-12px_rgba(77,216,255,0.5)]',
  'group-hover:shadow-[0_0_50px_-12px_rgba(66,240,181,0.45)]',
];
const PILLAR_GRADIENTS = [
  'from-violet to-cyan',
  'from-cyan to-mint',
  'from-mint to-violet',
];

export const PillarsSection: React.FC = () => {
  return (
    <section
      id="pillars"
      aria-label="ارزش‌های بنیادین"
      className="relative overflow-hidden bg-ink py-24 text-milk sm:py-32"
    >
      {/* پس‌زمینه */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-blob left-[-10%] top-[-20%] h-[30rem] w-[30rem] bg-[radial-gradient(circle,rgba(106,92,255,0.16),transparent_68%)]" />
        <div className="aurora-blob bottom-[-25%] right-[-6%] h-[28rem] w-[28rem] bg-[radial-gradient(circle,rgba(77,216,255,0.12),transparent_68%)]" />
        <div className="grid-lines absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Reveal>
            <SectionKicker>ارزش‌های بنیادین · CORE PRINCIPLES</SectionKicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-2xl font-black leading-[1.5] tracking-tight text-milk sm:text-4xl sm:leading-[1.45]">
              سه ستونی که هر زیست‌بوم{' '}
              <span className="text-aurora">بر آن بنا شده است</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 text-sm font-light leading-8 text-fog sm:text-[15px]">
              فلسفه ما فقط ساختن نرم‌افزار نیست؛ معماری‌کردن نهادهایی است که بر سه رکن استوار می‌مانند و با گذر زمان قوی‌تر می‌شوند.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.14}>
          {VALUE_PILLARS.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
            return (
              <article
                key={pillar.number}
                data-reveal
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-white/15 ${PILLAR_GLOWS[idx % PILLAR_GLOWS.length]}`}
              >
                {/* شماره بزرگ پس‌زمینه */}
                <span
                  aria-hidden="true"
                  className="font-latin pointer-events-none absolute -top-4 left-4 text-[5.5rem] font-bold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.07]"
                  dir="ltr"
                >
                  0{idx + 1}
                </span>

                <span className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${PILLAR_GRADIENTS[idx % PILLAR_GRADIENTS.length]} shadow-lg`}>
                  <Icon className="h-5.5 w-5.5 text-ink" strokeWidth={2} />
                </span>

                <span className="font-latin text-[10px] uppercase tracking-[0.24em] text-dusk">
                  {pillar.englishKicker}
                </span>
                <h3 className="mt-2 text-lg font-bold text-milk">{pillar.title}</h3>
                <p className="mt-3.5 flex-1 text-[13px] font-light leading-7 text-fog">{pillar.summary}</p>

                <div className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5">
                  <div className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-mint" />
                    <p className="text-[11px] leading-6 text-fog/90">
                      <span className="font-medium text-milk/90">نتیجه کلان: </span>
                      {pillar.macroOutcome}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet" />
                    <p className="text-[11px] leading-6 text-fog/90">
                      <span className="font-medium text-milk/90">اصل معماری: </span>
                      {pillar.architecturalPrinciple}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
};

export default PillarsSection;
