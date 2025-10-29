import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app/app.routes';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { EmployeeState } from './store/state/employee.state';

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(), // ✅ stays here, at root level
    importProvidersFrom(
      NgxsModule.forRoot([EmployeeState]), // put your states inside []
      NgxsReduxDevtoolsPluginModule.forRoot({ maxAge: 25 }),
      NgxsLoggerPluginModule.forRoot()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([]), // add your routes here
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
