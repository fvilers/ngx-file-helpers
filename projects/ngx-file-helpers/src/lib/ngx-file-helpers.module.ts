import { NgModule } from '@angular/core';
import { FileDropzoneDirective } from './file-dropzone.directive';
import { FilePickerDirective } from './file-picker.directive';

@NgModule({
  imports: [FileDropzoneDirective, FilePickerDirective],
  exports: [FileDropzoneDirective, FilePickerDirective],
})
export class NgxFileHelpersModule { }
