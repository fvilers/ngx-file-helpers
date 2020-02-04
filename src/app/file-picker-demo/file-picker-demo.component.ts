import { Component, ViewChild } from '@angular/core';
import { FilePickerDirective, ReadFile, ReadMode } from 'ngx-file-helpers';

@Component({
  selector: 'app-file-picker-demo',
  templateUrl: './file-picker-demo.component.html',
  styleUrls: ['./file-picker-demo.component.css']
})
export class FilePickerDemoComponent {
  public readMode = ReadMode.dataURL;
  public picked: ReadFile;
  public status: string;

  @ViewChild('filePicker', { static: false })
  private filePicker: FilePickerDirective;

  ignoreTooBigFile(file: File): boolean {
    return file.size < 100000;
  }

  onReadStart(fileCount: number) {
    this.status = `Reading ${fileCount} file(s)...`;
  }

  onFilePicked(file: ReadFile) {
    this.picked = file;
  }

  onReadEnd(fileCount: number) {
    this.status = `Read ${fileCount} file(s) on ${new Date().toLocaleTimeString()}.`;
    this.filePicker.reset();
  }
}
