import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilePickerDirective } from './file-picker.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilePickerDirective],
  exports: [FilePickerDirective]
})
export class FileHelpersModule { }
