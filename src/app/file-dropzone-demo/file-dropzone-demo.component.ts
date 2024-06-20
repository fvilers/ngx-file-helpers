import { Component } from '@angular/core';
import { NgxFileHelpersModule, ReadFile, ReadMode } from 'ngx-file-helpers';
import { ReadModePipe } from '../read-mode.pipe';

@Component({
  standalone: true,
  selector: 'app-file-dropzone-demo',
  templateUrl: './file-dropzone-demo.component.html',
  styleUrl: './file-dropzone-demo.component.css',
  imports: [NgxFileHelpersModule, ReadModePipe]
})
export class FileDropzoneDemoComponent {
  public readMode = ReadMode.DataURL;
  public isHover: boolean = false;
  public files: Array<ReadFile> = [];

  addFile(file: ReadFile) {
    this.files.push(file);
  }
}
