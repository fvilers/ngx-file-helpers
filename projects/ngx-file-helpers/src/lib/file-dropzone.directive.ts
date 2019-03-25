import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { ReadFile } from './read-file';
import { ReadMode } from './read-mode.enum';
import { readFileAsync } from './helpers';

@Directive({
  selector: '[ngxFileDropzone]',
  exportAs: 'ngxFileDropzone'
})
export class FileDropzoneDirective {
  @Input('ngxFileDropzone')
  public readMode: ReadMode;

  @Input()
  public filter: (
    file: File,
    index: number,
    files: Array<File>
  ) => boolean = () => true;

  @Output()
  public fileDrop = new EventEmitter<ReadFile>();

  @Output()
  public readStart = new EventEmitter<number>();

  @Output()
  public readEnd = new EventEmitter<number>();

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    const files = Array.from<File>(event.dataTransfer.files).filter(
      this.filter
    );
    const fileCount = files.length;

    this.readStart.emit(fileCount);
    Promise.all(
      files.map(async file => {
        const readFile = await readFileAsync(file, this.readMode);
        this.fileDrop.emit(readFile);
      })
    ).then(() => this.readEnd.emit(fileCount));
  }
}
