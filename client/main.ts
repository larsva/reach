//require('angular2-universal-polyfills');
//import { platformUniversalDynamic } from 'angular2-universal';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

const platform = platformBrowserDynamic();

if (process.env.ENV === 'production') {
  enableProdMode();
}

platform.bootstrapModule(AppModule);
