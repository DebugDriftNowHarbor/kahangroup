import React from 'react';
import { Quote } from 'lucide-react';
import { FOUNDER } from '../../config/site.config';
import { HOLDING_TITLE } from '../../config/ecosystems.config';
import { SectionKicker } from '../common/SectionKicker';
import { Reveal, RevealGroup } from '../common/Reveal';

export const FounderSection: React.FC = () => {
  return (
    <section
      id="founder"
      aria-label="درباره بنیان‌گذار"
      className="relative overflow-hidden bg-paper py-24 text-void sm:py-32"
    >
      {/* تزئینات روشن */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines-light absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_55%_at_70%_40%,black,transparent)]" />
        <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(194,94,46,0.10),transparent_68%)] blur-2xl" />
        <div className="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(184,138,47,0.10),transparent_68%)] blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionKicker tone="light">درباره بنیان‌گذار · FOUNDER</SectionKicker>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ستون شناسنامه */}
          <Reveal className="lg:col-span-4" y={48}>
            <div className="paper-card relative overflow-hidden rounded-3xl p-8">
              {/* جای‌نگهدار پرتره */}
              <div className="relative mx-auto mb-7 aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-paper-deep to-paper-deep/40">
                {FOUNDER.photo ? (
                  <img
                    src={FOUNDER.photo}
                    alt={FOUNDER.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                    <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16 text-clay/40" aria-hidden="true">
                      <path
                        d="M12 13c2.9 0 5.5 1.6 6.8 4.1M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-8.5 6.5C4.9 16.6 8.2 15 12 15s7.1 1.6 8.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="rounded-full border border-dashed border-clay/30 px-3 py-1 text-[10px] text-clay/70">
                      عکس بنیان‌گذار — از config ویرایش کنید
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void/10 to-transparent" />
              </div>

              <h3 className="text-xl font-extrabold text-void">{FOUNDER.name}</h3>
              <p className="mt-1.5 text-[13px] font-medium leading-6 text-terra">{FOUNDER.role}</p>

              <div className="mt-6 border-t border-void/8 pt-5">
                <span className="font-latin block text-[10px] uppercase tracking-[0.24em] text-sand">{FOUNDER.latinName}</span>
                <span className="mt-1 block text-[11px] text-sand">{HOLDING_TITLE}</span>
              </div>
            </div>
          </Reveal>

          {/* ستون روایت */}
          <div className="lg:col-span-8">
            <Reveal>
              <div className="flex items-start gap-4">
                <span className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-terra/10 text-terra sm:flex">
                  <Quote className="h-5 w-5" />
                </span>
                <div className="space-y-5">
                  {FOUNDER.bio.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-lg font-medium leading-[2.1] text-void sm:text-xl sm:leading-[2.15]'
                          : 'text-sm font-light leading-[2.2] text-clay sm:text-[15px]'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.12}>
              {FOUNDER.principles.map((p) => (
                <div
                  key={p.title}
                  data-reveal
                  className="group rounded-2xl border border-void/8 bg-parch p-5 transition-all duration-300 hover:-translate-y-1 hover:border-terra/30 hover:shadow-card-light"
                >
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-terra to-gold text-[11px] font-bold text-milk">
                    {p.title.slice(0, 1)}
                  </span>
                  <h4 className="text-[13px] font-bold text-void">{p.title}</h4>
                  <p className="mt-1.5 text-xs font-light leading-6 text-clay">{p.body}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>

      {/* گذار به بخش تیره بعدی */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
};

export default FounderSection;
