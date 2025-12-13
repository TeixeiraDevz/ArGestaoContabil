import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-cta',
  imports: [CommonModule],
  templateUrl: './footer-cta.html',
  styles: [`
    .footer-cta-shell {
      position: relative;
      padding: 0;
      /* Overlap (faixa branca atrás do CTA) */
      margin-top: calc(-1 * var(--cta-overlap));
      z-index: 1;
      height: 1px;
    }

    /* Faixa branca atrás da parte do CTA que fica "para fora" (evita pegar o fundo cinza da seção anterior) */
    .footer-cta-shell::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: var(--cta-overlap);
      background: #ffffff;
      z-index: 0;
      pointer-events: none;
    }
  `]
})
export class FooterCta {
  @Input({ required: true }) isHomePage = false;
}


