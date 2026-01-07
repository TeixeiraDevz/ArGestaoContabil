import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plano } from '../../../../../core/models/plano.model';

@Component({
  selector: 'app-plano-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plano-table.html',
  styles: [`
    .comparison-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background: var(--color-white, #ffffff);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .comparison-table thead {
      background: linear-gradient(140deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    }

    .comparison-table th {
      padding: 1.5rem 1rem;
      text-align: left;
      font-weight: 700;
      color: var(--color-black, #212529);
      font-size: 1.1rem;
      border-bottom: 2px solid rgba(102, 126, 234, 0.2);
    }

    .comparison-table th:first-child {
      width: 30%;
      padding-left: 2rem;
    }

    .comparison-table th:not(:first-child) {
      text-align: center;
      width: 23.33%;
      background: rgba(102, 126, 234, 0.05);
      position: relative;
    }

    .comparison-table th.highlighted {
      background: linear-gradient(140deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
      border: 2px solid rgba(102, 126, 234, 0.3);
    }

    .comparison-table th.highlighted::after {
      content: 'Mais Popular';
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--color-purple, #667eea);
      background: rgba(102, 126, 234, 0.15);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }

    .comparison-table td {
      padding: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      color: var(--color-gray-dark, #495057);
    }

    .comparison-table td:first-child {
      padding-left: 2rem;
      font-weight: 500;
      color: var(--color-black, #212529);
    }

    .comparison-table td:not(:first-child) {
      text-align: center;
    }

    .comparison-table tbody tr:hover {
      background: rgba(102, 126, 234, 0.03);
    }

    .comparison-table tbody tr:last-child td {
      border-bottom: none;
    }

    .check-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(40, 167, 69, 0.15);
      color: #28a745;
      font-weight: 700;
      font-size: 0.9rem;
    }

    .cross-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(220, 53, 69, 0.15);
      color: #dc3545;
      font-weight: 700;
      font-size: 0.9rem;
    }

    .resource-value {
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .resource-list {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: left;
    }

    .resource-list li {
      padding: 0.25rem 0;
      font-size: 0.9rem;
    }

    @media (max-width: 991px) {
      .comparison-table {
        font-size: 0.9rem;
      }

      .comparison-table th,
      .comparison-table td {
        padding: 0.75rem 0.5rem;
      }

      .comparison-table th:first-child,
      .comparison-table td:first-child {
        padding-left: 1rem;
      }

      .comparison-table th.highlighted::after {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .comparison-table {
        display: block;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      .comparison-table th:first-child {
        position: sticky;
        left: 0;
        background: var(--color-white, #ffffff);
        z-index: 10;
      }

      .comparison-table td:first-child {
        position: sticky;
        left: 0;
        background: var(--color-white, #ffffff);
        z-index: 5;
      }
    }
  `]
})
export class PlanoTableComponent {
  @Input() planos: Plano[] = [];

  getRecursoValue(plano: Plano, recursoNome: string): any {
    const recurso = plano.recursos.find(r => r.nome === recursoNome);
    return recurso ? recurso.incluido : false;
  }

  getRecursoCustomValue(plano: Plano, campo: string): string {
    switch (campo) {
      case 'publicoIdeal':
        return plano.publicoIdeal;
      case 'regimesAtendidos':
        return plano.regimesAtendidos.join(', ');
      case 'faturamentoMedioMensal':
        return plano.faturamentoMedioMensal;
      case 'atividadeEmpresa':
        return plano.atividadeEmpresa.join(', ');
      case 'canaisAtendimento':
        return plano.canaisAtendimento.join(', ');
      case 'relatoriosGerenciais':
        return plano.relatoriosGerenciais;
      default:
        return '';
    }
  }

  getRecursosUnicos(): string[] {
    const recursosSet = new Set<string>();
    this.planos.forEach(plano => {
      plano.recursos.forEach(recurso => {
        recursosSet.add(recurso.nome);
      });
    });
    return Array.from(recursosSet).sort();
  }
}

