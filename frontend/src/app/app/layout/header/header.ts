import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styles: [`
    .navbar-wrapper {
      position: fixed;
      top: 1.5rem;
      left: 0;
      right: 0;
      z-index: 1000;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      pointer-events: none;
    }
    
    .navbar {
      background: transparent !important;
      box-shadow: none;
      padding: 0;
      transition: all var(--transition-normal);
      position: relative;
      z-index: 1000;
      width: auto;
      display: flex;
      pointer-events: auto;
    }
    
    .navbar-left {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .navbar-left.hidden {
      transform: translateX(-50%) translateY(-100%);
    }
    
    .navbar.hidden {
      pointer-events: none;
      opacity: 0;
    }
    
    .navbar.hidden .container {
      pointer-events: auto;
    }
    
    .navbar .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(102, 126, 234, 0.15);
      border-radius: 50px;
      padding: 0.4rem 1.25rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
      width: auto;
      gap: 0.5rem;
      transition: all var(--transition-normal);
    }
    
    .navbar.scrolling .container {
      background: rgba(255, 255, 255, 0.98);
      border: 1px solid rgba(102, 126, 234, 0.2);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .navbar:not(.scrolling) .container {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(102, 126, 234, 0.1);
    }
    
    .navbar.over-hero .container {
      background: rgba(255, 255, 255, 0.1) !important;
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    
    .navbar.over-hero .navbar-brand {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
    
    .navbar:not(.scrolling):not(.over-hero) .nav-link {
      color: var(--color-black) !important;
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
    }
    
    .navbar:not(.scrolling):not(.over-hero) .navbar-brand {
      filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8));
    }
    
    .navbar-brand {
      flex-shrink: 0;
      padding: 0;
      margin: 0;
      margin-right: 0.5rem;
      transition: transform var(--transition-normal);
    }
    
    .navbar.visible {
      opacity: 1;
    }
    
    .navbar-left.visible {
      transform: translateX(-50%) translateY(0);
    }
    
    
    .navbar-brand:hover {
      transform: scale(1.05);
    }
    
    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo-container {
      background: transparent;
      padding: 0;
    }
    
    .logo-container .brand-logo {
      width: auto;
      height: 40px;
      max-width: 140px;
      object-fit: contain;
      display: block;
      transition: transform var(--transition-normal);
      background: transparent;
      mix-blend-mode: normal;
    }
    
    .navbar.over-hero .logo-container .brand-logo {
      mix-blend-mode: normal;
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
    }
    :host-context(body.page-landing) .navbar.over-hero .logo-container .brand-logo {
      filter: brightness(0) invert(1);
    }
    
    .navbar-brand:hover .logo-container .brand-logo {
      transform: scale(1.03);
    }
    
    .nav-link {
      color: var(--color-black) !important;
      font-weight: 500;
      font-size: 0.9rem;
      padding: 0.4rem 0.9rem !important;
      transition: all var(--transition-normal);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      border: none;
      background: none;
    }
    
    .nav-link:hover {
      color: var(--color-purple) !important;
      transform: translateY(-1px);
    }
    
    .navbar.over-hero .nav-link,
    .navbar.over-hero .nav-link:hover {
      color: #ffffff !important;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .navbar.over-hero .nav-link:hover {
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    }
    
    .nav-cta.btn-nav-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      border-radius: 50px;
      background: #22c55e;
      color: #fff !important;
      font-weight: 600;
      text-decoration: none;
      border: none;
      transition: all var(--transition-normal);
      box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);
    }
    .nav-cta.btn-nav-cta:hover {
      background: #16a34a;
      color: #fff !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(34, 197, 94, 0.5);
    }
    .navbar.over-hero .nav-cta.btn-nav-cta {
      color: #fff !important;
    }
    
    .dropdown {
      position: relative;
    }
    
    .dropdown-toggle {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
    }
    
    /* Remove a seta padrão do Bootstrap */
    .dropdown-toggle::after {
      display: none !important;
    }
    
    .dropdown-arrow {
      transition: transform var(--transition-normal);
      color: currentColor;
      flex-shrink: 0;
    }
    
    .dropdown-arrow.rotated {
      transform: rotate(180deg);
    }
    
    .dropdown-toggle:hover .dropdown-arrow {
      color: var(--color-purple);
    }
    
    .dropdown-menu {
      border: 1px solid rgba(102, 126, 234, 0.15);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-radius: 12px;
      padding: 0.5rem;
      margin-top: 0.75rem;
      min-width: 220px;
      left: 84px;
      top: 16px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      animation: dropdownFadeIn 0.2s ease-out;
    }
    
    @keyframes dropdownFadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .dropdown-item {
      padding: 0.875rem 1rem;
      color: var(--color-black);
      transition: all var(--transition-fast);
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.875rem;
      border-radius: 8px;
      text-decoration: none;
    }
    
    .dropdown-item:hover {
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.08) 0%, rgba(102, 126, 234, 0.05) 100%);
      color: var(--color-purple);
      transform: translateX(4px);
    }
    
    .dropdown-item-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.1));
      flex-shrink: 0;
      transition: all var(--transition-fast);
    }
    
    .dropdown-item:hover .dropdown-item-icon {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(118, 75, 162, 0.2));
      transform: scale(1.1);
    }
    
    .dropdown-item-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
    }
    
    .dropdown-item-title {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--color-black);
      line-height: 1.3;
    }
    
    .dropdown-item-subtitle {
      font-weight: 400;
      font-size: 0.8rem;
      color: var(--color-gray);
      line-height: 1.2;
    }
    
    .dropdown-item:hover .dropdown-item-title {
      color: var(--color-purple);
    }
    
    .dropdown-item:hover .dropdown-item-subtitle {
      color: var(--color-purple);
      opacity: 0.8;
    }
    
    .external-icon {
      opacity: 0.6;
      transition: all var(--transition-normal);
    }
    
    .nav-link:hover .external-icon {
      opacity: 1;
      transform: translate(2px, -2px);
    }
    
    
    .navbar-toggler {
      border: none;
      padding: 0.25rem 0.5rem;
    }
    
    .navbar-toggler:focus {
      box-shadow: none;
    }
    
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }

    .floating-navbar-toggler {
      position: fixed;
      top: 0.75rem;
      left: 0.75rem;
      z-index: 1100;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(102, 126, 234, 0.2);
      border-radius: 12px;
      padding: 0.5rem 0.6rem;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      backdrop-filter: blur(8px);
      /* Visibilidade controlada via [class.d-none] no template */
    }

    .floating-navbar-toggler:hover {
      background: rgba(255, 255, 255, 1);
    }

    /* Garantia: o floating toggler NUNCA deve aparecer no desktop */
    @media (min-width: 992px) {
      .floating-navbar-toggler {
        display: none !important;
      }
    }
    
    /* Floating toggler controlado via showFloatingToggler no componente */
    
    @media (max-width: 991px) {
      .navbar-wrapper {
        flex-direction: column;
        gap: 0.5rem;
        align-items: stretch;
      }
      
      .navbar {
        position: relative !important;
        width: 100%;
      }
      
      .navbar-left {
        position: relative;
        left: auto;
        transform: none;
      }
      
      .navbar-left.hidden {
        transform: translateY(-100%);
      }
      
      .navbar-left.visible {
        transform: translateY(0);
      }
      
      .navbar .container {
        border-radius: 20px;
        padding: 0.75rem 1.5rem;
        width: 100%;
        max-width: 100%;
        margin: 0;
        min-width: auto;
        gap: 0.75rem;
      }
      
      /* Esconder o hambúrguer normal quando a navbar está escondida */
      .navbar .navbar-toggler {
        display: block;
      }
      
      .navbar.hidden .navbar-toggler {
        display: none !important;
      }
      
      .navbar-collapse {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        background: rgba(255, 255, 255, 0.98);
        border-radius: 12px;
        padding: 1rem;
        margin-left: -1rem;
        margin-right: -1rem;
        margin-top: 0.75rem;
        width: 100%;
      }
      
      .navbar-collapse.show {
        display: block !important;
      }
      
      .navbar-nav {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 0.5rem !important;
        width: 100%;
      }
      
      .nav-link {
        width: 100%;
        padding: 0.75rem 1rem !important;
        border-radius: 8px;
        transition: background-color var(--transition-fast);
        font-size: 0.95rem;
      }
      
      .nav-link:hover {
        background-color: var(--color-gray-light);
      }
      
      .dropdown-menu {
        position: static !important;
        float: none;
        width: 100%;
        margin-top: 0.5rem;
        margin-left: 0;
        border: 1px solid rgba(102, 126, 234, 0.15);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        background: rgba(255, 255, 255, 0.98);
        left: 0 !important;
        top: auto !important;
        border-radius: 12px;
        padding: 0.5rem;
      }
      
      .dropdown-item {
        padding: 1rem;
      }
      
      .dropdown-item-icon {
        width: 36px;
        height: 36px;
      }
    }
    
    @media (max-width: 576px) {
      .navbar-wrapper {
        padding: 0.5rem;
      }
      
      .navbar .container {
        border-radius: 16px;
        padding: 0.625rem 1rem;
        margin: 0;
        width: 100%;
      }
      
      .navbar-collapse {
        padding: 0.75rem;
        margin-left: 0;
        margin-right: 0;
      }

      .logo-container .brand-logo {
        height: 34px;
        max-width: 120px;
      }

      .nav-link {
        font-size: 1rem;
        padding: 0.85rem 1rem !important;
      }
    }
  `]
})
export class Header implements OnInit, OnDestroy {
  @ViewChild('navbarCollapse') navbarCollapse?: ElementRef<HTMLElement>;
  @ViewChild('navbarRoot') navbarRoot?: ElementRef<HTMLElement>;
  private lastScrollY = 0;
  navbarClass = 'navbar visible';

