import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardTiltDirective } from '../../../../../shared/directives/card-tilt.directive';

interface RecursoItem {
  titulo: string;
  descricao: string;
  icone: string;
}

interface FuncItem {
  titulo: string;
  descricao: string;
  icone: string;
}

interface PlanoExibicao {
  nome: string;
  descricao: string;
  valor: number;
  beneficios: string[];
  destaque: boolean;
}

interface SegmentoAtendido {
  titulo: string;
  icone: string;
  clientes: string[];
}

@Component({
  selector: 'app-home',
  imports: [CardTiltDirective],
  templateUrl: './home.html',
  styles: [`
    .landing-page { background: var(--site-bg); min-height: 100vh; color: #e2e8f0; }
    .landing-hero { position: relative; min-height: 85vh; display: flex; align-items: center; padding: 120px 0 140px; overflow: hidden; }
    .landing-hero-bg {
      position: absolute; inset: 0; z-index: 0;
      background: #0ea5e9;
    }
    .landing-hero-pattern {
      position: absolute; inset: 0; z-index: 0; opacity: 0.12; pointer-events: none;
      background-image:
        linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px);
      background-size: 48px 48px;
    }
    .landing-hero-pattern::before {
      content: ''; position: absolute; right: 5%; top: 15%; width: 35%; height: 50%;
      background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.05) 60%, transparent 100%);
      clip-path: polygon(0 100%, 10% 60%, 20% 80%, 30% 40%, 40% 70%, 50% 30%, 60% 90%, 70% 50%, 80% 75%, 90% 45%, 100% 100%);
    }
    .landing-hero-pattern::after {
      content: ''; position: absolute; right: 8%; top: 25%; width: 28%; height: 45%;
      border: 1px solid rgba(255,255,255,0.2); border-radius: 8px;
      box-shadow: inset 0 0 40px rgba(255,255,255,0.05);
    }
    .landing-hero-wave {
      position: absolute; bottom: 0; left: 0; right: 0; z-index: 1; line-height: 0; pointer-events: none;
    }
    .landing-hero-wave-svg { width: 100%; height: 80px; display: block; }
    .landing-hero .container { position: relative; z-index: 2; }
    .landing-hero-content { max-width: 720px; text-align: center; }
    .landing-hero-tagline {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
      color: rgba(255, 255, 255, 0.9); font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;
      text-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .landing-hero-tagline-icon { display: inline-flex; transform: rotate(40deg); color: #fcd34d; }
    .landing-hero-title {
      font-size: clamp(2.25rem, 6vw, 4rem); font-weight: 800; line-height: 1.15; margin-bottom: 1.5rem; color: #fff;
      text-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .landing-hero-title-accent { color: #fcd34d; text-shadow: 0 1px 4px rgba(0,0,0,0.3); }
    .landing-hero-desc {
      color: rgba(255, 255, 255, 0.9); font-size: 1.25rem; line-height: 1.65; margin-bottom: 2rem; max-width: 48rem;
      margin-left: auto; margin-right: auto; text-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
    .landing-hero-buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-bottom: 3rem; }
    .btn-landing {
      display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.875rem 2rem; border-radius: 0.5rem; font-weight: 700; font-size: 1.125rem; text-decoration: none; transition: all 0.3s ease;
    }
    .btn-landing-primary { background: #22c55e; color: #fff; border: none; box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4); }
    .btn-landing-primary:hover { background: #16a34a; color: #fff; transform: scale(1.05); box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4); }
    .btn-landing-outline {
      background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #fff; border: 2px solid rgba(255, 255, 255, 0.4);
    }
    .btn-landing-outline:hover { background: rgba(255, 255, 255, 0.3); color: #fff; }
    .landing-hero-pills {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-top: 0;
    }
    .landing-hero-pill {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      color: #fff; font-size: 0.9375rem; font-weight: 500;
      padding: 0.5rem 1rem; border-radius: 50px; border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .landing-hero-pill svg { flex-shrink: 0; color: #fcd34d; }
    .landing-section { padding: 4.5rem 0; }
    .landing-section-cards { position: relative; }
    .landing-section-decor {
      position: absolute; top: 0; right: 0; width: 6rem; height: 6rem; pointer-events: none; z-index: 0;
      background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); opacity: 0.1; border-radius: 0 0 0 100%;
    }
    .landing-section-cards .container { position: relative; z-index: 1; }
    .landing-section-title { font-size: clamp(1.75rem, 4vw, 2.25rem); font-weight: 700; text-align: center; margin-bottom: 0.75rem; color: #fff; }
    .landing-section-title-accent { color: #60a5fa; }
    .landing-section-subtitle { text-align: center; color: #94a3b8; font-size: 1rem; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.6; }
    .landing-clientes-header { text-align: center; }
    .landing-segmentos-pill {
      display: inline-block; margin-bottom: 0.75rem; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em;
      color: #60a5fa; background: rgba(96, 165, 250, 0.15); padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase;
    }
    .landing-planos-subtitle { color: #9ca3af; font-size: 1.25rem; max-width: 42rem; margin-bottom: 2.5rem; }
    .landing-cards-grid { display: grid; gap: 1.5rem; perspective: 1000px; }
    .landing-cards-4 { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
    .landing-cards-6 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .landing-cards-clientes { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
    .landing-cards-segmentos { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .landing-segmento-lista { list-style: none; padding: 0; margin: 0; margin-top: 1rem; }
    .landing-segmento-lista li { color: #94a3b8; font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.35rem; padding-left: 1rem; position: relative; }
    .landing-segmento-lista li::before { content: '–'; position: absolute; left: 0; color: #60a5fa; }
    .landing-card {
      background: rgba(31, 41, 59, 0.4); border: 1px solid rgba(55, 65, 81, 0.5); border-radius: 1rem; padding: 1.75rem;
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      transition: box-shadow 0.3s ease, border-color 0.3s ease;
      cursor: default;
    }
    .landing-card:hover {
      box-shadow: 0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(59, 130, 246, 0.3); border-color: rgba(59, 130, 246, 0.3);
    }
    .landing-card:hover .landing-card-icon {
      transform: scale(1.08);
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
    }
    .landing-card-icon {
      width: 52px; height: 52px; border-radius: 12px; background: rgba(56, 189, 248, 0.2); color: #38bdf8;
      display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .landing-card-logo { overflow: hidden; padding: 4px; }
    .landing-card-logo img { width: 100%; height: 100%; object-fit: contain; }
    .landing-card-inicial { font-size: 1.25rem; font-weight: 700; color: #38bdf8; }
    .landing-card-title { font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
    .landing-card-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.55; margin: 0; }
    .landing-loading { text-align: center; padding: 3rem; }
    .landing-planos-toggle-wrap {
      display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 3rem; flex-wrap: wrap;
    }
    .landing-planos-toggle-label {
      font-size: 1.125rem; font-weight: 500; color: #9ca3af; transition: color 0.2s;
    }
    .landing-planos-toggle-label.active { color: #fff; }
    .landing-planos-toggle-right { display: flex; align-items: center; gap: 0.5rem; }
    .landing-planos-switch {
      position: relative; width: 4rem; height: 2rem; border-radius: 9999px; background: #374151; border: none; cursor: pointer; padding: 0.25rem; transition: background 0.2s;
      outline: none;
    }
    .landing-planos-switch:hover { background: #4b5563; }
    .landing-planos-switch:focus-visible { box-shadow: 0 0 0 2px #0f172a, 0 0 0 4px #3b82f6; }
    .landing-planos-switch-thumb {
      display: block; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: #3b82f6; box-shadow: 0 4px 6px rgba(0,0,0,0.2); transition: transform 0.2s;
    }
    .landing-planos-switch-thumb.annual { transform: translateX(32px); }
    .landing-toggle-badge {
      background: rgba(34, 197, 94, 0.2); color: #4ade80; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 9999px; border: 1px solid rgba(34, 197, 94, 0.3);
    }
    .landing-planos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: stretch; max-width: 80rem; margin: 0 auto; perspective: 1000px; }
    .landing-planos-grid .landing-plano-card.featured { margin-top: -1rem; margin-bottom: 1rem; }
    .landing-plano-card {
      background: rgba(31, 41, 59, 0.4); border: 1px solid rgba(55, 65, 81, 0.5); border-radius: 1rem; padding: 2rem; position: relative; display: flex; flex-direction: column;
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      transition: box-shadow 0.3s ease, border-color 0.3s ease; cursor: default;
    }
    .landing-plano-card:hover { border-color: rgba(59, 130, 246, 0.3); box-shadow: 0 24px 48px rgba(0,0,0,0.25); }
    .landing-plano-card.featured {
      background: rgba(31, 41, 59, 0.8); border-color: #3b82f6; box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
    }
    .landing-plano-card.featured:hover { box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.35); }
    .landing-plano-badge {
      position: absolute; top: -1rem; left: 50%; transform: translateX(-50%);
      background: linear-gradient(90deg, #2563eb 0%, #06b6d4 100%); color: #fff; font-size: 0.875rem; font-weight: 700; padding: 0.25rem 1rem; border-radius: 9999px; box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    .landing-plano-nome { font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
    .landing-plano-desc { color: #9ca3af; font-size: 0.875rem; margin-bottom: 1.5rem; line-height: 1.5; min-height: 2.5rem; }
    .landing-plano-preco { margin-bottom: 1.5rem; }
    .landing-plano-valor { font-size: 2.25rem; font-weight: 800; color: #fff; }
    .landing-plano-mes { color: #9ca3af; font-size: 1rem; font-weight: 400; }
    .landing-plano-lista { list-style: none; padding: 0; margin: 0 0 1.5rem; flex-grow: 1; }
    .landing-plano-lista li { display: flex; align-items: flex-start; gap: 0.75rem; color: #d1d5db; font-size: 0.875rem; line-height: 1.4; margin-bottom: 1rem; }
    .landing-plano-lista li svg { flex-shrink: 0; color: #6b7280; margin-top: 0.15rem; }
    .landing-plano-lista li.featured-check svg { color: #60a5fa; }
    .btn-landing-plano {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 1rem 1.5rem;
      border-radius: 0.75rem; background: rgba(255, 255, 255, 0.1); color: #fff; font-weight: 600; font-size: 1.125rem; text-decoration: none; border: none; cursor: pointer; transition: all 0.3s;
    }
    .btn-landing-plano:hover { background: rgba(255, 255, 255, 0.2); color: #fff; }
    .btn-landing-plano-featured {
      background: linear-gradient(90deg, #2563eb 0%, #06b6d4 100%); color: #fff; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
    }
    .btn-landing-plano-featured:hover { box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5); filter: brightness(1.05); }
    @media (max-width: 768px) {
      .landing-hero { padding-top: 100px; padding-bottom: 60px; }
      .landing-hero-buttons { flex-direction: column; }
      .landing-section { padding: 3rem 0; }
    }
  `]
})
export class Home implements OnInit {
  planoAnual = false;

