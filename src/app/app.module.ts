import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { AppComponent } from './app.component';
import { FileDropzoneDemoComponent } from './file-dropzone-demo/file-dropzone-demo.component';
import { FilePickerDemoComponent } from './file-picker-demo/file-picker-demo.component';
import { ReadModePipe } from './read-mode.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReadModePipe,
    FilePickerDemoComponent,
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
