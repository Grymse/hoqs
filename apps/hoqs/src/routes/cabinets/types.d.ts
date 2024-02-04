export type CabinetType =
  | 'kick'
  | 'top'
  | 'sub'
  | 'fullrange'
  | 'kick/top'
  | 'kick/sub';

export interface Cabinet {
  id: string;
  brand: string;
  model: string;
  /* shortDescription: string;
  description: string; */
  contributors: Contributor[];
  type: CabinetType;
  driverSize: number;
  maxSPL: number[];
  frequencyStart: number;
  frequencyEnd: number;
  sensitivity: number[];
  sensitivityMeasurement: string;
  horizontalDirectivity: number;
  verticalDirectivity: number;
  heightCm: number;
  widthCm: number;
  depthCm: number;
  /* woodThicknessMm: number; */
  weightKg: number;
  /* measurements: Measurements[];
  files: AttachedFile[]; */
}

interface Contributor {
  user: string;
  desc: string;
}

interface Measurements {
  image: string;
  data?: Blob;
  title: string;
  description: string;
  where: string;
  microphone: string;
  calibrated?: boolean;
}

interface AttachedFile {
  title: string;
  file: string;
  description: string;
  contributors: Contributor[];
}
