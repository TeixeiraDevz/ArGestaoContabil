import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Header } from './app/layout/header/header';
import { Footer } from './app/layout/footer/footer';
import { FooterCta } from './app/layout/footer-cta/footer-cta';
import { AssistantWidget } from './app/features/assistente/components/assistant-widget/assistant-widget';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Header, FooterCta, Footer, AssistantWidget],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ar-gestao-frontend');
  protected readonly isHomePage = signal(false);

  constructor(private router: Router) {
    this.isHomePage.set(this.router.url === '/' || this.router.url === '/home');

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.isHomePage.set(this.router.url === '/' || this.router.url === '/home');
    });
  }
}
