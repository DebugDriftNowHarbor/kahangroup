import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** تأخیر پایه (ثانیه) */
  delay?: number;
  /** فاصله اولیه عمودی */
  y?: number;
  /** یک‌بار در ورود اول پخش شود */
  once?: boolean;
  as?: 'div' | 'section' | 'span' | 'li';
}

/**
 * ظرف محو-شدن نرم هنگام ورود به دید — با ScrollTrigger و احترام به reduced-motion.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 36,
  once = true,
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    },
    { scope: ref }
  );

  const Component = Tag as unknown as React.ElementType;

  return (
    <Component ref={ref as React.Ref<HTMLDivElement>} className={cn('opacity-0 will-change-transform', className)}>
      {children}
    </Component>
  );
};

/**
 * گروهی از فرزندان [data-reveal] را با استَگر پشت‌سرهم محو می‌کند.
 */
export const RevealGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}> = ({ children, className, stagger = 0.1, y = 32 }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll('[data-reveal]');
      if (!items.length) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%' },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
