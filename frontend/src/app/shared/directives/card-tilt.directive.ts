import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

/**
 * Diretiva que aplica efeito de inclinação 3D (tilt) nos cards ao mover o mouse.
 * Uso: <div class="landing-card" appCardTilt>
 */
@Directive({
  selector: '[appCardTilt]',
  standalone: true
})
export class CardTiltDirective {
  private readonly maxTilt = 8;
  private readonly transition = 'transform 0.15s ease-out';

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
    this.renderer.setStyle(this.el.nativeElement, 'transition', this.transition);
    this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform');
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transition', this.transition);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;
    const rotateY = percentX * this.maxTilt;
    const rotateX = -percentY * this.maxTilt;
    const transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
  }
}
