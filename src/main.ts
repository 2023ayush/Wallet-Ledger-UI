import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { jwtInterceptor } from './app/interceptors/jwt-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withInterceptors([jwtInterceptor])), // JWT interceptor
    provideRouter(routes) // ✅ add this to enable router navigation
  ]
})
.catch(err => console.error(err));
