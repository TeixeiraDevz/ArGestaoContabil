import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { PlanosService } from '../../../planos/services/planos.service';
import { Plano } from '../../../../../core/models/plano.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styles: [`
    :host {
      display: block;
      background: #ffffff;
      min-height: 100vh;
    }
    
    .hero-section {
      position: relative;
      background: #ffffff;
      min-height: 75vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 120px;
      padding-bottom: 80px;
    }
    
    @media (max-width: 768px) {
      .hero-section {
        min-height: 60vh;
        padding-top: 100px;
        padding-bottom: 60px;
      }
    }
    
    .hero-blur-shapes {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    }
    
    .blur-shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.15;
      animation: float 8s ease-in-out infinite;
    }
    
    .shape-1 {
      width: 400px;
      height: 400px;
      background: #667eea;
      top: -100px;
      left: -100px;
      animation-delay: 0s;
    }
    
    .shape-2 {
      width: 500px;
      height: 500px;
      background: #2563eb;
      top: 50%;
      right: -150px;
      transform: translateY(-50%);
      animation-delay: 2s;
    }
    
    .shape-3 {
      width: 350px;
      height: 350px;
      background: #764ba2;
      bottom: -100px;
      left: 20%;
      animation-delay: 4s;
    }
    
    .hero-section .container {
      position: relative;
      z-index: 2;
    }
    
    .services-section {
      margin-top: 5rem;
    }
    
    .hero-content {
      animation: fadeInUp 0.8s ease-out;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
    }
    
    .hero-subtitle {
      font-size: 1.15rem;
      color: #6c757d;
      line-height: 1.7;
      margin-bottom: 2.5rem;
      max-width: 480px;
    }
    
    .hero-illustration {
      animation: fadeInUp 0.8s ease-out;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    
    .hero-illustration svg {
      max-width: 100%;
      height: auto;
      filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.08));
    }
    
    @media (max-width: 991px) {
      .logo-text {
        font-size: 3rem;
      }
      
      .logo-subtitle {
        font-size: 1.25rem;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
    }
    
    @media (max-width: 780px) {
      .logo-text {
        font-size: 2.5rem;
      }
      
      .logo-subtitle {
        font-size: 1rem;
      }
      
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        width: 100%;
        gap: 1.25rem;
      }
      
      .hero-buttons .btn {
        width: 100%;
        max-width: 100%;
        min-width: auto;
      }
    }
    
    @media (max-width: 576px) {
      .logo-text {
        font-size: 2.5rem;
      }
      
      .logo-subtitle {
        font-size: 1rem;
      }
      
      .preview-header {
        flex-direction: column;
        gap: 0.75rem;
        align-items: flex-start;
      }
      
      .preview-nav {
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .preview-content {
        padding: 1.75rem 1.25rem 1.5rem;
      }

      .ceo-illustration {
        width: 220px;
        height: 190px;
      }

      .ceo {
        width: 120px;
        height: 190px;
        bottom: -10px;
      }

      .preview-dialog {
        padding: 1.25rem 1.1rem;
      }

      .preview-dialog-title {
        font-size: 1.15rem;
      }

      .preview-dialog-text {
        font-size: 0.9rem;
      }

      .preview-footer {
        margin-top: 1.75rem;
      }

      .preview-pill {
        padding: 0.5rem 1rem;
      }
    }
    
    .hero-buttons {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
    }
    
    .hero-buttons .btn {
      transition: all var(--transition-normal);
      min-width: 220px;
      padding: 0.875rem 2rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 1.05rem;
      box-shadow: var(--shadow-md);
      margin: 0 !important;
      flex-shrink: 0;
    }
    
    @media (min-width: 992px) {
      .hero-buttons {
        justify-content: flex-start;
        gap: 1.5rem;
      }
    }
    
    .hero-buttons .btn:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: var(--shadow-xl) !important;
    }
    
    .hero-buttons .btn-primary {
      background: linear-gradient(90deg, #ffb347, #ff6b6b);
      color: #120f23;
      border: none;
      box-shadow: 0 18px 35px rgba(255, 107, 107, 0.25);
    }
    
    .hero-buttons .btn-primary:hover {
      background: linear-gradient(90deg, #ffc066, #ff7a7a);
      color: #120f23;
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 25px 45px rgba(255, 107, 107, 0.35);
    }
    
    .hero-buttons .btn-outline-primary {
      border: 2px solid #667eea;
      color: #667eea;
      background: transparent;
    }
    
    .hero-buttons .btn-outline-primary:hover {
      background: #667eea;
      border-color: #667eea;
      color: white;
      transform: translateY(-3px) scale(1.02);
    }
    
    .min-vh-75 {
      min-height: 75vh;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 576px) {
      .hero-title {
        font-size: 1.75rem;
      }
      
      .hero-subtitle {
        font-size: 0.95rem;
      }
      
      .hero-buttons .btn {
        padding: 0.75rem 1.5rem;
        font-size: 0.95rem;
      }
    }
    
    .section-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.4rem 1.1rem;
      border-radius: 999px;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 1.25rem;
    }
    
    .services-shell {
      background: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 32px;
      padding: 3rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    }
    
    .services-shell::before,
    .services-shell::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 32px;
      background: radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.05), transparent 65%);
      pointer-events: none;
    }
    
    .services-shell::after {
      background: radial-gradient(circle at 80% 0%, rgba(255, 179, 71, 0.05), transparent 55%);
    }

    @media (max-width: 768px) {
      .services-shell {
        padding: 2rem;
      }
    }
    
    .services-title {
      color: #1a1a1a;
      font-size: 2.75rem;
      line-height: 1.2;
      margin-bottom: 1rem;
    }
    
    .services-description {
      color: #6c757d;
      font-size: 1.05rem;
      margin-bottom: 1.5rem;
    }
    
    .services-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .service-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      padding: 1rem 0;
      border-bottom: 1px solid #e9ecef;
    }
    
    .service-item:last-child {
      border-bottom: none;
    }
    
    .service-item h5 {
      color: #1a1a1a;
      margin-bottom: 0.35rem;
      font-size: 1.1rem;
    }
    
    .service-item p {
      color: #6c757d;
      margin-bottom: 0;
      font-size: 0.95rem;
    }
    
    .service-icon {
      width: 56px;
      height: 56px;
      border-radius: 18px;
      background: linear-gradient(140deg, rgba(102, 126, 234, 0.1), rgba(255, 179, 71, 0.1));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .services-preview {
      background: #f8f9fa;
      border-radius: 28px;
      border: 1px solid #e9ecef;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      position: relative;
      overflow: hidden;
    }
    
    .preview-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #6c757d;
      font-size: 0.9rem;
      margin-bottom: 1.75rem;
    }
    
    .preview-dots span {
      display: inline-flex;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #dee2e6;
      margin-left: 0.35rem;
    }
    
    .preview-body {
      display: flex;
      gap: 1rem;
      flex-direction: column;
    }
    
    .preview-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 1.5rem;
      border: 1px solid #e9ecef;
    }
    
    .preview-card ul {
      margin: 0;
      padding-left: 1rem;
      color: #6c757d;
    }
    
    .preview-card h4 {
      color: #1a1a1a;
      font-size: 1.4rem;
      margin-bottom: 0.75rem;
    }
    
    .preview-label {
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.75rem;
      color: #6c757d;
      margin-bottom: 0.25rem;
    }
    
    .preview-board {
      background: #ffffff;
      border-radius: 20px;
      padding: 1.5rem;
      border: 1px dashed #dee2e6;
    }
    
    .tag {
      display: inline-flex;
      padding: 0.35rem 0.9rem;
      border-radius: 999px;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      font-size: 0.85rem;
      margin-right: 0.5rem;
    }
    
    .preview-graph {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
      margin-top: 1rem;
      align-items: end;
      height: 120px;
    }
    
    .preview-graph .bar {
      background: linear-gradient(180deg, #ffb347 0%, #ff6b6b 100%);
      border-radius: 12px 12px 4px 4px;
      animation: pulse 4s ease-in-out infinite;
    }
    
    .bar-1 { height: 40%; animation-delay: 0.2s; }
    .bar-2 { height: 60%; animation-delay: 0.4s; }
    .bar-3 { height: 80%; animation-delay: 0.6s; }
    .bar-4 { height: 55%; animation-delay: 0.8s; }
    
    .planos-section {
      margin-top: 4.5rem;
      padding-top: 5rem;
      background: #f8f9fa;
      border-radius: 24px;
    }
    
    .planos-section .section-title {
      margin-top: 0;
    }
    
    .planos-section .section-subtitle {
      margin-top: 1rem;
    }
    
    @media (max-width: 768px) {
      .planos-section {
        margin-top: 3.5rem;
        padding-top: 4rem;
      }
    }
    
    @media (max-width: 576px) {
      .planos-section {
        margin-top: 3rem;
        padding-top: 3.5rem;
      }
    }
    
    .plano-card {
      border: 2px solid #e9ecef;
      transition: all var(--transition-normal);
      height: 100%;
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }
    
    .plano-card::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
      opacity: 0;
      transition: opacity var(--transition-normal);
    }
    
    .plano-card:hover::after {
      opacity: 1;
    }
    
    .plano-card:hover {
      border-color: rgba(255, 179, 71, 0.5);
      box-shadow: 0 20px 50px rgba(255, 107, 107, 0.25);
      transform: translateY(-8px) scale(1.02);
    }
    
    .plano-card.featured {
      border-color: rgba(255, 179, 71, 0.6);
      box-shadow: 0 20px 50px rgba(255, 107, 107, 0.3);
      background: linear-gradient(135deg, rgba(255, 179, 71, 0.15) 0%, rgba(255, 107, 107, 0.15) 100%);
      animation: pulse 3s ease-in-out infinite;
    }
    
    .plano-card.featured:hover {
      transform: translateY(-10px) scale(1.03);
      box-shadow: 0 25px 60px rgba(255, 107, 107, 0.4);
    }
    
    .plano-card .card-body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .plano-card .btn-primary {
      background: linear-gradient(90deg, #ffb347, #ff6b6b);
      color: #120f23;
      border: none;
      box-shadow: 0 8px 20px rgba(255, 107, 107, 0.2);
      font-weight: 600;
    }
    
    .plano-card .btn-primary:hover {
      background: linear-gradient(90deg, #ffc066, #ff7a7a);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(255, 107, 107, 0.3);
    }
    
    .plano-card .card-header {
      background: linear-gradient(90deg, rgba(255, 179, 71, 0.2), rgba(255, 107, 107, 0.2)) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }
    
    .plano-card .badge {
      background: rgba(255, 255, 255, 0.95) !important;
      color: #ff6b6b !important;
    }
    
    .plano-card .card-title {
      font-size: 1.45rem;
      color: #1a1a1a;
      margin-bottom: 0;
    }
    
    .plano-card .text-muted {
      color: #6c757d;
      margin-bottom: 0;
    }
    
    .plano-card .card-text {
      color: #495057;
      line-height: 1.6;
      margin-bottom: 0;
    }
    
    .plano-card .list-unstyled {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 0;
    }
    
    .benefit-item {
      animation: slideIn 0.5s ease-out forwards;
      opacity: 0;
      transform: translateX(-10px);
    }
    
    .check-icon {
      color: #ffb347;
      font-weight: 700;
      font-size: 1.2rem;
      display: inline-block;
      animation: scaleIn 0.4s ease-out;
      transition: all var(--transition-normal);
    }
    
    .benefit-item:hover .check-icon {
      transform: scale(1.3) rotate(15deg);
      color: #ff6b6b;
    }
    
    .benefit-item:hover {
      transform: translateX(5px);
      color: #1a1a1a;
    }
    
    .section-title {
      font-size: 2.75rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #1a1a1a;
      letter-spacing: -0.02em;
      line-height: 1.2;
      text-align: center;
    }
    
    .section-subtitle {
      font-size: 1.3rem;
      color: #6c757d;
      margin-bottom: 3.5rem;
      line-height: 1.7;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      font-weight: 400;
      text-align: center;
    }
    
    .diferenciais-section {
      padding-top: 5rem;
      /* Espaço extra para o CTA do footer "invadir" sem cobrir o conteúdo */
      padding-bottom: 14rem;
      background: #f8f9fa;
    }
    
    .diferenciais-title {
      font-size: 2.75rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 3.5rem;
      text-align: center;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }
    
    .diferencial-card {
      text-align: left;
      padding: 2.5rem;
      height: 100%;
      transition: all var(--transition-normal);
      background: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 16px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .diferencial-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(135deg, #ffb347, #ff6b6b);
      transform: scaleY(0);
      transition: transform var(--transition-normal);
      transform-origin: top;
    }
    
    .diferencial-card:hover::before {
      transform: scaleY(1);
    }
    
    .diferencial-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.15);
      border-color: rgba(255, 179, 71, 0.3);
    }
    
    .diferencial-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-normal);
      position: relative;
    }
    
    .diferencial-card:hover .diferencial-icon {
      transform: scale(1.15) rotate(5deg);
      animation: float 2s ease-in-out infinite;
    }
    
    .diferencial-card:hover .diferencial-icon svg {
      fill: #ffb347;
      filter: drop-shadow(0 4px 12px rgba(255, 179, 71, 0.4));
    }
    
    .diferencial-subtitle {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    
    .diferencial-text {
      font-size: 1.1rem;
      color: #6c757d;
      line-height: 1.7;
      margin-bottom: 0;
      text-align: left;
      font-weight: 400;
    }
    
    @media (max-width: 991px) {
      .diferenciais-title {
        font-size: 2rem;
        margin-bottom: 2.5rem;
      }
      
      .diferencial-subtitle {
        font-size: 1.3rem;
      }
      
      .diferencial-text {
        font-size: 1rem;
      }
      
      .diferencial-card {
        padding: 1.5rem;
        text-align: center;
      }
      
      .diferencial-text {
        text-align: center;
      }
    }
    
    @media (max-width: 576px) {
      .diferenciais-section {
        padding-top: 3rem;
        padding-bottom: 11rem;
      }
      
      .diferenciais-title {
        font-size: 1.75rem;
        margin-bottom: 2rem;
      }
      
      .diferencial-subtitle {
        font-size: 1.2rem;
        margin-bottom: 0.75rem;
      }
      
      .diferencial-text {
        font-size: 0.95rem;
        line-height: 1.6;
      }
      
      .diferencial-card {
        padding: 1.25rem;
      }
      
      .diferencial-icon {
        margin-bottom: 1.5rem !important;
      }
      
      .diferencial-icon svg {
        width: 48px;
        height: 48px;
      }
    }
    
    /* Micro-interações em links e botões */
    a, button {
      transition: all var(--transition-normal);
      position: relative;
    }
    
    a:not(.btn):hover {
      transform: translateX(3px);
    }
    
    .btn:not(:disabled):hover {
      transform: translateY(-2px);
    }
    
    .btn:not(:disabled):active {
      transform: translateY(0) scale(0.98);
    }
  `]
})
export class Home implements OnInit {
  planos: Plano[] = [];

  constructor(
    private planosService: PlanosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPlanos();
  }

  carregarPlanos(): void {
    this.planosService.listarPlanos().subscribe({
      next: (planos) => {
        // Se não houver planos do backend, usar dados mockados
        if (planos.length === 0) {
          this.planos = this.getPlanosMockados();
        } else {
          this.planos = planos;
        }
      },
      error: () => {
        // Em caso de erro, usar dados mockados
        this.planos = this.getPlanosMockados();
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
        recursos: []
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
        recursos: []
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
        recursos: []
      }
    ];
  }

  servicos = [
    {
      titulo: 'Contabilidade, demonstração e pareceres',
      descricao: 'Gestão completa da sua contabilidade com relatórios e pareceres especializados',
      icone: 'chart'
    },
    {
      titulo: 'Gestão de folha de pagamento',
      descricao: 'Processamento completo de folha com portal do colaborador',
      icone: 'users'
    },
    {
      titulo: 'Processamento fiscal e Legislação',
      descricao: 'Cumprimento de todas as obrigações fiscais e legais',
      icone: 'file'
    },
    {
      titulo: 'Gestão Societária',
      descricao: 'Abertura, alterações e gestão completa de contratos sociais',
      icone: 'building'
    },
    {
      titulo: 'Integração com ERPs',
      descricao: 'Integração com mais de 400 sistemas ERP e controle financeiro',
      icone: 'link'
    },
    {
      titulo: 'Portal do cliente',
      descricao: 'Acesso 24/7 com checklist, documentos digitais e relatórios',
      icone: 'monitor'
    }
  ];

  scrollToPlanos(): void {
    // Se já estiver na home, fazer scroll suave até a seção de planos
    if (this.router.url === '/' || this.router.url === '/home') {
      const planosSection = document.getElementById('planos');
      if (planosSection) {
        planosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Se estiver em outra página, navegar para home e depois fazer scroll
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const planosSection = document.getElementById('planos');
          if (planosSection) {
            planosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    }
  }

}
