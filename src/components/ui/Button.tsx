import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex select-none items-center justify-center rounded-full font-medium transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet',
          {
            // Variants
            'bg-milk text-ink hover:bg-gradient-to-l hover:from-violet hover:to-cyan hover:text-milk shadow-md hover:shadow-glow-violet':
              variant === 'primary',
            'glass-dark text-milk hover:border-white/25': variant === 'secondary',
            'border border-violet/50 text-violet hover:bg-violet/10': variant === 'outline',
            'text-fog hover:text-milk hover:bg-white/[0.05]': variant === 'ghost',

            // Sizes
            'text-xs px-4 py-2 gap-1.5': size === 'sm',
            'text-xs sm:text-sm px-5.5 py-2.5 gap-2': size === 'md',
            'text-sm sm:text-base px-7 py-3.5 gap-2.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
