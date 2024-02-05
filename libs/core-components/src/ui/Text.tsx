import { PropsWithChildren } from 'react';
import { cn } from './util';
import { FormattedMessage } from 'react-intl';
import { messages } from 'service';

export type TextVariant = 'regular' | 'thick' | 'small' | 'extra-small';
export type TextColor =
  | 'danger'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'muted';

type TextProps = PropsWithChildren<{
  variant?: TextVariant;
  color?: TextColor;
}> &
  Omit<React.ComponentProps<typeof FormattedMessage>, 'children' | 'id'> & {
    id?: keyof typeof messages; // Remove id from FormattedMessage and add type-safe id
  } & React.HTMLAttributes<HTMLParagraphElement>;

export function Text({
  variant = 'regular',
  color = 'default',
  children,
  className,
  id,
  values,
  defaultMessage,
  ...props
}: TextProps) {
  return (
    <p id={id} className={getClasses(variant, color, className)} {...props}>
      {children ? (
        children
      ) : (
        <FormattedMessage
          id={id}
          values={values}
          defaultMessage={defaultMessage}
        />
      )}
    </p>
  );
}

function getClasses(
  variant: TextVariant,
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
    variant === 'regular'
      ? 'my-3 leading-7 font-light'
      : variant === 'thick'
      ? 'my-3 leading-7 font-medium'
      : variant === 'small'
      ? 'my-3 leading-5 text-sm'
      : 'my-2 leading-5 text-xs';

  return cn(textColorClass, textVariantClass, className);
}
