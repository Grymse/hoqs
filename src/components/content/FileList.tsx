import { StorageFile } from '@/types/types';
import {
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from '@nextui-org/react';
import FileIcon from './FileIcon';
import { formatBytes } from '@/lib/translations';
import { Pencil } from 'lucide-react';

interface Props {
  files: StorageFile[] | null;
  onChange?: (files: StorageFile[] | null) => void;
}

export default function FileList({ files, onChange }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableColumn>TITLE</TableColumn>
        <TableColumn>DESCRIPTION</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No files to display.'}>
        {files
          ? files.map((file, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-2">
                  <FileIcon mimetype={file.mimetype} />
                  <div className="block">
                    {file.title} <br />
                    <span className="text-default-500">
                      {formatBytes(file.size)} - {file.mimetype}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{file.description}</TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  );
}
