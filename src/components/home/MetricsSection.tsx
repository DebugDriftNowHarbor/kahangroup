import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { METRICS } from '../../config/site.config';
import { toPersianDigits } from '../../lib/utils';
import { SectionKicker } from '../common/SectionKicker';
import { Reveal, RevealGroup } from '../common/Reveal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COUNTER_COLORS = ['text-violet', 'text-cyan', 'text-mint', 'text-peach'];

/** شمارنده عددی که هنگام ورود به دید تا مقدار نهایی بالا می‌شمارد */
const CountUp: React.FC<{ target: number; decimals: number; suffix: string; prefix: string; colorClass: string; index: number }> = ({
  target,
  decimals,
  suffix,
  prefix,
  colorClass,
  index,
}) => {
  const numRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = numRef.current;
      if (!el) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const obj = { v: 0 };
      const render = () => {
        el.textContent = `${prefix ?? ''}${toPersianDigits(obj.v.toFixed(decimals))}${suffix ?? ''}`;
      };
      if (reduced) {
        obj.v = target;
        render();
        return;
      }
      render();
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        delay: 0.15 + index * 0.12,
        ease: 'power2.out',
        onUpdate: render,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    },
    { scope: numRef }
  );

  return (
    <span ref={numRef} className={`font-latin text-4xl font-bold tabular-nums sm:text-5xl lg:text-6xl ${colorClass}`} dir="ltr">
      ۰
    </span>
  );
};

export const MetricsSection: React.FC = () => {
  return (
    <section
      aria-label="شاخص‌های کلان"
      className="relative overflow-hidden bg-ink py-24 text-milk sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-blob right-[18%] top-[-30%] h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(106,92,255,0.2),transparent_66%)]" />
        <div className="aurora-blob bottom-[-35%] left-[10%] h-[24rem] w-[24rem] bg-[radial-gradient(circle,rgba(66,240,181,0.14),transparent_66%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionKicker>اثرگذاری کلان · IMPACT</SectionKicker>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-xl text-2xl font-black leading-[1.5] tracking-tight sm:text-3xl sm:leading-[1.5]">
            عددهایی که از میدان واقعی{' '}
            <span className="text-aurora">عملیات می‌آیند</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              data-reveal
              className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-transparent p-7 transition-colors duration-500 hover:border-white/15"
            >
              <CountUp
                target={metric.value}
                decimals={Number.isInteger(metric.value) ? 0 : 1}
                suffix={metric.suffix ?? ''}
                prefix={(metric as { prefix?: string }).prefix ?? ''}
                colorClass={COUNTER_COLORS[idx % COUNTER_COLORS.length]}
                index={idx}
              />
              <div className="mt-4 text-sm font-bold text-milk">{metric.label}</div>
              <p className="mt-2 text-[11px] font-light leading-6 text-dusk">{metric.description}</p>
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-[2px] w-0 bg-gradient-to-l from-violet via-cyan to-mint transition-all duration-700 group-hover:w-full"
              />
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default MetricsSection;
