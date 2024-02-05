import logo from '../assets/logo.svg';

interface HoqsLogoProps {
  size: number;
}

export function HoqsLogo({ size = 128 }: HoqsLogoProps) {
  return <img src={logo} height={size} width={size} alt="HOQS logo" />;
}
