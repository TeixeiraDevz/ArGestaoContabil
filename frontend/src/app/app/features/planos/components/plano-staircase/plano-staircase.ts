import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plano } from '../../../../../core/models/plano.model';

@Component({
  selector: 'app-plano-staircase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plano-staircase.html',
  styles: [`
    .staircase-container {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      padding: 2rem 0;
    }

    .plano-card {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 0;
      background: transparent;
      border: none;
      box-shadow: none;
      border-radius: 0;
      transition: none;
    }

    .plano-card:hover {
      transform: none;
      box-shadow: none;
    }

    .plano-card.align-left {
      flex-direction: row;
    }

    .plano-card.align-right {
      flex-direction: row-reverse;
    }

    .plano-image {
      width: 470px;
      height: 310px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #667eea;
      font-weight: 600;
      flex-shrink: 0;
      border: none;
      overflow: hidden;
    }

    .plano-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }

    .plano-header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .plano-subtitle {
      font-size: 0.9rem;
      font-weight: 400;
      color: #6c757d;
      text-transform: none;
      letter-spacing: 0.05em;
    }

    .plano-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .plano-nome {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333366;
      margin: 0;
    }

    .plano-recursos {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .plano-recursos-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      color: #6c757d;
    }

    .plano-recursos-item .check-icon {
      color: #28a745;
      font-weight: 700;
    }

    .btn-saiba-mais {
      align-self: flex-start;
      padding: 0.75rem 2rem;
      background: linear-gradient(90deg, #0d1b2a, #1e40af);
      color: white;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      margin-top: 1rem;
    }

    .btn-saiba-mais:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(30, 64, 175, 0.3);
    }

    @media (max-width: 768px) {
      .plano-card {
        flex-direction: column !important;
        text-align: center;
      }

      .plano-image {
        width: 100%;
        height: auto;
        aspect-ratio: 470 / 310;
        min-height: 250px;
      }

      .plano-content {
        align-items: center;
      }

      .btn-saiba-mais {
        align-self: center;
      }
    }
  `]
})
export class PlanoStaircaseComponent {
  @Input() planos: Plano[] = [];
  @Output() planoSelecionado = new EventEmitter<Plano>();

  selecionarPlano(plano: Plano): void {
    this.planoSelecionado.emit(plano);
  }

  getRecursosPrincipais(plano: Plano): string[] {
    if (plano.recursosPrincipais && plano.recursosPrincipais.length > 0) {
      return plano.recursosPrincipais;
    }
    // Fallback: pegar primeiros 6 recursos incluídos
    return plano.recursos
      .filter(r => r.incluido)
      .slice(0, 6)
      .map(r => r.nome);
  }

  getAlinhamento(index: number): 'left' | 'right' {
    return index % 2 === 0 ? 'left' : 'right';
  }
}
