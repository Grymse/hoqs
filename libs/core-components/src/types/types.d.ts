import { Tables } from './supabase';
import { TIMELINE_ICOMS } from '../lib/variables.ts';

export type StorageImage = {
  description?: string;
  location?: string;
  driver?: string;
  contributors?: Contributor[];
} & AbstractStorageFile;

export type StorageFile = {
  description: string;
  badges?: string[];
} & AbstractStorageFile;

export interface AbstractStorageFile {
  title: string;
  url: string;
  updatedAt: string;
  createdAt: string;
  size: number;
  mimetype: string;
}

type ContributorRole =
  | 'Scientist'
  | 'Optimizer'
  | 'Prototyper'
  | 'Lead'
  | 'Helpful'
  | 'Writer';

export interface Contributor {
  name: string;
  description: string;
  role: ContributorRole;
}

export type SpeakerCabinet = MergeWithOverwrite<
  Tables<'cabinets'>,
  {
    images: StorageImage[] | null;
    files: StorageFile[] | null;
    measurements: StorageMeasurements[] | null;
    contributors: Contributor[];
    timeline: TimelineEntry[];
  }
>;

export type MergeWithOverwrite<T, U> = Omit<T, keyof U> & U;

export type ColorVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'secondary';

export interface BadgeType {
  title: string;
  color: ColorVariant;
  variant: 'dot' | 'shadow' | 'solid' | 'bordered' | 'light' | 'flat' | 'faded';
  icon?: LucideIcon;
}

export interface TimelineEntry {
  title: string;
  date: string;
  description: string;
  color: ColorVariant;
  badge?: string;
  icon?: keyof typeof TIMELINE_ICOMS;
}

export type Driver = Tables<'drivers'>;

export type DriverRank = 'Optimal' | 'Excellent' | 'Good' | 'Okay' | 'Bad';
