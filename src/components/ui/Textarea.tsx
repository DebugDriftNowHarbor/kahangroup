import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-2 block text-xs font-medium text-milk sm:text-sm">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          className={cn(
            'w-full resize-none rounded-xl border border-white/10 bg-ink-soft/80 px-4 py-3 text-sm leading-7 text-milk transition-all duration-300 placeholder:text-dusk focus:border-violet focus:bg-ink-soft focus:outline-none focus:ring-1 focus:ring-violet/60',
            error && 'border-rose focus:border-rose focus:ring-rose/50',
            className
          )}
          {...props}
        />
        {error && (
          <p role="alert" className="mt-1.5 text-xs text-rose">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
