import { PropsWithChildren } from 'react';
import { cn } from './util';

type HeaderProps = PropsWithChildren<{
  variant?: 'regular' | 'thick' | 'small' | 'extra-small';
  color?:
    | 'danger'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'muted';
}> &
  React.HTMLAttributes<HTMLParagraphElement>;

export default function Text({
  variant = 'regular',
  color = 'default',
  children,
  className,
  ...props
}: HeaderProps) {
  const textColorClass =
    color === 'muted' ? 'text-default-500' : 'text-' + color;

  if (variant === 'regular')
    return (
      <p
        className={cn('my-3 leading-7 font-light', textColorClass, className)}
        {...props}
      >
        {children}
      </p>
    );

  if (variant === 'thick')
    return (
      <p
        className={cn('my-3 leading-7 font-medium', textColorClass, className)}
        {...props}
      >
        {children}
      </p>
    );

  if (variant === 'small')
    return (
      <p
        className={cn('my-3 leading-5 text-sm', textColorClass, className)}
        {...props}
      >
        {children}
      </p>
    );

  return (
    <p
      className={cn('my-2 leading-5 text-xs', textColorClass, className)}
      {...props}
    >
      {children}
    </p>
  );
}
