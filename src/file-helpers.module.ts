import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDropzoneDirective } from './file-dropzone.directive';
import { FilePickerDirective } from './file-picker.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FileDropzoneDirective, FilePickerDirective],
  exports: [FileDropzoneDirective, FilePickerDirective]
})
export class FileHelpersModule { }