  recursosPoderosos: RecursoItem[] = [
    { titulo: 'Gestão de Clientes', descricao: 'Organize e gerencie todos os seus clientes em um só lugar. Acesse informações rapidamente e mantenha um relacionamento próximo.', icone: 'clientes' },
    { titulo: 'Análise de Dados em Tempo Real', descricao: 'Visualize métricas e indicadores importantes instantaneamente. Tome decisões informadas com dados atualizados em tempo real.', icone: 'analise' },
    { titulo: 'Relatórios Automáticos', descricao: 'Gere relatórios detalhados automaticamente. Economize tempo e mantenha a conformidade com facilidade.', icone: 'relatorios' },
    { titulo: 'Integração Fácil', descricao: 'Conecte-se facilmente com suas ferramentas favoritas. Nossa plataforma se adapta ao seu fluxo de trabalho existente.', icone: 'integracao' }
  ];

  funcionalidadesCompletas: FuncItem[] = [
    { titulo: 'Gestão de Clientes', descricao: 'Organize e gerencie todos os seus clientes em um painel centralizado. Acompanhe histórico, documentos e comunicações.', icone: 'clientes' },
    { titulo: 'Análise Financeira', descricao: 'Visualize fluxo de caixa, receitas e despesas em gráficos interativos. Identifique tendências e oportunidades.', icone: 'grafico' },
    { titulo: 'Relatórios Personalizados', descricao: 'Crie relatórios customizados com os dados que você precisa. Exporte em diversos formatos com um clique.', icone: 'doc' },
    { titulo: 'Rastreamento de Despesas', descricao: 'Registre e categorize todas as despesas automaticamente. Mantenha o controle total dos seus gastos.', icone: 'despesa' },
    { titulo: 'Gerador de Orçamentos', descricao: 'Crie orçamentos profissionais rapidamente. Personalize modelos e envie diretamente aos clientes.', icone: 'calc' },
    { titulo: 'Mensagens In-App', descricao: 'Comunique-se diretamente com clientes através da plataforma. Mantenha tudo organizado e documentado.', icone: 'msg' }
  ];

