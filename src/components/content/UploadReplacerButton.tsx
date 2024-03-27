import { supabase } from '@/lib/supabase';
import { AbstractStorageFile } from '@/types/types';
import { Button } from '@nextui-org/react';
import React, { useRef } from 'react';
import Dropzone from 'react-dropzone';
import toast from 'react-hot-toast';

type Props<T> = {
  file: T;
  allowedTypes?: string[];
  setFile: (file: T) => void;
} & React.ComponentProps<typeof Button>;
export default function UploaderReplacerButton<T extends AbstractStorageFile>({
  file,
  allowedTypes,
  setFile,
  children,
  ...props
}: Props<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  function uploadFile(files: File[]) {
    if (files.length > 1 || files.length === 0) {
      toast.error('You can only upload 1 file at a time');
    }
    const file = files[0];

    if (!assertFileType(file)) return;

    toast.promise(uploadToSupabase(file), {
      loading: `Updated ${file.name}`,
      success: `Successfully updated ${file.name}`,
      error: (err) => `Failed to upload ${file.name} - ${err.message}`,
    });
  }

  function assertFileType(file: File) {
    if (allowedTypes === undefined) return true;

    if (!allowedTypes.includes(file.type)) {
      toast.error(`File type ${file.type} is not allowed`);
      return false;
    }
    return true;
  }

  async function uploadToSupabase(newFile: File) {
    const totalPath = file.url.split('/storage/v1/object/public/')?.[1];
    const bucket = totalPath?.split('/')?.[0];
    const path = totalPath?.substring(bucket?.length + 1);
    if (!totalPath || !path || !bucket) throw new Error('Invalid path');

    const { error } = await supabase.storage
      .from(bucket)
      .update(path, newFile, {
        upsert: true,
      });

    if (error) throw error;

    setFile({
      ...file,
      updatedAt: new Date().toISOString(),
      mimetype: newFile.type,
      size: newFile.size,
    });
  }

  return (
    <Dropzone onDrop={uploadFile}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({
            onDrop: (event) => event.stopPropagation(),
          })}
          ref={inputRef}
        >
          <Button
            {...props}
            onPress={(e) => {
              inputRef.current?.click();
              props.onPress?.(e);
            }}
          >
            {children}
          </Button>
          <input id="dropzone-file" {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  );
}
