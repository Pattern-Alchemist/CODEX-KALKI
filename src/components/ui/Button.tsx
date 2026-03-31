import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'mystic-button',
          variant === 'primary' && 'mystic-button-primary',
          variant === 'outline' && 'mystic-button-outline',
          variant === 'ghost' && 'hover:bg-white/10 text-mystic-light',
          size === 'sm' && 'px-4 py-1 text-sm',
          size === 'lg' && 'px-8 py-3 text-lg',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
