import React from 'react';
import { ArrowUpLeft, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { CONTACT } from '../../config/site.config';
import { HOLDING_TITLE, HOLDING_ENGLISH_NAME, ECOSYSTEMS } from '../../config/ecosystems.config';
import { toPersianDigits } from '../../lib/utils';
import { SectionKicker } from '../common/SectionKicker';
import { Reveal, RevealGroup } from '../common/Reveal';

interface ContactSectionProps {
  onOpenCollaboration: () => void;
  onSelectEcosystem: (slug: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCollaboration, onSelectEcosystem }) => {
  const channels = [
    { icon: MapPin, label: 'دفتر مرکزی', value: CONTACT.address, ltr: false },
    { icon: Phone, label: 'خط مستقیم', value: toPersianDigits(CONTACT.phone), ltr: true },
    { icon: Mail, label: 'مکاتبات', value: CONTACT.email, ltr: true },
  ];

  return (
    <section
      id="contact"
      aria-label="تماس و دعوت به همکاری"
      className="relative overflow-hidden bg-ink pt-24 text-milk sm:pt-32"
    >
      {/* نورپردازی افق */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-blob left-1/2 top-[8%] h-[30rem] w-[44rem] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(106,92,255,0.22),transparent_66%)]" />
        <div className="aurora-blob bottom-[-30%] left-[12%] h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(66,240,181,0.14),transparent_66%)]" />
        <div className="grid-lines absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionKicker>{CONTACT.kicker}</SectionKicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-2xl font-black leading-[1.55] tracking-tight sm:text-4xl sm:leading-[1.5]">
              بیایید زیست‌بوم اختصاصی{' '}
              <span className="text-aurora">مجموعه شما را معماری کنیم</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-8 text-fog sm:text-[15px]">
              {CONTACT.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={onOpenCollaboration}
              className="group mt-9 inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-gradient-to-l from-violet via-violet-deep to-cyan px-8 py-4 text-sm font-bold text-milk shadow-glow-violet transition-all duration-300 hover:scale-[1.04]"
            >
              <Sparkles className="h-4 w-4" />
              <span>آغاز گفت‌وگوی همکاری</span>
              <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
        </div>

        {/* کانال‌های تماس */}
        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.12}>
          {channels.map((ch) => (
            <div
              key={ch.label}
              data-reveal
              className="glass-dark flex items-start gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-white/20"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-cyan">
                <ch.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <span className="block text-[11px] text-dusk">{ch.label}</span>
                <span
                  className="mt-1 block text-[13px] font-medium leading-6 text-milk"
                  dir={ch.ltr ? 'ltr' : 'rtl'}
                  style={ch.ltr ? { textAlign: 'right' } : undefined}
                >
                  {ch.value}
                </span>
              </div>
            </div>
          ))}
        </RevealGroup>

        {/* میان‌بر زیست‌بوم‌ها */}
        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 border-t border-white/[0.06] pt-8 text-xs">
            <span className="text-dusk">دسترسی سریع:</span>
            {ECOSYSTEMS.map((eco) => (
              <button
                key={eco.slug}
                type="button"
                onClick={() => onSelectEcosystem(eco.slug)}
                className="group inline-flex cursor-pointer items-center gap-1.5 text-fog transition-colors hover:text-cyan"
              >
                <span className="font-latin text-[10px] text-violet/80">{eco.indexNumber}.</span>
                <span className="border-b border-transparent transition-colors group-hover:border-cyan/60">
                  {eco.shortTitle.replace('زیست‌بوم ', '')}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* فوتر */}
      <footer role="contentinfo" className="relative z-10 mt-20 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-[11px] text-dusk sm:flex-row">
          <span>
            © {toPersianDigits(1405)} {HOLDING_TITLE} — تمامی حقوق مادی و معنوی محفوظ است.
          </span>
          <span className="font-latin flex items-center gap-3 uppercase tracking-[0.2em]">
            <span className="text-violet">{HOLDING_ENGLISH_NAME}</span>
            <span aria-hidden="true">/</span>
            <span>INTELLIGENT ARCHITECTURE</span>
          </span>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
