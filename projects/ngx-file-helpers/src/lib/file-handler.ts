import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { readFileAsync } from './helpers';
import { ReadFile } from './read-file';
import { ReadMode } from './read-mode.enum';

@Directive()
export abstract class FileHandler {
  @Input()
  public readMode: ReadMode = ReadMode.dataURL;

  @Input()
  public filter: (file: File, index: number, files: Array<File>) => boolean =
    () => true;

  @Output()
  public readStart = new EventEmitter<number>();

  @Output()
  public readEnd = new EventEmitter<number>();

  protected async readFiles(
    files: FileList,
    onFileRead: (fileRead: ReadFile) => void
  ): Promise<void> {
    const filteredFiles = Array.from<File>(files).filter((file, index, array) =>
      this.filter(file, index, array)
    );
    const fileCount = filteredFiles.length;

    this.readStart.emit(fileCount);

    await Promise.all(
      filteredFiles.map(async (file) => {
        const readFile = await readFileAsync(file, this.readMode);
        onFileRead(readFile);
      })
    );

    this.readEnd.emit(fileCount);
  }
}
