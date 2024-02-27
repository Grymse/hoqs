export interface StorageImage {
  title: string;
  url: string;
}

export type WithImages<T> = Omit<T, 'images'> & {
  images: StorageImage[] | null;
};
