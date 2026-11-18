import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

gsap.registerPlugin(useGSAP);

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!overlayRef.current || !panelRef.current) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const dur = reduced ? 0 : 1;

      if (isOpen) {
        gsap.set(containerRef.current, { visibility: 'visible', pointerEvents: 'auto' });
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.35 * dur + 0.01, ease: 'power2.out' });
        gsap.fromTo(
          panelRef.current,
          { xPercent: -100 },
          { xPercent: 0, duration: 0.55 * dur + 0.01, ease: 'power3.out' }
        );
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(containerRef.current, { visibility: 'hidden', pointerEvents: 'none' });
          },
        });
        tl.to(panelRef.current, { xPercent: -100, duration: 0.4 * dur + 0.01, ease: 'power3.in' }).to(
          overlayRef.current,
          { opacity: 0, duration: 0.3 * dur + 0.01, ease: 'power2.in' },
          '-=0.2'
        );
      }
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      className="invisible pointer-events-none fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 cursor-pointer bg-ink/85 opacity-0 backdrop-blur-md"
      />

      {/* Drawer Panel */}
      <aside
        ref={panelRef}
        className={cn(
          'architectural-scroll relative z-10 flex h-dvh w-full max-w-xl flex-col justify-between overflow-y-auto border-r border-white/[0.08] bg-night p-6 shadow-2xl will-change-transform sm:p-10',
          className
        )}
      >
        {/* نور بالای پنل */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(106,92,255,0.18),transparent_70%)]"
        />

        {/* Header */}
        <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/[0.07] pb-6">
          <div>
            {subtitle && (
              <span className="font-latin mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-violet">
                {subtitle}
              </span>
            )}
            {title && <h2 className="text-xl font-extrabold text-milk sm:text-2xl">{title}</h2>}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن پنجره"
            className="glass-dark cursor-pointer rounded-xl p-2.5 text-fog transition-colors hover:text-milk focus-visible:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 my-auto flex flex-1 flex-col justify-center py-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="relative z-10 shrink-0 border-t border-white/[0.07] pt-4 text-[11px] text-dusk">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
};
