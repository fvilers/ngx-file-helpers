import { Component, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FilePickerDirective,
  NgxFileHelpersModule,
  ReadFile,
  ReadMode,
} from 'ngx-file-helpers';
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

  protected readonly filePicker = viewChild(FilePickerDirective);

  protected ignoreTooBigFile(file: File): boolean {
    return file.size < 100000;
  }

  protected onReadStart(fileCount: number): void {
    this.status = `Reading ${fileCount} file(s)...`;
    this.picked = null;
  }

  protected onFilePicked(file: ReadFile): void {
    this.picked = file;
  }

  protected onReadEnd(fileCount: number): void {
    this.status = `Read ${fileCount} file(s) on ${new Date().toLocaleTimeString()}.`;
    this.filePicker()?.reset();
  }
}
