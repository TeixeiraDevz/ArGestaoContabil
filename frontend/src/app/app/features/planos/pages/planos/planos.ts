import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlanosService } from '../../services/planos.service';
import { Plano } from '../../../../../core/models/plano.model';
import { PlanoTableComponent } from '../../components/plano-table/plano-table';
import { LoadingComponent } from '../../../../../shared/components/loading/loading';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [RouterLink, CommonModule, PlanoTableComponent, LoadingComponent],
  templateUrl: './planos.html',
  styles: [`
    :host {
      display: block;
      background: var(--color-gray-light);
    }

    .planos-hero {
      padding: 7rem 0 4rem;
      background: linear-gradient(140deg, rgba(102, 126, 234, 0.18) 0%, rgba(118, 75, 162, 0.18) 100%);
      position: relative;
      overflow: hidden;
    }

    .planos-hero::before,
    .planos-hero::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.35;
      pointer-events: none;
    }

    .planos-hero::before {
      width: 360px;
      height: 360px;
      background: rgba(102, 126, 234, 0.6);
      top: -120px;
      left: -80px;
    }

    .planos-hero::after {
      width: 420px;
      height: 420px;
      background: rgba(118, 75, 162, 0.5);
      bottom: -160px;
      right: -120px;
    }

    .badge-soft {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.1rem;
      border-radius: 999px;
      background: rgba(102, 126, 234, 0.15);
      color: var(--color-purple);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--color-black);
      margin-bottom: 1.25rem;
      letter-spacing: -0.025em;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      color: var(--color-gray);
      line-height: 1.75;
      max-width: 750px;
      margin: 0 auto 2.5rem;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-actions .btn {
      min-width: 200px;
      padding: 0.95rem 2.5rem;
      border-radius: 14px;
      font-weight: 600;
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    }

    .hero-actions .btn-primary {
      background: var(--gradient-primary);
      color: white;
      border: none;
      box-shadow: 0 22px 40px rgba(102, 126, 234, 0.28);
    }

    .hero-actions .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 26px 48px rgba(118, 75, 162, 0.35);
    }

    .hero-actions .btn-outline {
      background: rgba(255, 255, 255, 0.85);
      color: var(--color-purple);
      border: 1.5px solid rgba(102, 126, 234, 0.3);
    }

    .hero-actions .btn-outline:hover {
      transform: translateY(-3px);
      box-shadow: 0 22px 40px rgba(102, 126, 234, 0.18);
    }

    .comparison-section {
      padding: 5rem 0;
      background: var(--color-white);
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-black);
      text-align: center;
      margin-bottom: 1rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: var(--color-gray);
      text-align: center;
      max-width: 700px;
      margin: 0 auto 3rem;
      line-height: 1.7;
    }

    @media (max-width: 991px) {
      .hero-title {
        font-size: 2.4rem;
      }
    }

    @media (max-width: 768px) {
      .planos-hero {
        padding: 5.5rem 0 3.5rem;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1.05rem;
      }

      .section-title {
        font-size: 2rem;
      }
    }

    @media (max-width: 576px) {
      .hero-actions .btn {
        width: 100%;
      }
    }
  `]
})
export class Planos implements OnInit {
  planos: Plano[] = [];
  loading = false;
  error: string | null = null;

  constructor(private planosService: PlanosService) {}

  ngOnInit(): void {
    this.carregarPlanos();
  }

  carregarPlanos(): void {
    this.loading = true;
    this.error = null;

    this.planosService.listarPlanos().subscribe({
      next: (planos) => {
        // Se não houver planos do backend, usar dados mockados
        if (planos.length === 0) {
          this.planos = this.getPlanosMockados();
        } else {
          this.planos = planos;
        }
        this.loading = false;
      },
      error: (err) => {
        // Em caso de erro, usar dados mockados
        console.warn('Erro ao carregar planos do backend, usando dados mockados:', err);
        this.planos = this.getPlanosMockados();
        this.loading = false;
      }
    });
  }

