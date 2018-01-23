import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { DroppedFile } from './dropped-file';
import { DroppedFileImpl } from './dropped-file-impl';
import { ReadMode } from './read-mode.enum';

@Directive({
  selector: '[ngFileDropzone]'
})
export class FileDropzoneDirective {
  @Input('ngFileDropzone') readMode: ReadMode;

  @Output()
  public fileDrop = new EventEmitter<DroppedFile>();
  
  @HostListener('dragenter', ['$event'])
  public onDragEnter(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  @HostListener('dragover', ['$event'])
  public onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  public onDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    var dt = event.dataTransfer;
    var files = dt.files;

    for (let i = 0; i < files.length; i++) {
      this.readFile(files[i]);
    }
  }

  private readFile(file: File) {
    const reader = new FileReader();
    
    reader.onload = (loaded: ProgressEvent) => {
      const fileReader = loaded.target as FileReader;
      const droppedFile = new DroppedFileImpl(file.lastModifiedDate, file.name, file.size, file.type, this.readMode, fileReader.result);

      this.fileDrop.emit(droppedFile);
    };

    switch (this.readMode) {
      case ReadMode.arrayBuffer:
        reader.readAsArrayBuffer(file);
        break;
      case ReadMode.binaryString:
        reader.readAsBinaryString(file);
        break;
      case ReadMode.text:
        reader.readAsText(file);
        break;
      case ReadMode.dataURL:
      default:
        reader.readAsDataURL(file);
        break;
    }
  }
}
