import logo from '@core/assets/logo.svg';

interface HoqsLogoProps {
  size: number;
}

export default function HoqsLogo({ size = 128 }: HoqsLogoProps) {
  return <img src={logo} height={size} width={size} alt="HOQS logo" />;
}
