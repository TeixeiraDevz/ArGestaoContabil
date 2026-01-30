import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlanosService } from '../../services/planos.service';
import { Plano } from '../../../../../core/models/plano.model';
import { PlanoStaircaseComponent } from '../../components/plano-staircase/plano-staircase';
import { LoadingComponent } from '../../../../../shared/components/loading/loading';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [RouterLink, CommonModule, PlanoStaircaseComponent, LoadingComponent],
  templateUrl: './planos.html',
  styles: [`
    :host {
      display: block;
      background: transparent;
    }

    .planos-hero {
      padding: 7rem 0 5rem;
      background: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      width: 100%;
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
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

    .hero-badge {
      font-size: 0.9rem;
      font-weight: 600;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1.5rem;
      text-align: center;
      width: 100%;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-main-text {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.3;
      max-width: 900px;
      margin: 0 auto;
      letter-spacing: -0.02em;
      text-align: center;
      display: block;
      width: 100%;
    }

    .hero-main-text span {
      display: inline;
      text-align: center;
    }

    .hero-main-text .text-blue {
      color: #333366;
    }

    .hero-main-text .text-white {
      color:rgb(95, 151, 235);
    }

    .comparison-section {
      padding: 5rem 0;
      background: rgba(227, 242, 253, 0.7);
      border-radius: 32px;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-black);
      text-align: center;
      margin-bottom: 3rem;
    }

    .plano-detalhes-section {
      padding: 5rem 0;
      background: linear-gradient(180deg, #ffffff 0%, rgba(102, 126, 234, 0.05) 100%);
    }

    .plano-detalhes-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-black);
      text-align: center;
      margin-bottom: 3rem;
    }

    .plano-tabela-wrapper {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      margin-bottom: 4rem;
    }

    .plano-detalhes-table {
      width: 100%;
      border-collapse: collapse;
    }

    .plano-detalhes-table thead {
      background: linear-gradient(140deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    }

    .plano-detalhes-table th {
      padding: 1.5rem;
      text-align: left;
      font-weight: 700;
      color: var(--color-black);
      font-size: 1.1rem;
      border-bottom: 2px solid rgba(102, 126, 234, 0.2);
    }

    .plano-detalhes-table th:first-child {
      width: 40%;
      padding-left: 2rem;
    }

    .plano-detalhes-table th:last-child {
      text-align: center;
      padding-right: 2rem;
    }

    .plano-detalhes-table td {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      color: var(--color-gray-dark, #495057);
    }

    .plano-detalhes-table td:first-child {
      padding-left: 2rem;
      font-weight: 500;
      color: var(--color-black, #212529);
    }

    .plano-detalhes-table td:last-child {
      text-align: center;
      padding-right: 2rem;
    }

    .plano-detalhes-table tbody tr:hover {
      background: rgba(102, 126, 234, 0.03);
    }

    .plano-detalhes-table tbody tr:last-child td {
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

    .diferenciais-section {
      width: 100%;
      background: var(--color-white);
      padding: 4rem 0;
      margin: 0;
      position: relative;
      overflow: hidden;
    }

    .diferenciais-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .diferenciais-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .diferenciais-header-content {
      flex: 1;
    }

    .diferenciais-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-black);
      text-align: left;
      margin-bottom: 1rem;
    }

    .diferenciais-description {
      font-size: 1.1rem;
      color: var(--color-gray-dark);
      line-height: 1.6;
      margin: 0;
    }

    .diferenciais-header-buttons {
      display: flex;
      gap: 1rem;
      flex-shrink: 0;
    }

    .btn-plano-nav-header {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(140deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .btn-plano-nav-header:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .btn-plano-nav-header-secondary {
      padding: 0.75rem 1.5rem;
      background: var(--color-black);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .btn-plano-nav-header-secondary:hover {
      background: #000000;
      transform: translateY(-2px);
    }

    .diferenciais-divider {
      width: 100%;
      height: 1px;
      background: rgba(0, 0, 0, 0.1);
      margin: 2rem 0;
    }

    .diferenciais-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .diferencial-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0;
      background: transparent;
      border-radius: 0;
      box-shadow: none;
    }

    .diferencial-icon-wrapper {
      margin-bottom: 0.5rem;
    }

    .diferencial-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      background: rgba(102, 126, 234, 0.1);
      color: var(--color-purple);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(102, 126, 234, 0.2);
      flex-shrink: 0;
    }

    .diferencial-icon svg {
      width: 28px;
      height: 28px;
    }

    .diferencial-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .diferencial-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-black);
      margin: 0;
    }

    .diferencial-text {
      margin: 0;
      color: var(--color-gray-dark);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .diferenciais-cta {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
    }

    .btn-plano-cta {
      padding: 1rem 2.5rem;
      background: linear-gradient(140deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .btn-plano-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }


    @media (max-width: 991px) {
      .hero-main-text {
        font-size: 1.75rem;
      }
    }

    @media (max-width: 768px) {
      .planos-hero {
        padding: 5.5rem 0 3.5rem;
      }

      .hero-main-text {
        font-size: 1.5rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .plano-detalhes-title {
        font-size: 2rem;
      }

      .diferenciais-section {
        padding: 3rem 0;
      }

      .diferenciais-container {
        padding: 0 1.5rem;
      }

      .diferenciais-header {
        flex-direction: column;
        gap: 1.5rem;
      }

      .diferenciais-title {
        font-size: 2rem;
      }

      .diferenciais-description {
        font-size: 1rem;
      }

      .diferenciais-header-buttons {
        flex-direction: column;
        width: 100%;
      }

      .btn-plano-nav-header,
      .btn-plano-nav-header-secondary {
        width: 100%;
      }

      .diferenciais-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .plano-detalhes-table {
        font-size: 0.9rem;
      }

      .plano-detalhes-table th,
      .plano-detalhes-table td {
        padding: 0.75rem 0.5rem;
      }

      .plano-detalhes-table th:first-child,
      .plano-detalhes-table td:first-child {
        padding-left: 1rem;
      }
    }
  `]
})
export class Planos implements OnInit {
  planos: Plano[] = [];
  loading = false;
  error: string | null = null;
  planoSelecionado: string | null = null;

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

