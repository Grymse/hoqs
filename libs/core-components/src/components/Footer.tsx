import Text from './ui/Text';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { openCookieModal } from './Cookies';

export function Footer() {
  return (
    <footer className="grow flex flex-col justify-end w-full p-8 text-center">
      <Text variant="small" color="muted">
        <FormattedMessage id="footer.license-intro" />{' '}
        <Link to="/license" className="text-primary-500">
          <FormattedMessage id="footer.license" />
        </Link>
      </Text>
      <Text variant="small" color="muted" id="footer.creators" />
      <Text
        variant="small"
        className="cursor-pointer"
        onClick={openCookieModal}
      >
        <span className="text-primary-500">Cookie settings</span>
      </Text>
    </footer>
  );
}

export default Footer;
