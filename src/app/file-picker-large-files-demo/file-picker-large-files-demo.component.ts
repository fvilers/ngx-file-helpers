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
  selector: 'app-file-picker-large-files-demo',
  templateUrl: './file-picker-large-files-demo.component.html',
  styleUrl: './file-picker-large-files-demo.component.css',
  imports: [MatButtonModule, NgxFileHelpersModule, ReadModePipe]
})
export class FilePickerLargeFilesDemoComponent {
  public readMode = ReadMode.Skip;
  public picked: ReadFile | null = null;
  public status: string | null = null;

  protected readonly filePicker = viewChild(FilePickerDirective);

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
