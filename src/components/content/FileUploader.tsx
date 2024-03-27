import { StorageFile } from '@/types/types';
import Uploader from './Uploader';
import { removeFileExtension } from '@/lib/translations';
import FileList from './FileList';

interface Props {
  files: StorageFile[] | null;
  updateFiles: (files: StorageFile[] | null) => void;
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
    const newFile = {
      url,
      title: removeFileExtension(file.name),
      size: file.size,
      description: '',
      mimetype: file.type,
    };

    if (!Array.isArray(files)) {
      updateFiles([newFile]);
    } else {
      updateFiles([...files, newFile]);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Uploader
        bucket={bucket}
        path={path}
        onFileUploaded={addFile}
        suggestedFiles="PDF, DOCS, XLSX, etc. Max 25mb"
      />
      <FileList files={files} onChange={updateFiles} />
    </div>
  );
}
