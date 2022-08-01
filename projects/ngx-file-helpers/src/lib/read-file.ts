import { ReadMode } from './read-mode.enum';

export interface ReadFile {
  name: string;
  size: number;
  type: string;
  readMode: ReadMode;
  content?: any;
  underlyingFile: File;
}
