import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

export type ScrollRevealVariant = 'fadeUp' | 'slideLeft' | 'slideRight' | 'scale';

/**
 * Diretiva que revela o elemento com animação quando ele entra na viewport (scroll).
 * Uso: <section appScrollReveal> ou <div appScrollReveal [appScrollRevealVariant]="'slideLeft'" [appScrollRevealDelay]="100">
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private static readonly REVEALED_CLASS = 'scroll-revealed';
  private static readonly BASE_CLASS = 'scroll-reveal';
  private observer: IntersectionObserver | null = null;

  /** Variante da animação: fadeUp (padrão), slideLeft, slideRight, scale */
  @Input() appScrollRevealVariant: ScrollRevealVariant = 'fadeUp';

  /** Atraso em ms antes de iniciar a animação (útil para stagger em listas) */
  @Input() appScrollRevealDelay = 0;

  /** Margem em px para considerar "visível" antes do elemento entrar totalmente (ex: 50) */
  @Input() appScrollRevealRootMargin = '0px 0px -60px 0px';

  /** Threshold de interseção (0 a 1). Ex: 0.1 = 10% visível */
  @Input() appScrollRevealThreshold = 0.1;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;
    this.renderer.addClass(element, ScrollRevealDirective.BASE_CLASS);
    this.renderer.addClass(element, `scroll-reveal-${this.appScrollRevealVariant}`);

    if (typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.observer?.unobserve(entry.target);
            if (this.appScrollRevealDelay > 0) {
              setTimeout(() => this.reveal(), this.appScrollRevealDelay);
            } else {
              this.reveal();
            }
          }
        });
      },
      {
        rootMargin: this.appScrollRevealRootMargin,
        threshold: this.appScrollRevealThreshold,
      }
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  private reveal(): void {
    this.renderer.addClass(this.el.nativeElement, ScrollRevealDirective.REVEALED_CLASS);
  }
}
