import { ReadFile } from './read-file';
import { ReadMode } from './read-mode.enum';

export class ReadFileImpl implements ReadFile {
  get name(): string {
    return this.underlyingFile.name;
  }

  get size(): number {
    return this.underlyingFile.size;
  }

  get type(): string {
    return this.underlyingFile.type;
  }

  constructor(
    public readonly underlyingFile: File,
    public readonly readMode: ReadMode,
    public readonly content?: any
  ) {}
}
