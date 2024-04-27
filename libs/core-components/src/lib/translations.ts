import { DriverRank } from '../types/types';

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

export function removeFileExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '');
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDateTime(date: Date | string | number): string {
  if (date === undefined) return '';

  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function formatDate(date: Date | string | number): string {
  if (date === undefined) return '';

  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  const dateStrings = date
    .toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .split(' ');

  const extension =
    dateStrings[0] === '1'
      ? 'st'
      : dateStrings[0] === '2'
      ? 'nd'
      : dateStrings[0] === '3'
      ? 'rd'
      : 'th';

  return `${dateStrings[1]} ${dateStrings[0]}${extension}, ${dateStrings[2]}`;
}

export function toMap<
  T extends {
    [key in K]: string;
  },
  K extends string
>(array: T[], key: K) {
  return array.reduce((map, obj) => {
    map.set(obj[key], obj);
    return map;
  }, new Map<string, T>());
}

export function rankToRankNumber(rank: DriverRank): number {
  switch (rank) {
    case 'Optimal':
      return 5;
    case 'Excellent':
      return 4;
    case 'Good':
      return 3;
    case 'Okay':
      return 2;
    case 'Bad':
      return 1;
  }
  return 0;
}
