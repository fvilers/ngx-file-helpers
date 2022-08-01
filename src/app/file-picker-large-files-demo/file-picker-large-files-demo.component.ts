import { Component, ViewChild } from '@angular/core';
import { FilePickerDirective, ReadFile, ReadMode } from 'ngx-file-helpers';

@Component({
  selector: 'app-file-picker-large-files-demo',
  templateUrl: './file-picker-large-files-demo.component.html',
  styleUrls: ['./file-picker-large-files-demo.component.css'],
})
export class FilePickerLargeFilesDemoComponent {
  public readMode = ReadMode.skip;
  public picked: ReadFile | null = null;
  public status: string | null = null;

  @ViewChild('filePicker', { static: false })
  private filePicker?: FilePickerDirective;

  onReadStart(fileCount: number) {
    this.status = `Reading ${fileCount} file(s)...`;
    this.picked = null;
  }

  onFilePicked(file: ReadFile) {
    this.picked = file;
  }

  onReadEnd(fileCount: number) {
    this.status = `Read ${fileCount} file(s) on ${new Date().toLocaleTimeString()}.`;
    this.filePicker?.reset();
  }
}
