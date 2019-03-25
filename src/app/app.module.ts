import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFileHelpersModule } from 'ngx-file-helpers';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxFileHelpersModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
