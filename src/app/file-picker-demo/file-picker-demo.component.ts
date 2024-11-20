import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FilePickerDirective, NgxFileHelpersModule, ReadFile, ReadMode } from 'ngx-file-helpers';
import { ReadModePipe } from '../read-mode.pipe';

@Component({
  selector: 'app-file-picker-demo',
  templateUrl: './file-picker-demo.component.html',
  styleUrl: './file-picker-demo.component.css',
  imports: [MatButtonModule, NgxFileHelpersModule, ReadModePipe]
})
export class FilePickerDemoComponent {
  public readMode = ReadMode.DataURL;
  public picked: ReadFile | null = null;
  public status: string | null = null;

  @ViewChild(FilePickerDirective)
  private filePicker?: FilePickerDirective;

  ignoreTooBigFile(file: File): boolean {
    return file.size < 100000;
  }

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
