import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpLeft, ShieldCheck } from 'lucide-react';
import { ECOSYSTEMS, type EcosystemConfig } from '../../config/ecosystems.config';
import { ECOSYSTEM_ACCENTS } from '../../config/site.config';
import { cn } from '../../lib/utils';
import { SectionKicker } from '../common/SectionKicker';
import { Reveal, RevealGroup } from '../common/Reveal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface BusinessesSectionProps {
  onSelectEcosystem: (slug: string) => void;
}

/** یک کارت کسب‌وکار با چیدمان یک‌درمیان تصویر/متن */
const BusinessCard: React.FC<{
  eco: EcosystemConfig;
  flip: boolean;
  onSelect: (slug: string) => void;
}> = ({ eco, flip, onSelect }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const accent = ECOSYSTEM_ACCENTS[eco.slug] ?? ECOSYSTEM_ACCENTS['real-estate'];

  // پارالاکس تصویر هنگام اسکرول
  useGSAP(
    () => {
      const card = cardRef.current;
      const img = imgRef.current;
      if (!card || !img) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        img,
        { yPercent: -8, scale: 1.14 },
        {
          yPercent: 8,
          scale: 1.14,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      );
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className={cn('group grid grid-cols-1 items-stretch gap-0 lg:grid-cols-2', flip && 'lg:[direction:ltr]')}
    >
      {/* تصویر */}
      <button
        type="button"
        onClick={() => onSelect(eco.slug)}
        aria-label={`ورود به صفحه ${eco.shortTitle}`}
        className={cn(
          'relative block min-h-64 cursor-pointer overflow-hidden rounded-3xl lg:min-h-[26rem]',
          flip && 'lg:[direction:rtl]'
        )}
      >
        <img
          ref={imgRef}
          src={eco.architecturalImage}
          alt={eco.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        {/* گرادیان رنگی زیست‌بوم */}
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-55 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-35"
          style={{ background: `linear-gradient(135deg, ${accent.from}66, transparent 55%, ${accent.to}44)` }}
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

        {/* شماره */}
        <span
          className="font-latin absolute right-5 top-5 rounded-full px-3.5 py-1.5 text-xs font-semibold tabular-nums text-milk backdrop-blur-md"
          style={{ background: 'rgba(5,6,11,0.45)', border: '1px solid rgba(255,255,255,0.18)' }}
          dir="ltr"
        >
          {eco.indexNumber} / ۰۴
        </span>

        {/* دعوت به ورود */}
        <span className="absolute bottom-5 right-5 inline-flex translate-y-2 items-center gap-2 rounded-full bg-milk/95 px-4 py-2 text-xs font-bold text-ink opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          مشاهده جزئیات زیست‌بوم
          <ArrowUpLeft className="h-3.5 w-3.5" />
        </span>
      </button>

      {/* متن */}
      <div
        className={cn(
          'flex flex-col justify-center rounded-3xl px-2 py-8 lg:px-12',
          flip ? 'lg:[direction:rtl]' : ''
        )}
      >
        <span
          className="font-latin w-fit rounded-full px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em]"
          style={{ background: accent.chip, color: accent.from }}
          dir="ltr"
        >
          {eco.englishTitle}
        </span>

        <h3 className="mt-5 text-2xl font-black leading-snug text-void sm:text-3xl">
          {eco.shortTitle}
        </h3>
        <p className="mt-3 text-sm font-medium leading-7" style={{ color: accent.from }}>
          {eco.tagline}
        </p>
        <p className="mt-4 max-w-xl text-sm font-light leading-8 text-clay line-clamp-3">
          {eco.macroVision}
        </p>

        {/* شاخص‌ها */}
        <div className="mt-7 grid grid-cols-3 gap-3 border-t border-void/8 pt-6">
          {eco.metrics?.slice(0, 3).map((m, i) => (
            <div key={i}>
              <div
                className="font-latin text-lg font-bold tabular-nums sm:text-xl"
                style={{ color: accent.from }}
                dir="ltr"
              >
                {m.value}
              </div>
              <div className="mt-1 text-[10px] font-light leading-4 text-sand line-clamp-2">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onSelect(eco.slug)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold text-milk transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: `linear-gradient(120deg, ${accent.from}, ${accent.to})`,
              boxShadow: `0 12px 32px -12px ${accent.glow}`,
            }}
          >
            ورود به زیست‌بوم
            <ArrowUpLeft className="h-4 w-4" />
          </button>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-sand">
            <ShieldCheck className="h-3.5 w-3.5 text-sage" />
            حاکمیت کامل بر داده
          </span>
        </div>
      </div>
    </div>
  );
};

export const BusinessesSection: React.FC<BusinessesSectionProps> = ({ onSelectEcosystem }) => {
  return (
    <section
      id="businesses"
      aria-label="کسب‌وکارهای تحت مالکیت"
      className="relative overflow-hidden bg-paper py-24 text-void sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines-light absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_55%_50%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionKicker tone="light">پرتفوی کسب‌وکارها · PORTFOLIO</SectionKicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-2xl font-black leading-[1.5] tracking-tight text-void sm:text-4xl sm:leading-[1.45]">
              چهار کسب‌وکار، <span className="text-aurora-warm">یک منطق مشترک</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 text-sm font-light leading-8 text-clay sm:text-[15px]">
              هر زیست‌بوم برای صنعت خاصی معماری شده؛ اما همه بر یک ستون مشترک ایستاده‌اند: نظم ساختاری، هوشمندی و مالکیت کامل داده.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {ECOSYSTEMS.map((eco, i) => (
            <Reveal key={eco.slug} y={56}>
              <BusinessCard eco={eco} flip={i % 2 === 1} onSelect={onSelectEcosystem} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessesSection;
