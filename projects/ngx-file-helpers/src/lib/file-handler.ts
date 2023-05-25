import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { readFileAsync } from './helpers';
import { ReadFile } from './read-file';
import { ReadMode } from './read-mode.enum';

@Directive()
export abstract class FileHandler {
  @Input()
  public readMode: ReadMode = ReadMode.DataURL;

  @Input()
  public filter: (file: File, index: number, files: Array<File>) => boolean =
    () => true;

  @Output()
  public readStart = new EventEmitter<number>();

  @Output()
  public readEnd = new EventEmitter<number>();

  @Output()
  public readError = new EventEmitter<{ file: File, error: any }>();

  protected async readFiles(
    files: FileList,
    onFileRead: (fileRead: ReadFile) => void
  ): Promise<void> {
    const filteredFiles = Array.from<File>(files).filter((file, index, array) =>
      this.filter(file, index, array)
    );
    const fileCount = filteredFiles.length;
    let readCount = 0;

    this.readStart.emit(fileCount);

    await Promise.all(
      filteredFiles.map(async (file) => {
        try {
          const readFile = await readFileAsync(file, this.readMode);
          onFileRead(readFile);
          readCount++;
        } catch (err) {
          this.readError.emit({ file, error: err });
          // do not re-throw, the promise returned by readFiles is not awaited anywhere
          // and re-throwing would result in "unhandled rejections" that the consumer cannot handle
        }
      })
    ).finally(() => {
      this.readEnd.emit(readCount);
    });
  }
}
