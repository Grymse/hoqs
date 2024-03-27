import { Tables } from './supabase';

export type StorageImage = StorageItem;

export type StorageFile = {
  description: string;
} & StorageItem;

export interface AbstractStorageFile {
  title: string;
  url: string;
  uploadedAt: string;
  createdAt: string;
  size: number;
  mimetype: string;
}

export interface Contributor {
  user: string;
  desc: string;
}

export interface Measurements {
  image: string;
  data?: Blob;
  title: string;
  description: string;
  where: string;
  microphone: string;
  calibrated?: boolean;
}

export type WithImages<T> = MergeWithOverwrite<
  T,
  {
    images: StorageImage[] | null;
    files: StorageFile[] | null;
  }
>;

export type SpeakerCabinet = WithImages<Tables<'cabinets'>>;

export type MergeWithOverwrite<T, U> = Omit<T, keyof U> & U;
