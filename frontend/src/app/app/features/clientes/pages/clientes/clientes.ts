import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: transparent;
    }

    .clientes-hero {
      padding: 7rem 0 5rem;
      background: #ffffff;
      position: relative;
      overflow: hidden;
      border-radius: 0 0 32px 32px;
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

    .clientes-hero::before,
    .clientes-hero::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.35;
      pointer-events: none;
    }

    .clientes-hero::before {
      width: 360px;
      height: 360px;
      background: rgba(102, 126, 234, 0.6);
      top: -120px;
      left: -80px;
    }

    .clientes-hero::after {
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
      color: rgb(95, 151, 235);
    }

    .clients-categories {
      padding: 5rem 0;
      background: rgba(255, 255, 255, 0.6);
    }

    .categories-header {
      text-align: center;
      margin-bottom: 2.5rem;
      color: #1a1a1a;
    }
    
    .partners-pill {
      display: inline-flex;
      padding: 0.35rem 1rem;
      border-radius: 999px;
      border: 1px solid #e9ecef;
      background: rgba(102, 126, 234, 0.1);
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #667eea;
      margin-bottom: 0.75rem;
    }
    
    .section-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a1a;
      text-align: center;
      margin-bottom: 1rem;
    }

    .categories-subtitle {
      max-width: 720px;
      margin: 0 auto;
      color: #6c757d;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.75rem;
    }

    .category-card {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), #ffffff);
      border-radius: 20px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
      padding: 1.6rem 1.6rem 1.3rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: relative;
      overflow: hidden;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }

    .category-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.8), rgba(37, 99, 235, 0.8));
    }

    .category-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 18px 36px rgba(15, 23, 42, 0.12);
      border-color: rgba(102, 126, 234, 0.35);
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .category-icon {
      width: 46px;
      height: 46px;
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(102, 126, 234, 0.14);
      color: #667eea;
      box-shadow: inset 0 0 0 1px rgba(102, 126, 234, 0.2);
      flex-shrink: 0;
    }

    .category-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }

    .category-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      color: #4b5563;
      font-size: 0.9rem;
    }

    .category-list li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid rgba(226, 232, 240, 0.6);
    }

    .category-list li:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .category-list li::before {
      content: '–';
      color: #667eea;
      font-weight: 700;
    }

    .category-item {
      color: inherit;
      font-weight: 500;
      letter-spacing: -0.01em;
    }

    @media (max-width: 991px) {
      .categories-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .clients-categories {
        padding: 4rem 0;
      }
    }

    @media (max-width: 576px) {
      .categories-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 991px) {
      .hero-main-text {
        font-size: 1.75rem;
      }
    }

    @media (max-width: 768px) {
      .clientes-hero {
        padding: 5.5rem 0 3.5rem;
      }

      .hero-main-text {
        font-size: 1.5rem;
      }
    }
  `]
})
export class Clientes {
  readonly clientCategories = [
    {
      title: 'Construção Civil e Materiais',
      icon: 'construction',
      companies: [
        'CONSTRUTORA SAVASSI LTDA',
        'BARBOSA MATERIAL DE CONSTRUÇÃO',
        'FMS COMÉRCIO DE MATERIAL DE CONSTRUÇÃO'
      ]
    },
    {
      title: 'Transporte e Logística',
      icon: 'logistics',
      companies: [
        'WINLOG LOGÍSTICA E TRANSPORTES EIRELI -EPP',
        'WW TRANSPORTE E AGENCIAMENTO DE CARGAS LTDA -EPP',
        'JG LOGÍSTICA E CONSTRUÇÕES',
        'ILS INTEGRAD LOGISTIC SOLUTIONS LTDA',
        'NORTESUL LOGÍSTICA',
        'TRANS PANTANAL LTDA',
        'TRANSBRITO TRANSPORTES DE CARGAS LTDA',
        'LLS TRANSPORTE E AGENCIAMENTO DE CARGAS LTDA-ME'
      ]
    },
    {
      title: 'Indústria e Embalagens',
      icon: 'packaging',
      companies: [
        'ARTEPRINTBOX INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA',
        'PAPERBOX INDÚSTRIA DE EMBALAGENS LTDA',
        'PENCOM DO BRASIL'
      ]
    },
    {
      title: 'Tecnologia e Comunicação',
      icon: 'tech',
      companies: [
        'AM02 IMPACTO INFOVIAS SPE LTDA',
        'IMPACTO INFOVIAS LTDA',
        'AMBIENT OFFICE',
        'COHEN COMUNICAÇÃO'
      ]
    },
    {
      title: 'Serviços Profissionais e Saúde',
      icon: 'services',
      companies: [
        'COELHO, CHAMY DIB & RIBEIRO. ADVOGADOS ASSOCIADOS',
        'JULITA N. CÂMARA DE CASTRO NEUROPSICÓLOGA',
        'BELÍSSIMAS LENTES',
        'AMBIENT CLEAR',
        'EDSON DAMASCENO'
      ]
    },
    {
      title: 'Despacho Aduaneiro',
      icon: 'customs',
      companies: [
        'IEX COMISSARIA DE DESPACHOS E ASSESSORIA ADUANEIRA'
      ]
    }
  ];
}
