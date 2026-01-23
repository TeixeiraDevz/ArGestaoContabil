import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export type AppConfig = {
  apiUrl: string;
};

type WindowWithEnv = Window & {
  __env?: {
    API_URL?: string;
    apiUrl?: string;
  };
};

function readWindowEnv(): Partial<AppConfig> {
  const w = window as WindowWithEnv;
  const env = w.__env;
  if (!env) return {};
  return { apiUrl: env.API_URL ?? env.apiUrl };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  providedIn: 'root',
  factory: () => {
    const win = readWindowEnv();
    return {
      apiUrl: win.apiUrl ?? environment.apiUrl
    };
  }
});

