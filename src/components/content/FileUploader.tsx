import { StorageFile } from '@/types/types';
import Uploader from './Uploader';
import { removeFileExtension } from '@/lib/translations';
import FileList from './FileList';

interface Props {
  files: StorageFile[] | null;
  updateFiles: (fn: (files: StorageFile[] | null) => StorageFile[]) => void;
  bucket: string;
  path: string;
}

export default function FileUploader({
  files,
  updateFiles,
  path,
  bucket,
}: Props) {
  function addFile(url: string, file: File) {
    updateFiles((files) => {
      const newFile = {
        url,
        title: removeFileExtension(file.name),
        size: file.size,
        description: '',
        mimetype: file.type,
      };
      if (!Array.isArray(files)) return [newFile];
      return [...files, newFile];
    });
  }

  /*  function deleteFiles(index: number) {
    updateFiles((files) => {
      if (!Array.isArray(files)) return [];
      return files.filter((_, i) => i !== index);
    });
  } */

  return (
    <div className="flex flex-col gap-4">
      <Uploader
        bucket={bucket}
        path={path}
        onFileUploaded={addFile}
        suggestedFiles="PDF, DOCS, XLSX, etc. Max 25mb"
      />
      <FileList files={files} />
    </div>
  );
}
