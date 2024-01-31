import { PropsWithChildren } from 'react';
import { cn } from './util';

type HeaderProps = PropsWithChildren<{
  variant?: 'title' | 'subtitle' | 'sub-subtitle';
  color?:
    | 'danger'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'muted';
}> &
  React.HTMLAttributes<HTMLHeadingElement>;

export default function Header({
  variant = 'title',
  color = 'default',
  children,
  className,
  ...props
}: HeaderProps) {
  const textColorClass =
    color === 'muted' ? 'text-default-500' : 'text-' + color;

  if (variant === 'title')
    return (
      <h1
        className={cn(
          'tracking-tight font-bold text-4xl mb-3',
          textColorClass,
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );

  if (variant === 'subtitle')
    return (
      <h2
        className={cn(
          'tracking-tight font-semibold text-2xl mt-6 mb-2',
          textColorClass,
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );

  return (
    <h3
      className={cn('font-light text-2xl mt-6 mb-2', textColorClass, className)}
      {...props}
    >
      {children}
    </h3>
  );
}
