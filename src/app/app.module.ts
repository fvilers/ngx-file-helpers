import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { AppComponent } from './app.component';
import { FileDropzoneDemoComponent } from './file-dropzone-demo/file-dropzone-demo.component';
import { FilePickerDemoComponent } from './file-picker-demo/file-picker-demo.component';
import { FilePickerLargeFilesDemoComponent } from './file-picker-large-files-demo/file-picker-large-files-demo.component';
import { ReadModePipe } from './read-mode.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReadModePipe,
    FilePickerDemoComponent,
    FilePickerLargeFilesDemoComponent,
    FileDropzoneDemoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    NgxFileHelpersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