  private getPlanosMockados(): Plano[] {
    return [
      {
        id: '1',
        nome: 'Básico',
        publicoIdeal: 'Micro e Pequenas Empresas (ME/EPP)',
        regimesAtendidos: ['Simples Nacional', 'Lucro Presumido'],
        faturamentoMedioMensal: 'Até R$ 100.000,00',
        atividadeEmpresa: ['Comércio', 'Serviço'],
        canaisAtendimento: ['WhatsApp', 'E-mail', 'Telefone'],
        relatoriosGerenciais: 'Padrão',
        recursos: [
          { nome: 'Abertura de empresa e serviços societários', incluido: false },
          { nome: 'Apuração fiscal, folha de pagamento e contabilidade', incluido: true },
          { nome: 'Atendimento com especialistas', incluido: false },
          { nome: 'Suporte a auditorias e processos de M&A', incluido: false },
          { nome: 'Atendimento consultivo', incluido: false },
          { nome: 'Fechamentos no seu ERP', incluido: false },
          { nome: 'Certificado Digital para empresa e sócio adm.', incluido: false },
          { nome: 'Recalculo de guia', incluido: false },
          { nome: 'Parcelamento', incluido: false },
          { nome: 'Simulação de parcelamento', incluido: false },
          { nome: 'Reunião trimestral para apresentação de índices', incluido: false },
          { nome: 'Agenda Tributária mensal', incluido: true },
          { nome: 'Emissão de NFs-e', incluido: false },
          { nome: 'Sistema Financeiro', incluido: true }
        ]
      },
      {
        id: '2',
        nome: 'Intermediário',
        publicoIdeal: 'Empresas em crescimento',
        regimesAtendidos: ['Simples Nacional', 'Lucro Presumido', 'Lucro Real'],
        faturamentoMedioMensal: 'Acima de R$ 100.000,00',
        atividadeEmpresa: ['Comércio', 'Serviço', 'Indústria'],
        canaisAtendimento: ['WhatsApp', 'E-mail', 'Telefone', 'Portal do cliente'],
        relatoriosGerenciais: 'Personalizados com dashboards (BI)',
        recursos: [
          { nome: 'Abertura de empresa e serviços societários', incluido: false },
          { nome: 'Apuração fiscal, folha de pagamento e contabilidade', incluido: true },
          { nome: 'Atendimento com especialistas', incluido: true },
          { nome: 'Suporte a auditorias e processos de M&A', incluido: false },
          { nome: 'Atendimento consultivo', incluido: true },
          { nome: 'Fechamentos no seu ERP', incluido: true },
          { nome: 'Certificado Digital para empresa e sócio adm.', incluido: true },
          { nome: 'Recalculo de guia', incluido: false },
          { nome: 'Parcelamento', incluido: false },
          { nome: 'Simulação de parcelamento', incluido: false },
          { nome: 'Reunião trimestral para apresentação de índices', incluido: true },
          { nome: 'Agenda Tributária mensal', incluido: true },
          { nome: 'Emissão de NFs-e', incluido: false },
          { nome: 'Sistema Financeiro', incluido: true }
        ]
      },
      {
        id: '3',
        nome: 'Personalizado',
        publicoIdeal: 'Médias e grandes empresas',
        regimesAtendidos: ['Lucro Presumido', 'Lucro Real'],
        faturamentoMedioMensal: 'Acima de R$ 400.000,00',
        atividadeEmpresa: ['Comércio', 'Serviço', 'Indústria'],
        canaisAtendimento: ['WhatsApp', 'E-mail', 'Telefone', 'Portal do cliente', 'Atendimento personalizado'],
        relatoriosGerenciais: 'Personalizados com dashboards (BI)',
        recursos: [
          { nome: 'Abertura de empresa e serviços societários', incluido: true },
          { nome: 'Apuração fiscal, folha de pagamento e contabilidade', incluido: true },
          { nome: 'Atendimento com especialistas', incluido: true },
          { nome: 'Suporte a auditorias e processos de M&A', incluido: true },
          { nome: 'Atendimento consultivo', incluido: true },
          { nome: 'Fechamentos no seu ERP', incluido: true },
          { nome: 'Certificado Digital para empresa e sócio adm.', incluido: true },
          { nome: 'Recalculo de guia', incluido: true },
          { nome: 'Parcelamento', incluido: true },
          { nome: 'Simulação de parcelamento', incluido: true },
          { nome: 'Reunião trimestral para apresentação de índices', incluido: true },
          { nome: 'Agenda Tributária mensal', incluido: true },
          { nome: 'Emissão de NFs-e', incluido: true },
          { nome: 'Sistema Financeiro', incluido: true }
        ]
      }
    ];
  }
}
