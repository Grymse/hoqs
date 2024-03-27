import { Tables } from './supabase';

export type StorageImage = {
  description?: string;
  location?: string;
  driver?: string;
  contributors?: Contributor[];
} & AbstractStorageFile;

export type StorageFile = {
  description: string;
} & AbstractStorageFile;

export interface AbstractStorageFile {
  title: string;
  url: string;
  updatedAt: string;
  createdAt: string;
  size: number;
  mimetype: string;
}

export interface Contributor {
  name: string;
  desc: string;
}

export type SpeakerCabinet = MergeWithOverwrite<
  Tables<'cabinets'>,
  {
    images: StorageImage[] | null;
    files: StorageFile[] | null;
    measurements: StorageMeasurements[] | null;
  }
>;

export type MergeWithOverwrite<T, U> = Omit<T, keyof U> & U;
