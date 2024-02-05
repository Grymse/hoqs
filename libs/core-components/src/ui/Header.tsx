import { cn } from './util';
import { TextColor } from './Text';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { PropsWithChildren } from 'react';

type HeaderVariant = 'title' | 'subtitle' | 'sub-subtitle';

type HeaderProps = PropsWithChildren<{
  variant?: HeaderVariant;
  color?: TextColor;
}> &
  Omit<React.ComponentProps<typeof FormattedMessage>, 'children'> &
  React.HTMLAttributes<HTMLHeadingElement>;

export function Header({
  variant = 'title',
  color = 'default',
  children,
  className,
  id,
  values,
  defaultMessage,
  ...props
}: HeaderProps) {
  return (
    <h1 id={id} className={getClasses(variant, color, className)} {...props}>
      {children ? (
        children
      ) : (
        <FormattedMessage
          id={id}
          values={values}
          defaultMessage={defaultMessage}
        />
      )}
    </h1>
  );
}

function getClasses(
  variant: HeaderVariant,
  color: TextColor,
  className: string | undefined
) {
  const textColorClass =
    color === 'muted'
      ? 'text-default-500'
      : color === 'default'
      ? 'text-default-foreground'
      : 'text-' + color;

  const textVariantClass =
    variant === 'title'
      ? 'tracking-tight font-bold text-4xl mb-3'
      : variant === 'subtitle'
      ? 'tracking-tight font-semibold text-2xl mt-6 mb-2'
      : 'font-light text-2xl mt-6 mb-2';

  return cn(textColorClass, textVariantClass, className);
}
