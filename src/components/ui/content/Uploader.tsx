import { supabase } from '@/lib/supabase';
import Dropzone from 'react-dropzone';
import toast from 'react-hot-toast';

interface Props {
  bucket: string;
  path: string;
  suggestedFiles: string;
  allowedTypes: string[];
  onFileUploaded: (url: string, title: string) => void;
}
export default function Uploader({
  path,
  bucket,
  suggestedFiles,
  allowedTypes,
  onFileUploaded,
}: Props) {
  function uploadFiles(files: File[]) {
    if (5 < files.length) {
      toast.error('You can only upload 5 files at a time');
    }
    files
      .filter(assertFileType)
      .filter((_, i) => i < 5)
      .forEach((file) => {
        toast.promise(uploadToSupabase(file), {
          loading: `Uploading ${file.name}`,
          success: `Successfully uploaded ${file.name}`,
          error: (err) => `Failed to upload ${file.name} - ${err}`,
        });
      });
  }

  function assertFileType(file: File) {
    if (!allowedTypes.includes(file.type)) {
      toast.error(`File type ${file.type} is not allowed`);
      return false;
    }
    return true;
  }

  async function uploadToSupabase(file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path + '/' + file.name, file);
    if (error) throw error.message;

    const url = supabase.storage.from(bucket).getPublicUrl(data.path);
    onFileUploaded(url.data.publicUrl, file.name);
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {suggestedFiles}
              </p>
            </div>
            <input id="dropzone-file" {...getInputProps()} />
          </label>
        </div>
      )}
    </Dropzone>
  );
}
