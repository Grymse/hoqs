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
