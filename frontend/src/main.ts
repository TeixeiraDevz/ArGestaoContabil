import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const prepareInitialScrollPosition = () => {
  // Prevent the browser from restoring the previous scroll position on hard reload (F5).
  // This avoids the "flash" where the page appears at the footer and then jumps to the top.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};

prepareInitialScrollPosition();
void import('bootstrap/dist/js/bootstrap.bundle.min.js');

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
