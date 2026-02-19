import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardTiltDirective } from '../../../../../shared/directives/card-tilt.directive';
import { ScrollRevealDirective } from '../../../../../shared/directives/scroll-reveal.directive';

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

interface FacilitadorLink {
  label: string;
  url: string;
}

interface FacilitadorContabil {
  titulo: string;
  icone: string;
  links: FacilitadorLink[];
}

interface ServicoItem {
  titulo: string;
  icone: string;
  itens: string[];
}

@Component({
  selector: 'app-home',
  imports: [CardTiltDirective, ScrollRevealDirective],
  templateUrl: './home.html',
  styles: [`
    .landing-page { background: var(--site-bg); min-height: 100vh; color: #e2e8f0; }
    .landing-hero { position: relative; min-height: 85vh; display: flex; align-items: center; padding: 100px 0 100px; overflow: visible; }
    .landing-hero-bg {
      position: absolute; inset: 0; z-index: 0;
      background: linear-gradient(135deg, #07090f 0%, #10203f 52%, #07090f 100%);
    }
    .landing-hero-pattern {
      position: absolute; inset: 0; z-index: 0; pointer-events: none;
    }
    .landing-hero-pattern::before {
      content: none;
    }
    .landing-hero-pattern::after {
      content: '';
      position: absolute;
      right: 5%;
      top: 8%;
      width: 40%;
      height: 80%;
      border-radius: 0;
      background: url('/imagem-home.png') center/contain no-repeat;
      border: none;
      box-shadow: none;
      filter: drop-shadow(0 26px 34px rgba(0, 0, 0, 0.45));
      transform-origin: 50% 58%;
      will-change: transform;
      animation: hero-device-spin 7s ease-in-out infinite;
    }
    .landing-hero-wave {
      position: absolute; bottom: 0; left: 0; right: 0; z-index: 1; line-height: 0; pointer-events: none; margin-bottom: -1px;
    }
    .landing-hero-wave-svg { width: 100%; height: 80px; display: block; }
    .landing-hero .container { position: relative; z-index: 2; }
    .landing-hero-content { max-width: 720px; text-align: center; padding-bottom: 1rem; }
    .landing-hero-tagline {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
      color: rgba(255, 255, 255, 0.9); font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;
      text-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    @keyframes tagline-icon-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes hero-device-spin {
      0% { transform: translate3d(0, 0, 0) rotate(-4deg); }
      25% { transform: translate3d(10px, -12px, 0) rotate(-1deg); }
      50% { transform: translate3d(0, -20px, 0) rotate(3deg); }
      75% { transform: translate3d(-10px, -12px, 0) rotate(0deg); }
      100% { transform: translate3d(0, 0, 0) rotate(-4deg); }
    }
    .landing-hero-tagline-icon {
      display: inline-flex;
      color: #fcd34d;
      animation: tagline-icon-spin 4s linear infinite;
    }
    .landing-hero-title {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(2.1rem, 5.5vw, 3.5rem); font-weight: 700; line-height: 1.2; margin-bottom: 1.25rem; color: #fff;
      text-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .landing-hero-title-accent { color: #fcd34d; text-shadow: 0 1px 4px rgba(0,0,0,0.3); }
    .landing-hero-desc {
      color: rgba(255, 255, 255, 0.9); font-size: 1.25rem; line-height: 1.65; margin-bottom: 2rem; max-width: 48rem;
      margin-left: auto; margin-right: auto; text-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
    .landing-hero-buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-bottom: 1.75rem; }
    .btn-landing {
      display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.875rem 2rem; border-radius: 0.5rem; font-weight: 700; font-size: 1.125rem; text-decoration: none; transition: all 0.3s ease;
    }
    .btn-landing-primary { background: linear-gradient(135deg, #c89e2f 0%, #f3d97b 52%, #b48b24 100%); color: #111; border: none; box-shadow: 0 4px 14px rgba(200, 158, 47, 0.4); }
    .btn-landing-primary:hover { background: linear-gradient(135deg, #b48b24 0%, #f3d97b 52%, #a47a18 100%); color: #111; transform: scale(1.05); box-shadow: 0 10px 30px rgba(200, 158, 47, 0.4); }
    .btn-landing-outline {
      background: rgba(16, 32, 63, 0.55); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #f5e9cc; border: 2px solid rgba(212, 175, 55, 0.4);
    }
    .btn-landing-outline:hover { background: rgba(24, 45, 90, 0.72); color: #f3d97b; }
    .landing-section { padding: 4.5rem 0; }
    .landing-section-cards { position: relative; }
    .landing-section-decor {
      position: absolute; top: 0; right: 0; width: 6rem; height: 6rem; pointer-events: none; z-index: 0;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.45) 0%, rgba(34, 52, 95, 0.55) 100%); opacity: 0.22; border-radius: 0 0 0 100%;
    }
    .landing-section-cards .container { position: relative; z-index: 1; }
    .landing-section-title { font-size: clamp(1.75rem, 4vw, 2.25rem); font-weight: 700; text-align: center; margin-bottom: 0.75rem; color: #fff; }
    .landing-section-title-accent { color: #d4af37; }
    .landing-section-subtitle { text-align: center; color: #94a3b8; font-size: 1rem; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.6; }
    .landing-clientes-header { text-align: center; }
    .landing-segmentos-pill {
      display: inline-block; margin-bottom: 0.75rem; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em;
      color: #f3d97b; background: rgba(212, 175, 55, 0.15); padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase;
    }
    .landing-planos-subtitle { color: #9ca3af; font-size: 1.25rem; max-width: 42rem; margin-bottom: 2.5rem; }
    .landing-cards-grid { display: grid; gap: 1.5rem; perspective: 1000px; }
    .landing-cards-4 { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
    .landing-cards-6 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .landing-cards-clientes { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
    .landing-cards-segmentos { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .landing-servicos-grid { display: flex; flex-direction: column; gap: 1.5rem; perspective: 1000px; }
    .landing-servicos-row {
      display: grid; gap: 1.5rem; align-items: stretch;
    }
    .landing-servicos-row-1 { grid-template-columns: repeat(3, 1fr); }
    .landing-servicos-row-2 { grid-template-columns: 1fr auto 1fr; }
    .landing-card-servico .landing-card-itens {
      list-style: none; padding: 0; margin: 0; margin-top: 0.75rem;
    }
    .landing-card-servico .landing-card-itens li {
      color: #94a3b8; font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.4rem; padding-left: 1rem; position: relative;
    }
    .landing-card-servico .landing-card-itens li::before {
      content: '–'; position: absolute; left: 0; color: #d4af37;
    }
    .landing-servicos-cta {
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; min-width: 220px; padding: 1.5rem 1rem;
    }
    .landing-servicos-cta-line {
      width: 2px; min-height: 40px; background: linear-gradient(180deg, #d4af37 0%, transparent 100%); position: relative; border-radius: 1px;
    }
    .landing-servicos-cta-line::before {
      content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; border-radius: 50%; background: #d4af37; box-shadow: 0 0 12px rgba(212, 175, 55, 0.6);
    }
    .landing-servicos-cta-text {
      color: #94a3b8; font-size: 0.95rem; font-weight: 500; text-align: center; margin: 0;
    }
    .btn-landing-servicos-cta {
      display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 9999px;
      background: linear-gradient(135deg, #c89e2f 0%, #f3d97b 52%, #b48b24 100%); color: #111; font-weight: 700; font-size: 0.9375rem; text-decoration: none; border: none; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 4px 14px rgba(200, 158, 47, 0.35);
    }
    .btn-landing-servicos-cta:hover { background: linear-gradient(135deg, #b48b24 0%, #f3d97b 52%, #a47a18 100%); color: #111; transform: scale(1.03); box-shadow: 0 6px 20px rgba(200, 158, 47, 0.4); }
    .landing-facilitador-lista { list-style: none; padding: 0; margin: 0; margin-top: 1rem; }
    .landing-facilitador-lista li { margin-bottom: 0.45rem; padding-left: 1rem; position: relative; }
    .landing-facilitador-lista li::before { content: '–'; position: absolute; left: 0; color: #d4af37; }
    .landing-facilitador-lista a {
      color: #94a3b8;
      font-size: 0.875rem;
      line-height: 1.5;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .landing-facilitador-lista a:hover {
      color: #f3d97b;
      text-decoration: underline;
    }
    .landing-facilitador-toggle {
      margin-top: 0.5rem;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: transparent;
      border: none;
      color: #f3d97b;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 0;
      cursor: pointer;
      transition: color 0.2s ease;
    }
    .landing-facilitador-toggle:hover {
      color: #ffe7a2;
      text-decoration: underline;
    }
    .landing-facilitador-toggle svg {
      transition: transform 0.2s ease;
    }
    .landing-facilitador-toggle.expanded svg {
      transform: rotate(180deg);
    }
    .landing-card {
      background: rgba(11, 15, 26, 0.68); border: 1px solid rgba(212, 175, 55, 0.16); border-radius: 1rem; padding: 1.75rem;
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      transition: box-shadow 0.3s ease, border-color 0.3s ease;
      cursor: default;
    }
    .landing-card:hover {
      box-shadow: 0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(212, 175, 55, 0.32); border-color: rgba(212, 175, 55, 0.32);
    }
    .landing-card:hover .landing-card-icon {
      transform: scale(1.08);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.28);
    }
    .landing-card-icon {
      width: 52px; height: 52px; border-radius: 12px; background: rgba(34, 52, 95, 0.5); color: #f3d97b;
      display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .landing-card-logo { overflow: hidden; padding: 4px; }
    .landing-card-logo img { width: 100%; height: 100%; object-fit: contain; }
    .landing-card-inicial { font-size: 1.25rem; font-weight: 700; color: #f3d97b; }
    .landing-card-title { font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
    .landing-card-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.55; margin: 0; }
    .landing-certificado-a1 {
      position: relative; overflow: hidden;
      background: linear-gradient(160deg, #0f0a1e 0%, #1a1b3a 35%, #0f172a 70%, #0a0f1e 100%);
    }
    .landing-certificado-sparkles {
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      background-image:
        radial-gradient(2px 2px at 20px 30px, rgba(212, 175, 55, 0.4), transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.25), transparent),
        radial-gradient(2px 2px at 50px 160px, rgba(212, 175, 55, 0.35), transparent),
        radial-gradient(2px 2px at 90px 40px, rgba(255, 255, 255, 0.2), transparent),
        radial-gradient(2px 2px at 130px 80px, rgba(212, 175, 55, 0.3), transparent),
        radial-gradient(2px 2px at 160px 120px, rgba(255, 255, 255, 0.2), transparent);
      background-size: 200px 200px; background-repeat: repeat; opacity: 0.9;
    }
    .landing-certificado-a1 .container { position: relative; z-index: 1; }
    .landing-certificado-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 2.5rem;
    }
    .landing-certificado-title {
      font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; color: #fff; margin-bottom: 0.25rem;
    }
    .landing-certificado-subtitle { color: #94a3b8; font-size: 1.1rem; margin-bottom: 1rem; }
    .landing-certificado-desc {
      color: #cbd5e1; font-size: 1rem; line-height: 1.65; margin-bottom: 1.5rem; max-width: 520px;
    }
    .landing-certificado-list {
      list-style: none; padding: 0; margin: 0;
    }
    .landing-certificado-list li {
      display: flex; align-items: center; gap: 0.75rem; color: #e2e8f0; font-size: 0.95rem; margin-bottom: 0.85rem;
    }
    .landing-certificado-list li::before {
      content: ''; flex-shrink: 0; width: 20px; height: 20px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2'%3E%3Cpath d='M21.801 10A10 10 0 1 1 17 3.335'/%3E%3Cpath d='m9 11 3 3L22 4'/%3E%3C/svg%3E") center/contain no-repeat;
    }
    .landing-certificado-devices {
      position: relative; display: flex; align-items: flex-end; justify-content: center; gap: 0; min-height: 300px;
    }
    .landing-certificado-phone {
      position: relative; z-index: 2; display: flex; align-items: flex-end;
      transform: rotate(-8deg); margin-right: -24px; margin-bottom: 0.5rem;
    }
    .landing-certificado-phone-screen {
      width: 118px; padding: 0.5rem 0.5rem 0.75rem; border-radius: 20px;
      background: linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%);
      box-shadow: 0 12px 28px rgba(0,0,0,0.45);
    }
    .landing-certificado-phone-topbar {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.6rem;
    }
    .landing-certificado-phone-logo { width: 24px; height: 24px; object-fit: contain; }
    .landing-certificado-phone-menu {
      display: flex; flex-direction: column; gap: 3px;
    }
    .landing-certificado-phone-menu span {
      display: block; width: 14px; height: 2px; background: rgba(255,255,255,0.7); border-radius: 1px;
    }
    .landing-certificado-phone-shield {
      display: flex; align-items: center; justify-content: center;
      width: 52px; height: 52px; margin: 0 auto 0.5rem;
      background: rgba(212, 175, 55, 0.12); border-radius: 50%; color: #d4af37;
    }
    .landing-certificado-laptop-wrap {
      position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;
      transform: perspective(320px) rotateY(-6deg);
    }
    .landing-certificado-laptop {
      padding: 8px; border-radius: 10px 10px 0 0;
      background: linear-gradient(180deg, #c0c0c0 0%, #8a8a8a 30%, #6b7280 100%);
      box-shadow: 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3);
    }
    .landing-certificado-laptop-screen {
      width: 260px; padding: 0.9rem; border-radius: 6px;
      background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
      box-shadow: inset 0 0 50px rgba(212, 175, 55, 0.08), 0 0 0 1px rgba(0,0,0,0.3);
    }
    .landing-certificado-screen-header {
      display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    }
    .landing-certificado-screen-logo { width: 26px; height: 26px; object-fit: contain; }
    .landing-certificado-screen-brand { display: flex; flex-direction: column; }
    .landing-certificado-screen-brand-name { font-size: 0.75rem; font-weight: 700; color: #f3d97b; }
    .landing-certificado-screen-brand-sub { font-size: 0.6rem; color: #94a3b8; }
    .landing-certificado-screen-title {
      font-size: 0.85rem; color: #fff; font-weight: 700; margin-bottom: 0.2rem;
    }
    .landing-certificado-screen-title-gold { color: #f3d97b; }
    .landing-certificado-screen-audience { font-size: 0.65rem; color: #94a3b8; margin-bottom: 0.5rem; }
    .landing-certificado-screen-options { margin-bottom: 0.6rem; }
    .landing-certificado-check {
      display: block; font-size: 0.7rem; color: #94a3b8; padding-left: 1.1rem; margin-bottom: 0.25rem;
      position: relative;
    }
    .landing-certificado-check::before {
      content: ''; position: absolute; left: 0; top: 0.1rem; width: 12px; height: 12px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2.5'%3E%3Cpath d='m9 11 3 3L22 4'/%3E%3C/svg%3E") center/contain no-repeat;
    }
    .landing-certificado-screen-btn {
      display: inline-block; padding: 0.4rem 0.75rem; border-radius: 6px;
      background: linear-gradient(135deg, #c89e2f 0%, #f3d97b 100%); color: #111; font-size: 0.7rem; font-weight: 700;
    }
    .landing-certificado-phone-label {
      display: block; text-align: center; font-size: 0.7rem; font-weight: 700; color: #fff; line-height: 1.2;
    }
    .landing-certificado-laptop-base {
      width: 280px; height: 14px; margin-top: 0; border-radius: 0 0 12px 12px;
      background: linear-gradient(180deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%);
      box-shadow: 0 6px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
    }
    .landing-certificado-cta-below {
      text-align: center; padding: 2rem 0 0; margin-top: 0.5rem;
    }
    .landing-certificado-cta-text {
      font-size: 1.15rem; font-weight: 700; color: #fff; margin: 0 0 0.25rem;
    }
    .landing-certificado-cta-sub { color: #94a3b8; font-size: 0.95rem; margin: 0 0 1rem; }
    .landing-certificado-btn {
      margin: 0 auto; border: none; outline: none; box-shadow: none;
    }
    .landing-certificado-btn:focus { outline: none; }
    @media (max-width: 992px) {
      .landing-certificado-grid { grid-template-columns: 1fr; gap: 2rem; }
      .landing-certificado-devices { order: -1; min-height: 220px; }
      .landing-certificado-content { text-align: center; }
      .landing-certificado-desc { margin-left: auto; margin-right: auto; }
    }
    @media (max-width: 768px) {
      .landing-certificado-devices { flex-direction: column; min-height: auto; gap: 1.5rem; }
      .landing-certificado-phone { transform: none; margin-right: 0; margin-bottom: 0; }
      .landing-certificado-laptop-wrap { transform: none; }
      .landing-certificado-laptop-screen { width: 220px; }
      .landing-certificado-laptop-base { width: 240px; }
      .landing-certificado-phone-screen { width: 100px; padding: 0.45rem; }
      .landing-certificado-phone-label { font-size: 0.6rem; }
      .landing-certificado-phone-shield { width: 44px; height: 44px; }
    }
    .landing-contato-wrap {
      max-width: 980px;
      margin: 0 auto;
      background: rgba(11, 15, 26, 0.68);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 1rem;
      padding: 2rem;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .landing-contato-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .landing-form-field {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .landing-form-field.full-width {
      grid-column: 1 / -1;
    }
    .landing-form-label {
      color: #e5e7eb;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .landing-form-input,
    .landing-form-textarea {
      width: 100%;
      border-radius: 0.65rem;
      border: 1px solid rgba(212, 175, 55, 0.3);
      background: rgba(8, 10, 18, 0.65);
      color: #f9fafb;
      padding: 0.75rem 0.9rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .landing-form-textarea {
      min-height: 120px;
      resize: vertical;
    }
    .landing-form-input:focus,
    .landing-form-textarea:focus {
      border-color: rgba(243, 217, 123, 0.8);
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
    }
    .landing-form-error {
      color: #fda4af;
      font-size: 0.78rem;
      line-height: 1.35;
    }
    .landing-contato-feedback {
      margin-top: 1rem;
      border-radius: 0.65rem;
      padding: 0.75rem 0.9rem;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .landing-contato-feedback.success {
      background: rgba(16, 185, 129, 0.16);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #bbf7d0;
    }
    .landing-contato-feedback.error {
      background: rgba(244, 63, 94, 0.14);
      border: 1px solid rgba(244, 63, 94, 0.35);
      color: #fecdd3;
    }
    .landing-contato-actions {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;
    }
    .landing-contato-submit {
      min-width: 210px;
      justify-content: center;
    }
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
      display: block; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: #d4af37; box-shadow: 0 4px 6px rgba(0,0,0,0.2); transition: transform 0.2s;
    }
    .landing-planos-switch-thumb.annual { transform: translateX(32px); }
    .landing-toggle-badge {
      background: rgba(212, 175, 55, 0.2); color: #f3d97b; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 9999px; border: 1px solid rgba(212, 175, 55, 0.35);
    }
    .landing-planos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: stretch; max-width: 80rem; margin: 0 auto; perspective: 1000px; }
    .landing-planos-grid .landing-plano-card.featured { margin-top: -1rem; margin-bottom: 1rem; }
    .landing-plano-card {
      background: rgba(11, 15, 26, 0.68); border: 1px solid rgba(212, 175, 55, 0.16); border-radius: 1rem; padding: 2rem; position: relative; display: flex; flex-direction: column;
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      transition: box-shadow 0.3s ease, border-color 0.3s ease; cursor: default;
    }
    .landing-plano-card:hover { border-color: rgba(212, 175, 55, 0.3); box-shadow: 0 24px 48px rgba(0,0,0,0.32); }
    .landing-plano-card.featured {
      background: rgba(12, 18, 31, 0.88); border-color: #d4af37; box-shadow: 0 25px 50px -12px rgba(212, 175, 55, 0.25);
    }
    .landing-plano-card.featured:hover { box-shadow: 0 25px 50px -12px rgba(212, 175, 55, 0.35); }
    .landing-plano-badge {
      position: absolute; top: -1rem; left: 50%; transform: translateX(-50%);
      background: linear-gradient(90deg, #b48b24 0%, #f3d97b 52%, #22345f 100%); color: #111; font-size: 0.875rem; font-weight: 700; padding: 0.25rem 1rem; border-radius: 9999px; box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    .landing-plano-nome { font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
    .landing-plano-desc { color: #9ca3af; font-size: 0.875rem; margin-bottom: 1.5rem; line-height: 1.5; min-height: 2.5rem; }
    .landing-plano-preco { margin-bottom: 1.5rem; }
    .landing-plano-valor { font-size: 2.25rem; font-weight: 800; color: #fff; }
    .landing-plano-mes { color: #9ca3af; font-size: 1rem; font-weight: 400; }
    .landing-plano-lista { list-style: none; padding: 0; margin: 0 0 1.5rem; flex-grow: 1; }
    .landing-plano-lista li { display: flex; align-items: flex-start; gap: 0.75rem; color: #d1d5db; font-size: 0.875rem; line-height: 1.4; margin-bottom: 1rem; }
    .landing-plano-lista li svg { flex-shrink: 0; color: #6b7280; margin-top: 0.15rem; }
    .landing-plano-lista li.featured-check svg { color: #d4af37; }
    .btn-landing-plano {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 1rem 1.5rem;
      border-radius: 0.75rem; background: rgba(255, 255, 255, 0.1); color: #fff; font-weight: 600; font-size: 1.125rem; text-decoration: none; border: none; cursor: pointer; transition: all 0.3s;
    }
    .btn-landing-plano:hover { background: rgba(255, 255, 255, 0.2); color: #fff; }
    .btn-landing-plano-featured {
      background: linear-gradient(90deg, #b48b24 0%, #f3d97b 52%, #22345f 100%); color: #111; box-shadow: 0 4px 14px rgba(180, 139, 36, 0.42);
    }
    .btn-landing-plano-featured:hover { box-shadow: 0 6px 20px rgba(180, 139, 36, 0.52); filter: brightness(1.05); }
    @media (max-width: 992px) {
      .landing-servicos-row-1 { grid-template-columns: 1fr; }
      .landing-servicos-row-2 { grid-template-columns: 1fr; }
      .landing-servicos-cta { order: 1; min-width: auto; }
    }
    @media (max-width: 768px) {
      .landing-hero-pattern::after {
        content: none;
        animation: none;
      }
      .landing-hero { padding-top: 100px; padding-bottom: 60px; }
      .landing-hero-buttons { flex-direction: column; }
      .landing-contato-wrap { padding: 1.25rem; }
      .landing-contato-grid { grid-template-columns: 1fr; }
      .landing-section { padding: 3rem 0; }
    }
  `]
})
export class Home implements OnInit {
  readonly estadualPreviewCount = 8;
  private estadualExpanded = false;

