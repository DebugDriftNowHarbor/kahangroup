import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '../../lib/utils';

gsap.registerPlugin(useGSAP);

interface AnimatedTextProps {
  children?: React.ReactNode;
  text?: string | string[];
  isActive?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  text,
  isActive = true,
  delay = 0,
  duration = 0.85,
  stagger = 0.08,
  className,
  as: Component = 'div',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const lines = containerRef.current.querySelectorAll('[data-reveal-line]');
      if (!lines.length) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(lines, { yPercent: 0, opacity: 1 });
        return;
      }

      if (isActive) {
        gsap.fromTo(
          lines,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration,
            delay,
            stagger,
            ease: 'power4.out',
            overwrite: 'auto',
          }
        );
      } else {
        gsap.to(lines, {
          yPercent: -40,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          overwrite: 'auto',
        });
      }
    },
    { dependencies: [isActive, delay, duration, stagger], scope: containerRef }
  );

  const linesToRender = Array.isArray(text)
    ? text
    : typeof text === 'string'
    ? text.split('\n')
    : null;

  return (
    <Component
      ref={containerRef as React.RefObject<any>}
      className={cn('block overflow-hidden', className)}
    >
      {linesToRender ? (
        linesToRender.map((line, idx) => (
          <span key={idx} className="block overflow-hidden">
            <span
              data-reveal-line
              className="block will-change-transform transform-gpu"
            >
              {line}
            </span>
          </span>
        ))
      ) : (
        <span className="block overflow-hidden">
          <span
            data-reveal-line
            className="block will-change-transform transform-gpu"
          >
            {children}
          </span>
        </span>
      )}
    </Component>
  );
};