  segmentosAtendidos: SegmentoAtendido[] = [
    {
      titulo: 'Construção Civil e Materiais',
      icone: 'construcao',
      clientes: ['Construtora Savassi Ltda', 'Barbosa Material de Construção', 'FMS Comércio de Material de Construção']
    },
    {
      titulo: 'Transporte e Logística',
      icone: 'transporte',
      clientes: [
        'Winlog Logística e Transportes Eireli -EPP',
        'WW Transporte e Agenciamento de Cargas Ltda -EPP',
        'JG Logística e Construções',
        'ILS Integrad Logistic Solutions Ltda',
        'Nortesul Logística',
        'Trans Pantanal Ltda',
        'Transbrito Transportes de Cargas Ltda',
        'LLS Transporte e Agenciamento de Cargas Ltda-ME'
      ]
    },
    {
      titulo: 'Indústria e Embalagens',
      icone: 'industria',
      clientes: ['Arteprintbox Indústria e Comércio de Embalagens Ltda', 'Paperbox Indústria de Embalagens Ltda', 'Pencom do Brasil']
    },
    {
      titulo: 'Tecnologia e Comunicação',
      icone: 'tecnologia',
      clientes: ['AM02 Impacto Infovias SPE Ltda', 'Impacto Infovias Ltda', 'Ambient Office', 'Cohen Comunicação']
    },
    {
      titulo: 'Serviços Profissionais e Saúde',
      icone: 'saude',
      clientes: ['Coelho, Chamy Dib & Ribeiro - Advogados Associados', 'Julita N. Câmara de Castro Neuropsicóloga', 'Belíssimas Lentes', 'Ambient Clear', 'Edson Damasceno']
    },
    {
      titulo: 'Despacho Aduaneiro',
      icone: 'despacho',
      clientes: ['IEX Comissaria de Despachos e Assessoria Aduaneira']
    }
  ];

  get planosExibicao(): PlanoExibicao[] {
    const anual = this.planoAnual;
    return [
      {
        nome: 'Básico',
        descricao: 'Ideal para MEI e pequenos negócios que estão começando.',
        valor: anual ? 78 : 97,
        beneficios: [
          'Portal do Cliente on-line (24 horas disponível)',
          'Atendimento com especialistas em seu segmento',
          'Suporte via WhatsApp, e-mail e telefone',
          'Folha de pagamento e encargos',
          'Apuração das obrigações fiscais',
          'Contabilidade e relatórios gerenciais'
        ],
        destaque: false
      },
      {
        nome: 'Intermediário',
        descricao: 'Perfeito para empresas em crescimento que precisam de mais recursos.',
        valor: anual ? 158 : 197,
        beneficios: [
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
        destaque: true
      },
      {
        nome: 'Enterprise',
        descricao: 'Solução completa para grandes escritórios e empresas consolidadas.',
        valor: anual ? 318 : 397,
        beneficios: [
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
        destaque: false
      }
    ];
  }

  constructor() {}

  ngOnInit(): void {
    if (typeof document !== 'undefined') document.body.classList.add('page-landing');
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') document.body.classList.remove('page-landing');
  }
}
