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
import { FileHandler } from './file-handler';

@Directive({
  selector: '[ngxFileDropzone]',
  exportAs: 'ngxFileDropzone'
})
export class FileDropzoneDirective extends FileHandler {
  @Output()
  public fileDrop = new EventEmitter<ReadFile>();

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

    this.readFiles(event.dataTransfer.files, readFile =>
      this.fileDrop.emit(readFile)
    );
  }
}