  selecionarPlano(plano: Plano): void {
    this.planoSelecionado = plano.id;
    this.scrollParaPlano(plano.id);
  }

  scrollParaPlano(planoId: string): void {
    setTimeout(() => {
      const elemento = document.getElementById(`plano-${planoId}`);
      if (elemento) {
        const headerOffset = 100;
        const elementPosition = elemento.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  navegarParaPlano(planoNome: string): void {
    const plano = this.planos.find(p => p.nome === planoNome);
    if (plano) {
      this.selecionarPlano(plano);
    }
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
        imagemUrl: '/imagem-planobásico.png',
        recursosPrincipais: [
          'Portal do Cliente on-line (24 horas disponível)',
          'Atendimento com especialistas em seu segmento',
          'Suporte via WhatsApp, e-mail e telefone',
          'Folha de pagamento e encargos',
          'Apuração das obrigações fiscais',
          'Contabilidade e relatórios gerenciais'
        ],
        diferenciais: [
          'Comunicação rápida e sem burocracia',
          'Foco total em simplicidade e autonomia',
          'Especialização em empresas em crescimento'
        ],
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
        imagemUrl: '/imagem-planointermediário.png',
        recursosPrincipais: [
          'Portal do Cliente on-line (24 horas disponível)',
          'Atendimento com especialistas em seu segmento',
          'Suporte via WhatsApp, e-mail e telefone',
          'Folha de pagamento e encargos',
          'Apuração das obrigações fiscais',
          'Contabilidade e relatórios gerenciais',
          'Atendimento consultivo',
          'Fechamentos no seu ERP',
          'Certificado Digital'
        ],
        diferenciais: [
          'Comunicação rápida e sem burocracia',
          'Foco total em simplicidade e autonomia',
          'Especialização em empresas em crescimento'
        ],
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
        nome: 'Enterprise',
        publicoIdeal: 'Médias e grandes empresas',
        regimesAtendidos: ['Lucro Presumido', 'Lucro Real'],
        faturamentoMedioMensal: 'Acima de R$ 400.000,00',
        atividadeEmpresa: ['Comércio', 'Serviço', 'Indústria'],
        canaisAtendimento: ['WhatsApp', 'E-mail', 'Telefone', 'Portal do cliente', 'Atendimento personalizado'],
        relatoriosGerenciais: 'Personalizados com dashboards (BI)',
        imagemUrl: '/imagem-planointerprise.png',
        recursosPrincipais: [
          'Portal do Cliente on-line (24 horas disponível)',
          'Atendimento com especialistas em seu segmento',
          'Suporte via WhatsApp, e-mail e telefone',
          'Folha de pagamento e encargos',
          'Apuração das obrigações fiscais',
          'Contabilidade e relatórios gerenciais',
          'Abertura de empresa e serviços societários',
          'Certificado Digital',
          'Emissão de NFs-e',
          'Parcelamento e simulação'
        ],
        diferenciais: [
          'Comunicação rápida e sem burocracia',
          'Foco total em simplicidade e autonomia',
          'Especialização em empresas em crescimento'
        ],
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
