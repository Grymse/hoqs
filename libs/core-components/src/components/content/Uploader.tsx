import { AbstractStorageFile } from 'libs/core-components/src/types/types';
import Dropzone from 'react-dropzone';
import { useFileUploader } from '../../lib/upload';
import toast from 'react-hot-toast';

interface Props {
  supabaseBucket: string;
  supabasePath: string;
  subtitle: string;
  allowedTypes?: string[];
  onFilesUploaded: (file: AbstractStorageFile[]) => void;
}
export function Uploader({
  supabasePath,
  supabaseBucket,
  subtitle,
  allowedTypes,
  onFilesUploaded,
}: Props) {
  const uploadFile = useFileUploader({
    allowedTypes,
    supabasePath,
    supabaseBucket,
  });

  function uploadFiles(files: File[]) {
    if (5 < files.length) {
      toast.error('You can only upload 5 files at a time');
    }
    Promise.all(files.filter((_, i) => i < 5).map(uploadFile)).then(
      onFilesUploaded
    );
  }

  return (
    <Dropzone onDrop={uploadFiles}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({
            className: 'flex items-center justify-center h-full w-full',
            onDrop: (event) => event.stopPropagation(),
          })}
        >
          <label className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            </div>
            <input
              id="dropzone-file"
              aria-label="Dropzone for files or images"
              {...getInputProps()}
            />
          </label>
        </div>
      )}
    </Dropzone>
  );
}

export default Uploader;