  /** Serviços baseados em https://arcontabilidade-am.com.br/index4165.html?pg=servicos.php */
  servicos: ServicoItem[] = [
    {
      titulo: 'Contábil',
      icone: 'contabil',
      itens: [
        'Escrituração Contábil e Conciliação de Contas',
        'Balanço, Livro Diário, Livro Razão, Livro Caixa, Livro Lalur',
        'Declaração de Imposto de Renda PJ e PF',
        'Informações junto ao IBGE'
      ]
    },
    {
      titulo: 'Fiscal',
      icone: 'fiscal',
      itens: [
        'Escrituração de Notas Fiscais (Entrada/Saída)',
        'Emissão de Livros Fiscais e guias (ICMS, Prefeitura, DARFs)',
        'Sintegra e Cálculo de IRPJ e CSL',
        'DCTF, DACON, DAM e DMS'
      ]
    },
    {
      titulo: 'Recursos Humanos',
      icone: 'rh',
      itens: [
        'Registro de livro de empregados e Livro Ponto',
        'Cálculo da Folha de Pagamento, Rescisão, Férias e 13º',
        'Horas Extras e Adicional Noturno',
        'CAGED, RAIS, DIRF, GPS, GFIP'
      ]
    },
    {
      titulo: 'Societário',
      icone: 'societario',
      itens: [
        'Constituição de empresa (Individual, Limitada, S/A, Filial)',
        'Inscrição no CNPJ e Inscrição Estadual',
        'Alvará de Funcionamento e Certidão de Uso do Solo',
        'Certidões (Receita Federal, Estadual, Municipal, Justiça)'
      ]
    },
    {
      titulo: 'Consultas e Certidões',
      icone: 'certidoes',
      itens: [
        'Certidão Negativa (Receita Federal, Estadual, Municipal)',
        'Consultas e relatórios à disposição do cliente',
        'Posto de Desembaraço Eletrônico – SEFAZ',
        'Atendimento especializado no seu negócio'
      ]
    }
  ];

