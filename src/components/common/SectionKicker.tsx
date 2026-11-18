import React from 'react';
import { cn } from '../../lib/utils';

interface SectionKickerProps {
  children: React.ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}

/** برچسب کوچک بالای هر بخش — با نقطه درخشان و حروف لاتین */
export const SectionKicker: React.FC<SectionKickerProps> = ({ children, tone = 'dark', className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[11px] font-medium tracking-wide',
        tone === 'dark'
          ? 'border-white/10 bg-white/[0.04] text-violet backdrop-blur-md'
          : 'border-void/10 bg-white/70 text-terra',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pulse-dot h-1.5 w-1.5 rounded-full',
          tone === 'dark' ? 'bg-mint' : 'bg-terra'
        )}
      />
      {children}
    </span>
  );
};

export default SectionKicker;
