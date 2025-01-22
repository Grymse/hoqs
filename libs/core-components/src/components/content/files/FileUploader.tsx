import {
  AbstractStorageFile,
  StorageFile,
} from 'libs/core-components/src/types/types';
import Uploader from '../Uploader';
import FileList from './FileList';

interface Props {
  files: StorageFile[] | null;
  setFiles: (files: StorageFile[] | null) => void;
  bucket: string;
  path: string;
}

export function FileUploader({ files, setFiles, path, bucket }: Props) {
  function addFile(newFiles: AbstractStorageFile[]) {
    const newFilesWithDescription = newFiles.map((file) => ({
      description: '',
      ...file,
    }));

    if (!Array.isArray(files)) {
      setFiles(newFilesWithDescription);
    } else {
      setFiles([...files, ...newFilesWithDescription]);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Uploader
        supabaseBucket={bucket}
        supabasePath={path}
        onFilesUploaded={addFile}
        subtitle="PDF, DOCS, XLSX, etc. Max 20mb"
      />
      <FileList files={files} setFiles={setFiles} />
    </div>
  );
}

export default FileUploader;