  isNavOpen = false;
  showFloatingToggler = false;
  
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  
  private isOnLandingPage(): boolean {
    const url = this.router.url.split('?')[0];
    return url === '/' || url === '/home' || url.startsWith('/#');
  }
  
  ngOnInit() {
    this.lastScrollY = window.scrollY;
    
    // Transparência na landing page inteira (hero ou qualquer seção)
    const useTransparentStyle = this.isOnLandingPage();
    
    // No mobile, sempre iniciar com navbar escondida
    if (this.isMobileOrTablet()) {
      if (window.scrollY < 50) {
        this.navbarClass = 'navbar hidden';
      } else {
        this.navbarClass = 'navbar scrolling hidden';
      }
    } else {
      this.navbarClass = 'navbar visible' + (useTransparentStyle ? ' over-hero' : '');
    }
    
    // Atualizar floating toggler após definir o estado inicial da navbar
    this.updateFloatingToggler(window.scrollY);
    
    // Fechar navbar ao navegar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeNavbar();
        // Manter transparência na landing page após navegação
        setTimeout(() => {
          if (this.isOnLandingPage() && !this.isMobileOrTablet()) {
            const hasScrolling = window.scrollY >= 50;
            this.navbarClass = 'navbar ' + (hasScrolling ? 'scrolling ' : '') + 'visible over-hero';
          }
        }, 100);
      });
  }
  
  ngOnDestroy() {
  }
  
  scrollToSection(event: Event, sectionId: string): void {
    const url = this.router.url;
    if (url === '/' || url.startsWith('/#')) {
      event.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  closeNavbar(): void {
    this.isNavOpen = false;

    const scrollY = window.scrollY;
    const useTransparentStyle = this.isOnLandingPage();
    
    if (this.isMobileOrTablet()) {
      // No mobile, sempre esconder quando fecha
      if (scrollY >= 50) {
        this.navbarClass = 'navbar scrolling hidden';
      } else {
        this.navbarClass = 'navbar hidden';
      }
    } else {
      // Desktop: manter transparência em toda a landing page
      if (scrollY >= 50) {
        this.navbarClass = 'navbar scrolling visible' + (useTransparentStyle ? ' over-hero' : '');
      } else {
        this.navbarClass = 'navbar visible' + (useTransparentStyle ? ' over-hero' : '');
      }
    }

    this.updateFloatingToggler(scrollY);
  }

  toggleNavbar(): void {
    const nextOpen = !this.isNavOpen;
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
    const isNearFooter = scrollPercentage > 80;

    this.isNavOpen = nextOpen;

    if (this.isNavOpen) {
      // Ao abrir, garantir que a navbar apareça
      if (scrollY >= 50 || isNearFooter) {
        this.navbarClass = 'navbar scrolling visible';
      } else {
        this.navbarClass = 'navbar visible';
      }
    } else {
      // Ao fechar, sempre esconder no mobile/tablet
      if (this.isMobileOrTablet()) {
        // No mobile, sempre esconder quando fecha
        if (scrollY >= 50 || isNearFooter) {
          this.navbarClass = 'navbar scrolling hidden';
        } else {
          // No topo, esconder também
          this.navbarClass = 'navbar hidden';
        }
      } else {
        // Desktop: manter transparência em toda a landing page
        const useTransparentStyle = this.isOnLandingPage();
        if (scrollY >= 50) {
          this.navbarClass = 'navbar scrolling visible' + (useTransparentStyle ? ' over-hero' : '');
        } else {
          this.navbarClass = 'navbar visible' + (useTransparentStyle ? ' over-hero' : '');
        }
      }
    }

    this.updateFloatingToggler(scrollY);
  }


  private isMobileOrTablet(): boolean {
    return window.matchMedia('(max-width: 991px)').matches;
  }

  private updateFloatingToggler(scrollY: number): void {
    if (!this.isMobileOrTablet()) {
      this.showFloatingToggler = false;
      this.cdr.detectChanges();
      return;
    }
    
    const isAtTop = scrollY < 50;
    // No mobile, mostrar o floating toggler APENAS no topo (scrollY < 50)
    // Quando rolar para baixo (scrollY >= 50), o hambúrguer desaparece para não atrapalhar
    const shouldShow = isAtTop && !this.isNavOpen;
    
    if (this.showFloatingToggler !== shouldShow) {
      this.showFloatingToggler = shouldShow;
      this.cdr.detectChanges();
    }
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideNavbar = this.navbarRoot?.nativeElement.contains(target) ?? false;
    const clickedFloatingToggler = !!target.closest('.floating-navbar-toggler');

    // Se clicou fora do header, fechar menu (mobile/tablet)
    if (this.isNavOpen && !clickedInsideNavbar && !clickedFloatingToggler) {
      this.closeNavbar();
    }
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    this.updateFloatingToggler(window.scrollY);
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > this.lastScrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPercentage = (documentHeight - windowHeight > 0) ? (currentScrollY / (documentHeight - windowHeight)) * 100 : 0;
    const isNearFooter = scrollPercentage > 80; // Se está nos últimos 20% da página (próximo do footer)
    
    // Transparência mantida em toda a landing page
    const useTransparentStyle = this.isOnLandingPage();

    // Mobile/tablet: comportamento especial
    if (this.isMobileOrTablet()) {
      // No mobile, sempre esconder a navbar, só mostrar se o menu estiver aberto
      if (this.isNavOpen) {
        // Menu aberto: mostrar
        if (currentScrollY >= 50 || isNearFooter) {
          this.navbarClass = 'navbar scrolling visible' + (useTransparentStyle ? ' over-hero' : '');
        } else {
          this.navbarClass = 'navbar visible' + (useTransparentStyle ? ' over-hero' : '');
        }
      } else {
        // Menu fechado: sempre esconder
        if (currentScrollY >= 50 || isNearFooter) {
          this.navbarClass = 'navbar scrolling hidden';
        } else {
          this.navbarClass = 'navbar hidden';
        }
      }
    } else {
      // Desktop: transparência em toda a landing page
      if (currentScrollY < 50) {
        this.navbarClass = 'navbar visible' + (useTransparentStyle ? ' over-hero' : '');
      } else {
        if (scrollingDown) {
          this.navbarClass = 'navbar scrolling hidden';
        } else {
          this.navbarClass = 'navbar scrolling visible' + (useTransparentStyle ? ' over-hero' : '');
        }
      }
    }

    this.updateFloatingToggler(currentScrollY);
    
    this.lastScrollY = currentScrollY;
  }
}