  facilitadoresContabeis: FacilitadorContabil[] = [
    {
      titulo: 'Facilitador Contábil Estadual',
      icone: 'estadual',
      links: [
        { label: 'SEFAZ - Alagoas', url: 'https://www.sefaz.al.gov.br/' },
        { label: 'SEFAZ - Amazonas', url: 'https://www.sefaz.am.gov.br/' },
        { label: 'SEFAZ - Amapá', url: 'https://www.sefaz.ap.gov.br/' },
        { label: 'SEFAZ - Pará', url: 'https://www.sefa.pa.gov.br/' },
        { label: 'SEFAZ - Pará (consulta a contadores)', url: 'https://www.sefa.pa.gov.br/index.php/receita-digital/servicos' },
        { label: 'SEFAZ - Pernambuco', url: 'https://www.sefaz.pe.gov.br/' },
        { label: 'SEFAZ - Piauí', url: 'https://www.sefaz.pi.gov.br/' },
        { label: 'SEFAZ - Bahia', url: 'https://www.sefaz.ba.gov.br/' },
        { label: 'SEFAZ - Ceará', url: 'https://www.sefaz.ce.gov.br/' },
        { label: 'SEFAZ - Distrito Federal', url: 'https://www.receita.fazenda.df.gov.br/' },
        { label: 'SEFAZ - Espírito Santo', url: 'https://sefaz.es.gov.br/' },
        { label: 'SEFAZ - Goiás', url: 'https://goias.gov.br/economia/' },
        { label: 'SEFAZ - Maranhão', url: 'https://sistemas1.sefaz.ma.gov.br/portalsefaz/' },
        { label: 'SEFAZ - Mato Grosso', url: 'https://www.sefaz.mt.gov.br/' },
        { label: 'SEFAZ - Mato Grosso do Sul', url: 'https://www.sefaz.ms.gov.br/' },
        { label: 'SEFAZ - Minas Gerais', url: 'https://www.fazenda.mg.gov.br/' },
        { label: 'SEFAZ - Paraíba', url: 'https://www.sefaz.pb.gov.br/' },
        { label: 'SEFAZ - Paraná', url: 'https://www.fazenda.pr.gov.br/' },
        { label: 'SEFAZ - Rio de Janeiro', url: 'https://www.fazenda.rj.gov.br/sefaz/' },
        { label: 'SEFAZ - Rio Grande do Norte', url: 'https://www.set.rn.gov.br/' },
        { label: 'SEFAZ - Rio Grande do Sul', url: 'https://www.sefaz.rs.gov.br/' },
        { label: 'SEFAZ - Santa Catarina', url: 'https://www.sef.sc.gov.br/' },
        { label: 'SEFAZ - São Paulo', url: 'https://portal.fazenda.sp.gov.br/' },
        { label: 'SEFAZ - Sergipe', url: 'https://www.sefaz.se.gov.br/' },
        { label: 'SEFAZ - Tocantins', url: 'https://www.to.gov.br/sefaz' },
        { label: 'SEFIN - Rondônia', url: 'https://www.sefin.ro.gov.br/' },
        { label: 'SEFAZ - Roraima', url: 'https://www.sefaz.rr.gov.br/' }
      ]
    },
    {
      titulo: 'Facilitador Contábil Federal',
      icone: 'federal',
      links: [
        { label: 'CNPJ - Situação Cadastral', url: 'https://servicos.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp' },
        { label: 'CNPJ - Comprovante de Inscrição', url: 'https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp' },
        { label: 'CNPJ - Tabelas', url: 'https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cnpj/tabelas' },
        { label: 'CNPJ - Simples Nacional', url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/' },
        { label: 'CNPJ - Convênios Junta Comercial', url: 'https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cnpj/redesim' },
        { label: 'CPF - Consulta Restituição', url: 'https://www.restituicao.receita.fazenda.gov.br/' },
        { label: 'CPF - Regularização', url: 'https://servicos.receitafederal.gov.br/servicos/cpf/regularizacao/default.asp' },
        { label: 'CPF - Situação Cadastral', url: 'https://servicos.receita.fazenda.gov.br/servicos/cpf/consultasituacao/consultapublica.asp' },
        { label: 'CPF - Andamento de Pedido', url: 'https://www.gov.br/receitafederal/pt-br/servicos/cpf/consultar-andamento' },
        { label: 'CPF - Declaração de Isento', url: 'https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda' },
        { label: 'CPF - Imposto de Renda', url: 'https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda' }
      ]
    },
    {
      titulo: 'Facilitador Contábil Legislação',
      icone: 'legislacao',
      links: [
        { label: 'Decretos', url: 'https://www4.planalto.gov.br/legislacao' },
        { label: 'Decretos não enumerados', url: 'https://www.planalto.gov.br/ccivil_03/decreto/decretos_nao_enumerados.htm' },
        { label: 'Decretos-Leis', url: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del0001.htm' },
        { label: 'Propostas de Emendas à Constituição', url: 'https://www.camara.leg.br/proposicoesWeb/' },
        { label: 'Leis', url: 'https://www.planalto.gov.br/ccivil_03/LEIS/LCP/Lcp95.htm' },
        { label: 'Medidas Provisórias', url: 'https://www.planalto.gov.br/ccivil_03/_Ato2023-2026/2026/Mpv/' },
        { label: 'Projetos de Lei', url: 'https://www.camara.leg.br/buscaProposicoesWeb/pesquisaSimplificada' },
        { label: 'Constituição Federal', url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm' }
      ]
    },
    {
      titulo: 'Facilitador Contábil Municipal',
      icone: 'municipal',
      links: [
        { label: 'Junta Comercial do Amazonas (JUCEA)', url: 'https://www.jucea.am.gov.br/' },
        { label: 'NFS-e Manaus', url: 'https://nfse.manaus.am.gov.br/' },
        { label: 'Serviços Manaus', url: 'https://servicos.manaus.am.gov.br/' },
        { label: 'SEMEF Manaus', url: 'https://semef.manaus.am.gov.br/' }
      ]
    },
    {
      titulo: 'Facilitador Contábil Trabalhista',
      icone: 'trabalhista',
      links: [
        { label: 'FGTS', url: 'https://www.caixa.gov.br/beneficios-trabalhador/fgts/Paginas/default.aspx' },
        { label: 'CBO - Classificação Brasileira de Ocupações', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/cbo' },
        { label: 'Tudo sobre Seguro-Desemprego', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/servicos/seguro-desemprego' },
        { label: 'Requerimento Seguro-Desemprego', url: 'https://www.gov.br/pt-br/servicos/solicitar-o-seguro-desemprego' },
        { label: 'RAIS', url: 'https://www.rais.gov.br/' },
        { label: 'Novo CAGED', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho/novo-caged' },
        { label: 'Cálculo de Contribuições Previdenciárias', url: 'https://www.gov.br/inss/pt-br/servicos-do-inss/calculo-da-guia-da-previdencia-social-gps' }
      ]
    }
  ];

  getVisibleLinks(facilitador: FacilitadorContabil): FacilitadorLink[] {
    if (facilitador.icone !== 'estadual' || this.estadualExpanded) {
      return facilitador.links;
    }
    return facilitador.links.slice(0, this.estadualPreviewCount);
  }

  hasMoreEstadualLinks(facilitador: FacilitadorContabil): boolean {
    return facilitador.icone === 'estadual' && facilitador.links.length > this.estadualPreviewCount;
  }

  isEstadualExpanded(): boolean {
    return this.estadualExpanded;
  }

  toggleEstadualLinks(): void {
    this.estadualExpanded = !this.estadualExpanded;
  }

  get planosExibicao(): PlanoExibicao[] {
    return [
      {
        nome: 'Básico',
        descricao: 'Ideal para MEI e pequenos negócios que estão começando.',
        valor: 97,
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
        valor: 197,
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
        valor: 397,
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
