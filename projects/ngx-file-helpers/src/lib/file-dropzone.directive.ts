import { Directive, HostListener, output } from '@angular/core';
import { FileHandler } from './file-handler';
import { ReadFile } from './read-file';

@Directive({
  selector: '[ngxFileDropzone]',
  exportAs: 'ngxFileDropzone',
})
export class FileDropzoneDirective extends FileHandler {
  public readonly fileDrop = output<ReadFile>();

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

    if (event.dataTransfer !== null) {
      this.readFiles(event.dataTransfer.files, (readFile) =>
        this.fileDrop.emit(readFile)
      );
    }
  }
}
