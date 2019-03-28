import { EventEmitter, Input, Output } from '@angular/core';
import { ReadMode } from './read-mode.enum';
import { readFileAsync } from './helpers';
import { ReadFile } from './read-file';

export abstract class FileHandler {
  @Input()
  public readMode: ReadMode;

  @Input()
  public filter: (
    file: File,
    index: number,
    files: Array<File>
  ) => boolean = () => true;

  @Output()
  public readStart = new EventEmitter<number>();

  @Output()
  public readEnd = new EventEmitter<number>();

  protected async readFiles(
    files: FileList,
    onFileRead: (fileRead: ReadFile) => void
  ): Promise<void> {
    const filteredFiles = Array.from<File>(files).filter(this.filter);
    const fileCount = filteredFiles.length;

    this.readStart.emit(fileCount);

    await Promise.all(
      filteredFiles.map(async file => {
        const readFile = await readFileAsync(file, this.readMode);
        onFileRead(readFile);
      })
    );

    this.readEnd.emit(fileCount);
  }
}
