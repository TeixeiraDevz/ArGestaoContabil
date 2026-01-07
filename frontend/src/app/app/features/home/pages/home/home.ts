import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlanosService } from '../../../planos/services/planos.service';
import { Plano } from '../../../../../core/models/plano.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styles: [`
    :host {
      display: block;
      background: transparent;
      min-height: 100vh;
    }
    
    .hero-section {
      position: relative;
      background: transparent;
      min-height: 75vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 170px;
      padding-bottom: 80px;
    }
    
    @media (max-width: 768px) {
      .hero-section {
        min-height: 60vh;
        padding-top: 90px;
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

    /* Aproxima texto e imagem na hero (reduz gutter do Bootstrap só aqui) */
    .hero-row {
      --bs-gutter-x: 0.75rem;
    }
    
    .services-section {
      margin-top: 5rem;
    }
    
    .hero-content {
      animation: fadeInUp 0.8s ease-out;
    }
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1.2;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    .hero-title-brand {
      display: inline-block;
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(90deg, #0d1b2a 0%, #1e40af 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .hero-title-main {
      font-weight: 800;
    }

    .hero-title-sub {
      font-weight: 700;
    }
    
    .hero-subtitle {
      font-size: 1rem;
      color: #6c757d;
      line-height: 1.6;
      margin-bottom: 0.75rem;
      max-width: 480px;
    }
    
    .hero-illustration {
      animation: fadeInUp 0.8s ease-out;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    /* No desktop, encostar mais a ilustração no texto (lado esquerdo da coluna) */
    @media (min-width: 992px) {
      .hero-illustration {
        justify-content: flex-start;
      }
    }
    
    /* Visual do Hero (CSS-only, sem SVG/IMG) */
    .hero-visual {
      position: relative;
      width: min(520px, 100%);
      aspect-ratio: 11 / 9;
      border-radius: 28px;
      isolation: isolate;
    }

    .hero-visual::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background:
        radial-gradient(120% 90% at 20% 15%, rgba(102, 126, 234, 0.22) 0%, rgba(102, 126, 234, 0) 55%),
        radial-gradient(110% 85% at 85% 30%, rgba(37, 99, 235, 0.18) 0%, rgba(37, 99, 235, 0) 60%),
        radial-gradient(120% 90% at 55% 85%, rgba(118, 75, 162, 0.14) 0%, rgba(118, 75, 162, 0) 60%);
      filter: blur(8px);
      opacity: 0.9;
      z-index: 0;
    }

    .hv-card {
      position: absolute;
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid rgba(30, 64, 175, 0.14);
      box-shadow: 0 18px 45px rgba(11, 18, 32, 0.12);
      backdrop-filter: blur(10px);
      border-radius: 18px;
      z-index: 2;
    }

    .hv-card--main {
      left: 14%;
      top: 22%;
      width: 74%;
      height: 62%;
      padding: 14px 14px 12px;
    }

    .hv-card--side {
      right: 6%;
      bottom: 10%;
      width: 38%;
      height: 44%;
      padding: 14px;
      background: rgba(255, 255, 255, 0.62);
      box-shadow: 0 14px 35px rgba(11, 18, 32, 0.10);
      z-index: 1;
      transform: rotate(1.5deg);
    }

    .hv-card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 12px;
      background: rgba(13, 27, 42, 0.06);
      border: 1px solid rgba(13, 27, 42, 0.05);
    }

    .hv-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      display: inline-block;
    }
    .hv-dot--1 { background: rgba(30, 64, 175, 0.35); }
    .hv-dot--2 { background: rgba(30, 64, 175, 0.18); }
    .hv-dot--3 { background: rgba(30, 64, 175, 0.12); }

    .hv-card-title {
      margin-left: auto;
      font-size: 0.85rem;
      font-weight: 700;
      color: rgba(13, 27, 42, 0.70);
      letter-spacing: 0.02em;
    }

    .hv-kpis {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 12px 4px 10px;
    }

    .hv-kpi {
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.55);
      border: 1px solid rgba(30, 64, 175, 0.10);
    }

    .hv-kpi-label {
      display: block;
      font-size: 0.72rem;
      font-weight: 600;
      color: rgba(13, 27, 42, 0.55);
    }

    .hv-kpi-value {
      display: block;
      font-size: 1.05rem;
      font-weight: 800;
      color: rgba(13, 27, 42, 0.88);
      margin-top: 2px;
      letter-spacing: -0.01em;
    }

    .hv-kpi-value--up {
      color: #1e40af;
    }

    .hv-chart {
      position: relative;
      margin-top: 6px;
      height: calc(100% - 118px);
      border-radius: 14px;
      background: rgba(13, 27, 42, 0.03);
      border: 1px solid rgba(13, 27, 42, 0.05);
      overflow: hidden;
    }

    .hv-bars {
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 14px;
      top: 14px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      align-items: end;
      z-index: 1;
    }

    .hv-bar {
      border-radius: 10px;
      background: rgba(30, 64, 175, 0.18);
      height: 35%;
      transform-origin: bottom;
      animation: hvGrow 1.1s ease-out both;
    }
    .hv-bar--1 { height: 32%; }
    .hv-bar--2 { height: 44%; background: rgba(30, 64, 175, 0.20); }
    .hv-bar--3 { height: 58%; background: rgba(30, 64, 175, 0.22); }
    .hv-bar--4 { height: 72%; background: rgba(30, 64, 175, 0.24); }
    .hv-bar--5 { height: 86%; background: linear-gradient(135deg, rgba(13, 27, 42, 0.92), rgba(30, 64, 175, 0.92)); }

    @keyframes hvGrow {
      from { transform: scaleY(0.65); opacity: 0.6; }
      to { transform: scaleY(1); opacity: 1; }
    }

    .hv-axis {
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 12px;
      height: 3px;
      border-radius: 99px;
      background: rgba(13, 27, 42, 0.12);
      z-index: 1;
    }

    .hv-line {
      position: absolute;
      inset: 0;
      z-index: 2;
      background:
        radial-gradient(10px 10px at 25% 62%, rgba(30, 64, 175, 0.70) 0 45%, transparent 46% 100%),
        radial-gradient(10px 10px at 42% 55%, rgba(30, 64, 175, 0.72) 0 45%, transparent 46% 100%),
        radial-gradient(10px 10px at 60% 45%, rgba(30, 64, 175, 0.74) 0 45%, transparent 46% 100%),
        radial-gradient(12px 12px at 78% 32%, rgba(30, 64, 175, 0.95) 0 45%, transparent 46% 100%),
        linear-gradient(145deg, transparent 0 35%, rgba(30, 64, 175, 0.00) 35%, rgba(30, 64, 175, 0.00) 40%, transparent 40% 100%);
      mask-image: radial-gradient(140px 80px at 65% 45%, rgba(0,0,0,1) 0 60%, rgba(0,0,0,0) 75%);
      opacity: 0.95;
      pointer-events: none;
    }

    .hv-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(102, 126, 234, 0.14);
      border: 1px solid rgba(102, 126, 234, 0.22);
      color: rgba(13, 27, 42, 0.76);
      font-weight: 800;
      font-size: 0.8rem;
      margin-bottom: 12px;
    }

    .hv-side-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.52);
      border: 1px solid rgba(13, 27, 42, 0.05);
      margin-top: 10px;
    }

    .hv-side-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(30, 64, 175, 0.55);
      box-shadow: 0 6px 18px rgba(30, 64, 175, 0.18);
      flex-shrink: 0;
    }

    .hv-side-text {
      font-size: 0.82rem;
      font-weight: 700;
      color: rgba(13, 27, 42, 0.72);
      line-height: 1.2;
    }

    .hv-bubble {
      position: absolute;
      display: grid;
      place-items: center;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 18px 45px rgba(11, 18, 32, 0.14);
      z-index: 3;
      transform: translateZ(0);
      animation: hvFloat 7s ease-in-out infinite;
    }

    .hv-bubble--1 {
      right: 10%;
      top: 6%;
      width: 86px;
      height: 86px;
      background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.26) 0 28%, transparent 29% 100%),
        linear-gradient(135deg, rgba(247, 231, 165, 0.95), rgba(212, 175, 55, 0.95));
      color: rgba(255, 255, 255, 0.98);
      text-shadow: 0 2px 10px rgba(11, 18, 32, 0.12);
      animation-duration: 8.5s;
    }

    .hv-bubble--2 {
      left: 8%;
      top: 22%;
      width: 46px;
      height: 46px;
      background: rgba(102, 126, 234, 0.85);
      font-size: 1.05rem;
      animation-duration: 7.2s;
    }

    .hv-bubble--3 {
      left: 22%;
      top: 10%;
      width: 40px;
      height: 40px;
      background: rgba(13, 27, 42, 0.55);
      font-size: 0.95rem;
      animation-duration: 6.8s;
    }

    @keyframes hvFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @media (prefers-reduced-motion: reduce) {
      .hv-bar,
      .hv-bubble {
        animation: none !important;
      }
    }

    @media (max-width: 576px) {
      .hero-illustration {
        padding: 1rem 0.5rem;
      }
      .hero-visual {
        width: min(420px, 100%);
      }
      .hv-card--main {
        left: 10%;
        width: 80%;
      }
      .hv-card--side {
        display: none;
      }
      .hv-bubble--1 {
        right: 6%;
        top: 0%;
        transform: scale(0.92);
      }
    }
    
    @media (max-width: 991px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 0.95rem;
      }
    }
    
    @media (max-width: 780px) {
      .hero-title {
        font-size: 1.75rem;
      }
      
      .hero-subtitle {
        font-size: 0.9rem;
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
      background: linear-gradient(90deg, #0d1b2a, #1e40af);
      color: #ffffff;
      border: none;
      box-shadow: 0 18px 35px rgba(30, 64, 175, 0.28);
    }
    
    .hero-buttons .btn-primary:hover {
      background: linear-gradient(90deg, #0d1b2a, #1e40af);
      color: #ffffff;
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 25px 45px rgba(30, 64, 175, 0.38);
    }
    
    .hero-buttons .btn-outline-primary {
      border: 2px solid #1e40af;
      color: #1e40af;
      background: transparent;
    }
    
    .hero-buttons .btn-outline-primary:hover {
      background: #1e40af;
      border-color: #1e40af;
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
        font-size: 1.5rem;
      }
      
      .hero-subtitle {
        font-size: 0.875rem;
      }
      
      .hero-buttons .btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
      }
      
      /* Manter imagem ao lado no mobile */
      .hero-section .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      
      .hero-section .col-12 {
        flex: 0 0 50%;
        max-width: 50%;
      }
      
      .hero-illustration {
        padding: 0.5rem;
      }
      
      .hero-illustration svg,
      .hero-illustration img {
        max-width: 100%;
        height: auto;
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
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #e9ecef;
      border-radius: 32px;
      padding: 2.5rem;
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
      background: radial-gradient(circle at 80% 0%, rgba(102, 126, 234, 0.05), transparent 55%);
    }

    @media (max-width: 768px) {
      .services-shell {
        padding: 1.75rem;
      }
      
      .services-title {
        font-size: 1.75rem;
      }
      
      .services-description {
        font-size: 0.9rem;
      }
    }
    
    @media (max-width: 576px) {
      .services-shell {
        padding: 1.5rem;
      }
      
      .services-title {
        font-size: 1.5rem;
      }
      
      .services-description {
        font-size: 0.85rem;
      }
      
      /* Manter imagem ao lado no mobile */
      .services-shell .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      
      .services-shell .col-12 {
        flex: 0 0 50%;
        max-width: 50%;
        padding: 0.5rem;
      }
      
      .services-preview {
        padding: 1rem;
      }
      
      .preview-header {
        font-size: 0.75rem;
      }
      
      .preview-card h4 {
        font-size: 1rem;
      }
      
      .preview-card ul {
        font-size: 0.8rem;
      }
    }
    
    .services-title {
      color: #1a1a1a;
      font-size: 2rem;
      line-height: 1.3;
      margin-bottom: 0.875rem;
    }
    
    .services-description {
      color: #6c757d;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
    }
    
    .services-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .service-item {
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
      padding: 1.5rem 0;
      border-bottom: 1px solid rgba(233, 236, 239, 0.6);
      transition: all var(--transition-normal);
    }
    
    .service-item:hover {
      padding-left: 0.5rem;
      border-bottom-color: rgba(102, 126, 234, 0.3);
    }
    
    .service-item:last-child {
      border-bottom: none;
    }
    
    .service-item h5 {
      color: #1a1a1a;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.4;
    }
    
    .service-item p {
      color: #6c757d;
      margin-bottom: 0;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    .service-icon {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(118, 75, 162, 0.08));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
    }
    
    .service-icon::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(102, 126, 234, 0.15));
      opacity: 0;
      transition: opacity var(--transition-normal);
    }
    
    .service-item:hover .service-icon {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.25);
    }
    
    .service-item:hover .service-icon::before {
      opacity: 1;
    }
    
    .service-icon svg {
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }
    
    .services-preview {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 28px;
      border: 1px solid rgba(233, 236, 239, 0.5);
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
      background: rgba(255, 255, 255, 0.8);
      border-radius: 20px;
      padding: 1.5rem;
      border: 1px solid rgba(233, 236, 239, 0.5);
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
      background: rgba(255, 255, 255, 0.8);
      border-radius: 20px;
      padding: 1.5rem;
      border: 1px dashed rgba(222, 226, 230, 0.5);
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
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
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
      background: transparent;
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
      border: 2px solid rgba(233, 236, 239, 0.5);
      transition: all var(--transition-normal);
      height: 100%;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.8);
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
      border-color: rgba(102, 126, 234, 0.5);
      box-shadow: 0 20px 50px rgba(118, 75, 162, 0.25);
      transform: translateY(-8px) scale(1.02);
    }
    
    .plano-card.featured {
      border-color: rgba(102, 126, 234, 0.6);
      box-shadow: 0 20px 50px rgba(118, 75, 162, 0.3);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
      animation: pulse 3s ease-in-out infinite;
    }
    
    .plano-card.featured:hover {
      transform: translateY(-10px) scale(1.03);
      box-shadow: 0 25px 60px rgba(118, 75, 162, 0.4);
    }
    
    .plano-card .card-body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .plano-card .btn-primary {
      background: linear-gradient(90deg, #0d1b2a, #1e40af);
      color: #ffffff;
      border: none;
      box-shadow: 0 8px 20px rgba(30, 64, 175, 0.22);
      font-weight: 600;
    }
    
    .plano-card .btn-primary:hover {
      background: linear-gradient(90deg, #0d1b2a, #1e40af);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(30, 64, 175, 0.32);
    }
    
    .plano-card .card-header {
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2)) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }
    
    .plano-card .badge {
      background: rgba(255, 255, 255, 0.95) !important;
      color: #764ba2 !important;
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
      color: #667eea;
      font-weight: 700;
      font-size: 1.2rem;
      display: inline-block;
      animation: scaleIn 0.4s ease-out;
      transition: all var(--transition-normal);
    }
    
    .benefit-item:hover .check-icon {
      transform: scale(1.3) rotate(15deg);
      color: #764ba2;
    }
    
    .benefit-item:hover {
      transform: translateX(5px);
      color: #1a1a1a;
    }
    
    .section-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #1a1a1a;
      letter-spacing: -0.02em;
      line-height: 1.2;
      text-align: center;
    }
    
    .section-subtitle {
      font-size: 1rem;
      color: #6c757d;
      margin-bottom: 2.5rem;
      line-height: 1.6;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      font-weight: 400;
      text-align: center;
    }
    
    .diferenciais-section {
      padding-top: 5rem;
      /* Espaço extra para o CTA do footer "invadir" sem cobrir o conteúdo */
      padding-bottom: 8rem;
      background: transparent;
    }
    
    .diferenciais-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 2.5rem;
      text-align: center;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }
    
    .diferencial-card {
      text-align: left;
      padding: 2.5rem;
      height: 100%;
      transition: all var(--transition-normal);
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(233, 236, 239, 0.5);
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
      background: linear-gradient(135deg, #667eea, #764ba2);
      transform: scaleY(0);
      transition: transform var(--transition-normal);
      transform-origin: top;
    }
    
    .diferencial-card:hover::before {
      transform: scaleY(1);
    }
    
    .diferencial-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 10px 30px rgba(118, 75, 162, 0.15);
      border-color: rgba(102, 126, 234, 0.3);
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
      fill: #667eea;
      filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.4));
    }
    
    .diferencial-subtitle {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    
    .diferencial-text {
      font-size: 0.95rem;
      color: #6c757d;
      line-height: 1.6;
      margin-bottom: 0;
      text-align: left;
      font-weight: 400;
    }
    
    @media (max-width: 991px) {
      .diferenciais-title {
        font-size: 1.75rem;
        margin-bottom: 2rem;
      }
      
      .diferencial-subtitle {
        font-size: 1.15rem;
      }
      
      .diferencial-text {
        font-size: 0.9rem;
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
        font-size: 1.5rem;
        margin-bottom: 1.75rem;
      }
      
      .diferencial-subtitle {
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
      }
      
      .diferencial-text {
        font-size: 0.875rem;
        line-height: 1.5;
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
    private planosService: PlanosService
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
}
