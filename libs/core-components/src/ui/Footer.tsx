import { Link as LinkUI } from '@nextui-org/react';
import { Text } from './Text';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export function Footer() {
  return (
    <footer className="grow flex flex-col justify-end w-full p-8 text-center">
      <Text variant="small" color="muted">
        <FormattedMessage id="footer.license-intro" />{' '}
        <LinkUI as={Link} to="/license">
          <FormattedMessage id="footer.license" />
        </LinkUI>
      </Text>
      <Text variant="small" color="muted" id="footer.creators" />
    </footer>
  );
}
