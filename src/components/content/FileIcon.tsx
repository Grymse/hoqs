import { File, FileCode, FileText, Image, Music, Video } from 'lucide-react';
import { ComponentProps } from 'react';

type Props = {
  mimetype: string;
} & ComponentProps<typeof File>;

export default function FileIcon({ mimetype, ...props }: Props) {
  // @ts-expect-error - Icon is a component
  const Icon = MimeToIcon[mimetype] || File;
  return <Icon {...props}></Icon>;
}

const MimeToIcon = {
  'text/plain': FileText,
  'text/html': FileCode,
  'text/css': FileCode,
  'application/javascript': FileCode,
  'application/json': FileCode,
  'application/xml': FileCode,
  'application/pdf': FileText,
  'application/msword': FileText,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    FileText,
  'application/vnd.ms-excel': FileText,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileText,
  'application/vnd.ms-powerpoint': FileText,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    FileText,
  'image/jpeg': Image,
  'image/png': Image,
  'image/gif': Image,
  'image/svg+xml': Image,
  'audio/mpeg': Music,
  'audio/ogg': Music,
  'audio/*': Music,
  'video/mp4': Video,
  'video/x-matroska': Video,
  'video/quicktime': Video,
  'video/*': Video,
};
