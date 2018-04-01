import { ReadFile } from './read-file';
import { ReadMode } from './read-mode.enum';

export class ReadFileImpl implements ReadFile {
  get lastModifiedDate(): Date {
    return this._underlyingFile.lastModifiedDate;
  }

  get name(): string {
    return this._underlyingFile.name;
  }

  get size(): number {
    return this._underlyingFile.size;
  }

  get type(): string {
    return this._underlyingFile.type;
  }

  get readMode(): ReadMode {
    return this._readMode;
  }

  get content(): any {
    return this._content;
  }

  get underlyingFile(): File {
    return this._underlyingFile;
  }

  constructor(
    private _underlyingFile: File,
    private _readMode: ReadMode,
    private _content: any
  ) {}
}
