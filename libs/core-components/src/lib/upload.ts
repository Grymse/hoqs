import toast from 'react-hot-toast';
import { removeFileExtension } from './translations';
import { supabase } from './supabase';
import { AbstractStorageFile } from '../types/types';
import { useMemo } from 'react';

type FileUploaderProps = {
  allowedTypes: string[] | undefined;
  supabasePath: string;
  supabaseBucket: string;
};

export function useFileUploader({
  allowedTypes,
  supabasePath,
  supabaseBucket,
}: FileUploaderProps) {
  const uploadFiles = useMemo(() => {
    return async function uploadFile(file: File): Promise<AbstractStorageFile> {
      return new Promise((resolve, reject) => {
        if (!filetypeIsAllowed(file, allowedTypes)) {
          reject();
          return;
        }

        toast.promise(
          uploadToSupabase(file, supabasePath, supabaseBucket, resolve),
          {
            loading: `Uploading ${file.name}`,
            success: `Successfully uploaded ${file.name}`,
            error: (err) => {
              reject(`Failed to upload ${file.name} - ${err.message}`);
              return `Failed to upload ${file.name} - ${err.message}`;
            },
          }
        );
      });
    };
  }, [allowedTypes, supabasePath, supabaseBucket]);

  return uploadFiles;
}

export function filetypeIsAllowed(
  file: File,
  allowedTypes: string[] | undefined
) {
  if (allowedTypes === undefined) return true;

  if (!allowedTypes.includes(file.type)) {
    toast.error(`File type ${file.type} is not allowed`);
    return false;
  }
  return true;
}

export async function uploadToSupabase(
  file: File,
  supabasePath: string,
  supabaseBucket: string,
  onFileUploaded: (file: AbstractStorageFile) => void
) {
  const uploadPath = supabasePath + '/' + file.name;

  const { data, error } = await supabase.storage
    .from(supabaseBucket)
    .upload(uploadPath, file);

  // @ts-expect-error error.error is not defined in the Supabase error type
  if (error && error.error !== 'Duplicate') throw error;

  const url = supabase.storage
    .from(supabaseBucket)
    .getPublicUrl(data?.path || uploadPath);
  onFileUploaded({
    title: removeFileExtension(file.name),
    size: file.size,
    mimetype: file.type,
    url: url.data.publicUrl,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  });

  // If the file already exists, we throw an error to let the user know that the file was not uploaded,
  // but we still return the file, so that the user can use the existing file.
  if (error)
    throw new Error(
      'File of same name already exists. Opted to use existing file in cloud storage. If the current file is deprecated or wrong, please rename the file to be uploaded and try again.'
    );
}
