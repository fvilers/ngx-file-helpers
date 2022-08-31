import { Component } from '@angular/core';
import { ReadFile, ReadMode } from 'ngx-file-helpers';

@Component({
  selector: 'app-file-dropzone-demo',
  templateUrl: './file-dropzone-demo.component.html',
  styleUrls: ['./file-dropzone-demo.component.css'],
})
export class FileDropzoneDemoComponent {
  public readMode = ReadMode.DataURL;
  public isHover: boolean = false;
  public files: Array<ReadFile> = [];

  addFile(file: ReadFile) {
    this.files.push(file);
  }
}
