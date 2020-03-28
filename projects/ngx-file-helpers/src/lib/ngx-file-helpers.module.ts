import { NgModule } from '@angular/core';
import { FileDropzoneDirective } from './file-dropzone.directive';
import { FilePickerDirective } from './file-picker.directive';

@NgModule({
  declarations: [FileDropzoneDirective, FilePickerDirective],
  imports: [],
  exports: [FileDropzoneDirective, FilePickerDirective]
})
export class NgxFileHelpersModule {}
