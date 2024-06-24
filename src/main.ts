import { ApplicationConfig, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const appConfig: ApplicationConfig = {
  providers: [provideAnimations()]
}

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  console.error(err)
});
