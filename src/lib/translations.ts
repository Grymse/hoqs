export function mmToInches(mm: number | null): string {
  if (!mm) return '0';
  const inches = (mm / 25.4).toFixed(2);
  if (inches.endsWith('.00')) return inches.slice(0, -2);
  return inches;
}

export function kgsToPounds(kgs: number | null): string {
  if (!kgs) return '0';
  const pounds = (kgs * 2.20462).toFixed(1);
  if (pounds.endsWith('.0')) return pounds.slice(0, -2);
  return pounds;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function woodThicknessToInches(woodThickness: string): string {
  switch (woodThickness) {
    case '6mm':
      return '1/4"';
    case '9mm':
      return '3/8"';
    case '12mm':
      return '1/2"';
    case '15mm':
      return '5/8"';
    case '18mm':
      return '3/4"';
    case '21mm':
      return '7/8"';
    case '24mm':
      return '1"';
    default:
      return '0';
  }
}

export function formatFrequency(frequency: number | null): string {
  if (frequency === null) {
    return '';
  }
  if (frequency > 1000) {
    return `${(frequency / 1000).toFixed(1)}kHz`;
  } else {
    return `${frequency}Hz`;
  }
}
