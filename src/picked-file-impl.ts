import { PickedFile } from './picked-file';
import { ReadMode } from './read-mode.enum';

export class PickedFileImpl implements PickedFile {
  get lastModifiedDate(): Date {
    return this._lastModifiedDate;
  }

  get name(): string {
    return this._name;
  }

  get size(): number {
    return this._size;
  }

  get type(): string {
    return this._type;
  }

  get readMode(): ReadMode {
    return this._readMode;
  }

  get content(): any {
    return this._content;
  }

  constructor(
    private _lastModifiedDate: Date,
    private _name: string,
    private _size: number,
    private _type: string,
    private _readMode: ReadMode,
    private _content: any) {
  }
}
