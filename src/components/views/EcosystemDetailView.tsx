import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  ArrowUpLeft,
  ArrowDown,
  ShieldCheck,
  Sparkles,
  Database,
  BrainCircuit,
  FileCheck2,
} from 'lucide-react';
import {
  ECOSYSTEMS,
  HOLDING_TITLE,
  type EcosystemConfig,
} from '../../config/ecosystems.config';
import { ECOSYSTEM_ACCENTS } from '../../config/site.config';
import { toPersianDigits } from '../../lib/utils';
import { SectionKicker } from '../common/SectionKicker';
import { Reveal, RevealGroup } from '../common/Reveal';

interface EcosystemDetailViewProps {
  ecosystem: EcosystemConfig;
  onBack: () => void;
  onSwitchEcosystem: (slug: string) => void;
  onRequestAccess: (ecosystemTitle: string) => void;
}

const STAGE_ICONS = [Database, BrainCircuit, FileCheck2];
const STAGE_LABELS = ['ورودی', 'پردازش', 'خروجی'];

export const EcosystemDetailView: React.FC<EcosystemDetailViewProps> = ({
  ecosystem,
  onBack,
  onSwitchEcosystem,
  onRequestAccess,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroImgRef = useRef<HTMLImageElement | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const accent = ECOSYSTEM_ACCENTS[ecosystem.slug] ?? ECOSYSTEM_ACCENTS['real-estate'];

  // پارالاکس تصویر هیرو + ورود سینمایی
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const heroItems = rootRef.current?.querySelectorAll('[data-detail-hero]');
      if (heroItems && heroItems.length) {
        if (reduced) {
          gsap.set(heroItems, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            heroItems,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
          );
        }
      }

      const img = heroImgRef.current;
      if (!img || reduced) return;

      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: '30% top', scrub: 1 },
        }
      );
    },
    { scope: rootRef, dependencies: [ecosystem.slug] }
  );

  return (
    <div ref={rootRef} data-testid="ecosystem-detail-view" className="relative bg-ink text-milk">
      {/* ═══ هیرو تیره ═══ */}
      <section className="relative flex min-h-[88dvh] flex-col overflow-hidden">
        {/* تصویر پس‌زمینه */}
        <div aria-hidden="true" className="absolute inset-0">
          {!imageFailed ? (
            <img
              ref={heroImgRef}
              src={ecosystem.architecturalImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-30 will-change-transform"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${accent.from}33, transparent 60%)` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/45" />
          <div
            className="aurora-blob right-[-8%] top-[-16%] h-[30rem] w-[30rem]"
            style={{ background: `radial-gradient(circle, ${accent.glow}, transparent 66%)` }}
          />
          <div className="grid-lines absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        </div>

        {/* نوار بالا */}
        <header className="relative z-20 flex items-center justify-between gap-4 px-5 py-5 sm:px-10">
          <button
            type="button"
            onClick={onBack}
            className="group glass-dark inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-milk transition-colors hover:text-white"
          >
            <ArrowRight className="h-3.5 w-3.5 text-cyan transition-transform duration-300 group-hover:translate-x-0.5" />
            <span>بازگشت به منظومه</span>
          </button>

          {/* جابه‌جایی سریع بین زیست‌بوم‌ها */}
          <nav aria-label="جابه‌جایی میان زیست‌بوم‌ها" className="hidden items-center gap-1.5 md:flex">
            {ECOSYSTEMS.map((eco) => {
              const isActive = eco.slug === ecosystem.slug;
              const ecoAccent = ECOSYSTEM_ACCENTS[eco.slug] ?? accent;
              return (
                <button
                  key={eco.slug}
                  type="button"
                  onClick={() => onSwitchEcosystem(eco.slug)}
                  aria-current={isActive ? 'page' : undefined}
                  className="cursor-pointer rounded-full px-3.5 py-2 text-[11px] transition-all duration-300"
                  style={
                    isActive
                      ? { background: ecoAccent.chip, color: ecoAccent.from, border: `1px solid ${ecoAccent.from}44` }
                      : { border: '1px solid rgba(255,255,255,0.08)', color: '#6d6982' }
                  }
                >
                  <span className="font-latin ml-1 text-[9px] opacity-70">{eco.indexNumber}</span>
                  {eco.shortTitle.replace('زیست‌بوم ', '')}
                </button>
              );
            })}
          </nav>
        </header>

        {/* متن هیرو */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-20">
          <div data-detail-hero className="flex flex-col items-start">
            <SectionKicker>
              {ecosystem.indexNumber} · {ecosystem.sectorLabel}
            </SectionKicker>

            <h1 className="mt-6 max-w-3xl text-3xl font-black leading-[1.35] tracking-tight text-milk sm:text-5xl sm:leading-[1.3]">
              {ecosystem.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-light leading-8 text-fog sm:text-base">
              {ecosystem.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onRequestAccess(ecosystem.title)}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-milk transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(120deg, ${accent.from}, ${accent.to})`,
                  boxShadow: `0 14px 40px -12px ${accent.glow}`,
                }}
              >
                <Sparkles className="h-4 w-4" />
                <span>درخواست استقرار این زیست‌بوم</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  document.getElementById('eco-details')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="glass-dark group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-milk"
              >
                <span>جزئیات معماری</span>
                <ArrowDown className="h-4 w-4 text-cyan transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>

            {/* بج‌های ویژگی */}
            {ecosystem.featureBadges && (
              <div className="mt-10 flex flex-wrap gap-2">
                {ecosystem.featureBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border px-4 py-2 text-[11px] text-fog backdrop-blur-md"
                    style={{ borderColor: `${accent.from}33`, background: 'rgba(255,255,255,0.03)' }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* شاخص‌ها روی لبه هیرو */}
        {ecosystem.metrics && (
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10">
            <div className="glass-dark grid grid-cols-1 gap-4 rounded-3xl p-6 sm:grid-cols-3 sm:p-7">
              {ecosystem.metrics.map((m, i) => (
                <div key={i} className="flex items-start gap-3.5 sm:border-l sm:border-white/[0.07] sm:pl-4 sm:first:border-l-0 sm:first:pl-0">
                  <span
                    className="font-latin text-2xl font-bold tabular-nums sm:text-3xl"
                    style={{ color: accent.from }}
                    dir="ltr"
                  >
                    {m.value}
                  </span>
                  <div>
                    <div className="text-xs font-bold leading-6 text-milk">{m.label}</div>
                    {m.sublabel && <div className="mt-0.5 text-[10px] text-dusk">{m.sublabel}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ═══ بدنه روشن — روایت و معماری ═══ */}
      <section id="eco-details" aria-label="جزئیات زیست‌بوم" className="relative bg-paper py-20 text-void sm:py-28">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* روایت */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <span className="font-latin text-[10px] uppercase tracking-[0.24em] text-terra">MACRO VISION</span>
              <h2 className="mt-3 text-xl font-black leading-[1.7] sm:text-2xl sm:leading-[1.75]">
                {ecosystem.macroVision}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="font-latin text-[10px] uppercase tracking-[0.24em] text-sage">TRANSFORMATION</span>
              <p className="mt-3 text-sm font-light leading-8 text-clay">{ecosystem.transformationNarrative}</p>
            </Reveal>
          </div>

          {/* چالش ↔ پارادایم */}
          <RevealGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2" stagger={0.12}>
            <div data-reveal className="rounded-3xl border border-void/8 bg-[#f3ede2] p-7">
              <span className="text-[11px] font-bold text-terra">چالش سنتی</span>
              <p className="mt-3 text-sm font-light leading-8 text-clay">{ecosystem.traditionalChallenge}</p>
            </div>
            <div
              data-reveal
              className="rounded-3xl border p-7 text-milk"
              style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
            >
              <span className="text-[11px] font-bold opacity-90">پارادایم {HOLDING_TITLE}</span>
              <p className="mt-3 text-sm font-medium leading-8">{ecosystem.ecosystemParadigm}</p>
            </div>
          </RevealGroup>

          {/* معماری سامانه */}
          {ecosystem.systemArchitecture && (
            <div className="mt-20">
              <Reveal>
                <span className="font-latin block text-[10px] uppercase tracking-[0.24em] text-terra">
                  SYSTEM ARCHITECTURE
                </span>
                <h3 className="mt-3 text-xl font-black sm:text-2xl">جریان هوشمند سامانه</h3>
              </Reveal>

              <RevealGroup className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3" stagger={0.13}>
                {(['input', 'processing', 'output'] as const).map((stageKey, i) => {
                  const Icon = STAGE_ICONS[i];
                  return (
                    <div key={stageKey} data-reveal className="relative">
                      <div className="paper-card h-full rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                          <span
                            className="flex h-11 w-11 items-center justify-center rounded-2xl"
                            style={{ background: accent.chip, color: accent.from }}
                          >
                            <Icon className="h-5 w-5" strokeWidth={1.8} />
                          </span>
                          <span className="font-latin text-[10px] uppercase tracking-[0.2em] text-sand">
                            {STAGE_LABELS[i]}
                          </span>
                        </div>
                        <p className="mt-4 text-[13px] font-light leading-7 text-clay">
                          {ecosystem.systemArchitecture![stageKey]}
                        </p>
                      </div>
                      {/* پیکان اتصال */}
                      {i < 2 && (
                        <span
                          aria-hidden="true"
                          className="absolute -left-3.5 top-1/2 hidden -translate-y-1/2 text-void/20 md:block"
                        >
                          <ArrowRight className="h-5 w-5 rotate-180" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </RevealGroup>
            </div>
          )}

          {/* ارزش‌های کلیدی */}
          <div className="mt-20">
            <Reveal>
              <span className="font-latin block text-[10px] uppercase tracking-[0.24em] text-terra">CORE VALUES</span>
              <h3 className="mt-3 text-xl font-black sm:text-2xl">چه چیزی این زیست‌بوم را متمایز می‌کند</h3>
            </Reveal>

            <RevealGroup className="mt-8 space-y-4" stagger={0.12}>
              {ecosystem.coreValues.map((v) => (
                <div
                  key={v.index}
                  data-reveal
                  className="group grid grid-cols-1 gap-4 rounded-3xl border border-void/8 bg-parch p-6 transition-all duration-300 hover:border-terra/25 hover:shadow-card-light sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-7"
                >
                  <span className="font-latin text-3xl font-bold text-void/12 tabular-nums transition-colors group-hover:text-terra/40" dir="ltr">
                    {v.index}
                  </span>
                  <div>
                    <span className="text-[10px] font-medium text-sand">{v.category}</span>
                    <h4 className="mt-1 text-base font-extrabold text-void">{v.title}</h4>
                    <p className="mt-2 text-[13px] font-light leading-7 text-clay">{v.description}</p>
                  </div>
                  <ShieldCheck className="hidden h-6 w-6 text-sage/60 sm:block" strokeWidth={1.5} />
                </div>
              ))}
            </RevealGroup>
          </div>

          {/* CTA پایانی */}
          <Reveal className="mt-20">
            <div
              className="relative overflow-hidden rounded-[2rem] p-10 text-center text-milk sm:p-14"
              style={{ background: `linear-gradient(130deg, ${accent.from}, ${accent.to})` }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.5) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.35) 0%, transparent 45%)',
                }}
              />
              <h3 className="relative z-10 text-xl font-black leading-[1.7] sm:text-2xl">
                آماده ارتقای {ecosystem.sectorLabel} خود هستید؟
              </h3>
              <p className="relative z-10 mx-auto mt-3 max-w-md text-[13px] font-light leading-7 opacity-90">
                نشست شناسایی نیازهای مجموعه شما رایگان است؛ زیست‌بوم متناسب با ساختار شما پیشنهاد می‌شود.
              </p>
              <button
                type="button"
                onClick={() => onRequestAccess(ecosystem.title)}
                className="group relative z-10 mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink/85 px-7 py-3.5 text-sm font-bold text-milk backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:bg-ink"
              >
                <span>درخواست جلسه معارفه</span>
                <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ ناوبری پایانی تیره ═══ */}
      <section className="bg-ink px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="glass-dark group inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-xs font-medium text-milk"
          >
            <ArrowRight className="h-3.5 w-3.5 text-cyan" />
            <span>بازگشت به منظومه بُرهان</span>
          </button>
          <span className="font-latin text-[10px] uppercase tracking-[0.24em] text-dusk">
            {ecosystem.englishTitle} · {toPersianDigits('1405')}
          </span>
        </div>
      </section>
    </div>
  );
};

export default EcosystemDetailView;
