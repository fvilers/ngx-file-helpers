import { ReadMode } from './read-mode.enum';

export interface PickedFile {
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  readMode: ReadMode;
  content: string;
}
