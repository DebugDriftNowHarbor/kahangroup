import React, { useEffect, useState } from 'react';
import { ArrowUpLeft, Menu, X } from 'lucide-react';
import { HOLDING_TITLE } from '../../config/ecosystems.config';
import { cn } from '../../lib/utils';

const NAV_LINKS = [
  { id: 'founder', label: 'بنیان‌گذار' },
  { id: 'pillars', label: 'ارزش‌ها' },
  { id: 'businesses', label: 'کسب‌وکارها' },
  { id: 'process', label: 'رویه کار' },
  { id: 'contact', label: 'تماس' },
];

interface NavbarProps {
  onOpenCollaboration: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCollaboration }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // تعیین بخش فعال برای هایلایت لینک
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const pos = window.scrollY + window.innerHeight * 0.35;
      let current = '';
      for (const el of sections) {
        if (el && el.offsetTop <= pos) current = el.id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-2.5' : 'py-5'
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 transition-all duration-500',
          scrolled &&
            'mx-4 max-w-none rounded-2xl border border-white/10 bg-ink/70 py-2.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:mx-6'
        )}
      >
        {/* نشان برند */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex cursor-pointer items-center gap-3 focus-visible:outline-none"
          aria-label="بازگشت به بالای صفحه"
        >
          <span className="gradient-frame relative flex h-10 w-10 items-center justify-center rounded-xl bg-night/80 shadow-glow-violet">
            <span className="h-4 w-4 rotate-45 rounded-[3px] bg-gradient-to-br from-violet via-cyan to-mint transition-transform duration-500 group-hover:rotate-[135deg]" />
          </span>
          <span className="flex flex-col text-right leading-tight">
            <span className="text-sm font-bold text-milk">{HOLDING_TITLE}</span>
            <span className="font-latin text-[9px] uppercase tracking-[0.22em] text-dusk">BORHAN ECOSYSTEMS</span>
          </span>
        </button>

        {/* لینک‌های میانی */}
        <nav aria-label="ناوبری اصلی" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goTo(link.id)}
              className={cn(
                'relative rounded-full px-4 py-2 text-[13px] transition-colors cursor-pointer',
                activeSection === link.id ? 'text-milk' : 'text-fog hover:text-milk'
              )}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-l from-violet via-cyan to-mint transition-transform duration-300',
                  activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
                )}
              />
            </button>
          ))}
        </nav>

        {/* کنشها */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenCollaboration}
            className="group hidden cursor-pointer items-center gap-2 rounded-full bg-milk px-5 py-2.5 text-[13px] font-semibold text-ink transition-all duration-300 hover:bg-gradient-to-l hover:from-violet hover:to-cyan hover:text-ink sm:inline-flex"
          >
            <span>درخواست همکاری</span>
            <ArrowUpLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
            className="glass-dark inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-milk lg:hidden"
          >
            {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      <div
        className={cn(
          'mx-4 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-ink/90 backdrop-blur-xl transition-all duration-400 lg:hidden',
          mobileOpen ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 border-transparent opacity-0'
        )}
      >
        <nav className="flex flex-col p-3" aria-label="ناوبری موبایل">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goTo(link.id)}
              className="cursor-pointer rounded-xl px-4 py-3 text-right text-sm text-fog transition-colors hover:bg-white/5 hover:text-milk"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenCollaboration();
            }}
            className="mt-2 cursor-pointer rounded-xl bg-milk px-4 py-3 text-center text-sm font-semibold text-ink"
          >
            درخواست همکاری
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
