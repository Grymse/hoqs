import { Tables } from './supabase';

export interface StorageImage {
  title: string;
  url: string;
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

export interface AttachedFile {
  title: string;
  file: string;
  description: string;
  contributors: Contributor[];
}

export type WithImages<T> = Omit<T, 'images'> & {
  images: StorageImage[] | null;
};

export type SpeakerCabinet = WithImages<Tables<'cabinets'>>;
