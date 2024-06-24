import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { FileDropzoneDemoComponent } from './file-dropzone-demo/file-dropzone-demo.component';
import { FilePickerDemoComponent } from './file-picker-demo/file-picker-demo.component';
import { FilePickerLargeFilesDemoComponent } from './file-picker-large-files-demo/file-picker-large-files-demo.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    NgxFileHelpersModule,
    FileDropzoneDemoComponent,
    FilePickerDemoComponent,
    FilePickerLargeFilesDemoComponent
  ]
})
export class AppComponent { }
