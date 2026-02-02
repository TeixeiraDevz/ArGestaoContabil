import { Component } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.html',
  styles: [`
    .footer {
      position: relative;
      background: transparent;
      color: #f5f6fa;
      margin-top: -1px;
      overflow: visible;
    }
    
    .footer-content {
      /* Fundo azul escuro do footer */
      margin-top: 0;
      padding: 4.25rem 0 2.25rem;
      padding-top: calc(var(--cta-overlap, 6rem) + 2.5rem);
      background: linear-gradient(135deg, #0d1b2a 0%, #1b263b 45%, #0d1b2a 100%);
      position: relative;
      z-index: 1;
      overflow: hidden;
      margin-bottom: 0;
    }
    
    .footer-content::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.08), transparent 35%),
                  radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06), transparent 40%),
                  radial-gradient(circle at 50% 100%, rgba(255,255,255,0.05), transparent 35%);
      pointer-events: none;
      z-index: 0;
    }
    
    .footer-content > .container,
    .footer-content .container {
      position: relative;
      z-index: 1;
    }
    
    .footer-content.no-cta {
      margin-top: 0;
      padding-top: 4.5rem;
    }
    
    
    .footer-logo-section {
      margin-bottom: 1.5rem;
      background: transparent;
    }
    
    .footer-logo-img {
      max-width: 240px;
      max-height: 110px;
      width: 100%;
      height: auto;
      display: block;
      background: transparent;
      mix-blend-mode: normal;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25));
    }
    
    .footer-title {
      color: #f5f6fa;
      font-size: 1.35rem;
      font-weight: 700;
      margin-bottom: 1rem;
      max-width: 18rem;
    }
    
    .footer-subtitle {
      color: #f5f6fa;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .footer-text {
      color: #d5d8e6;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 0.5rem;
      max-width: 21rem;
    }

    .footer-map-container {
      width: 100%;
      max-width: 450px;
      height: 200px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.1);
      transition: all var(--transition-normal);
    }
    
    .footer-map-container:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
      border-color: rgba(102, 126, 234, 0.4);
    }
    
    .footer-map {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
    }
    
    .footer-links li {
      margin-bottom: 0.75rem;
    }
    
    .footer-link {
      color: #d5d8e6;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      display: inline-block;
    }
    
    .footer-link:hover {
      color: #667eea;
      transform: translateX(5px);
      text-decoration: underline;
    }

    
    .footer-contact .footer-link {
      color: #d5d8e6;
    }
    
    .footer-contact-phone-row {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
    }
    .footer-contact-phone-row .footer-contact-icon-phone {
      margin-top: 0;
      align-self: flex-start;
    }

    .footer-contact-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      margin-right: 0.75rem;
      margin-top: 0.2rem;
    }

    .footer-contact-content {
      min-width: 0;
      line-height: 1.6;
    }

    .footer-contact-content.d-flex.flex-column {
      gap: 0.2rem;
    }

    .footer-contact-content.d-flex.flex-column .footer-link {
      display: block;
    }

    .footer-contact .footer-link:hover {
      color: #667eea;
      text-decoration: underline;
    }
    
    .footer-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.12);
      border: none;
      margin: 2rem 0;
      margin-top: calc(var(--cta-overlap, 6rem) * 0.4);
      position: relative;
      z-index: 2;
    }
    
    .footer-copyright {
      color: #cdd2e3;
      font-size: 0.875rem;
    }
    
    .footer-contact svg,
    .footer-contact .footer-contact-icon {
      color: #d5d8e6;
      flex-shrink: 0;
    }
    
    .footer-social {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 0;
    }
    
    .social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: #d5d8e6;
      transition: all var(--transition-normal);
      text-decoration: none;
    }
    
    .social-link:hover {
      background: rgba(102, 126, 234, 0.2);
      color: #667eea;
      transform: translateY(-3px) scale(1.1);
    }
    
    .social-link svg {
      width: 20px;
      height: 20px;
    }
    
    @media (max-width: 768px) {
      .footer-social {
        justify-content: center;
        margin-bottom: 2rem;
      }
    }
    
    @media (max-width: 991px) {
      /* responsivo do footer apenas */
    }
    
    @media (max-width: 768px) {
      .footer-content {
        padding: 3rem 0 1.5rem;
      }
      
      .footer-logo-img {
        margin: 0 auto;
        max-width: 230px;
        max-height: 96px;
      }
      
      .footer-title {
        font-size: 1.2rem;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
      }
      
      .col-12.col-lg-4 {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      
      .footer-subtitle {
        font-size: 1rem;
        text-align: center;
        margin-top: 1.5rem;
      }
      
      .footer-links {
        text-align: center;
      }
      
      .footer-contact {
        text-align: center;
      }
      
      .footer-text {
        font-size: 0.9rem;
        margin-left: auto;
        margin-right: auto;
      }

      .footer-map-container {
        margin: 1.5rem auto 0;
        max-width: 100%;
        height: 180px;
      }
    }
    
    @media (max-width: 576px) {
      .footer-content {
        padding: 2.5rem 0 1.25rem;
      }
      
      .footer-title {
        font-size: 1.1rem;
      }
      
      .footer-subtitle {
        font-size: 0.95rem;
      }
      
      .footer-text {
        font-size: 0.85rem;
      }
      
      .footer-copyright {
        font-size: 0.8rem;
      }

      .footer-logo-img {
        max-width: 220px;
        max-height: 90px;
      }
    }
  `]
})
export class Footer {
  currentYear = new Date().getFullYear();
  isHomePage = false;
  mapUrl: SafeResourceUrl;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    // Endereço: Av. Bispo Pedro Massa, 12, CEP 69095160 - Manaus/AM
    // Usando o formato de embed do Google Maps (gratuito, sem API key necessária)
    // Formato: https://www.google.com/maps?q=endereço&output=embed
    const address = encodeURIComponent('Av. Bispo Pedro Massa, 12, Manaus - AM, 69095-160');
    const embedUrl = `https://www.google.com/maps?q=${address}&output=embed&hl=pt-BR&z=15`;
    
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isHomePage = this.router.url === '/' || this.router.url === '/home';
      });
    
    // Verificar rota inicial
    this.isHomePage = this.router.url === '/' || this.router.url === '/home';
  }
}
