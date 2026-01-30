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

      .hero-content {
        text-align: center;
        margin: 0 auto;
      }

      .hero-subtitle {
        margin-left: auto;
        margin-right: auto;
      }

      .hero-buttons {
        justify-content: center;
      }

      .services-section {
        margin-top: 3.5rem;
      }
    }
    
    .hero-background-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-image: url('/imagem - empresa.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }
    
    .hero-background-image::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
    
    .hero-section .container {
      position: relative;
      z-index: 2;
    }
    
    .hero-section .container > * {
      position: relative;
      z-index: 2;
    }

    .hero-row {
      --bs-gutter-x: 0.75rem;
    }
    
    .services-section {
      margin-top: 5rem;
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
      background: linear-gradient(180deg, #667eea 0%, #1e40af 100%);
      border-radius: 12px 12px 4px 4px;
      animation: pulse 4s ease-in-out infinite;
    }

    .bar-1 { height: 40%; animation-delay: 0.2s; }
    .bar-2 { height: 60%; animation-delay: 0.4s; }
    .bar-3 { height: 80%; animation-delay: 0.6s; }
    .bar-4 { height: 55%; animation-delay: 0.8s; }

    .service-item {
      display: flex;
      gap: 1.25rem;
      align-items: flex-start;
      padding: 1.5rem 1.75rem;
      background: #ffffff;
      border: 1px solid rgba(222, 226, 230, 0.8);
      border-radius: 18px;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .service-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.6), rgba(37, 99, 235, 0.6));
      opacity: 0.6;
    }

    .service-item:hover {
      transform: translateY(-4px);
      border-color: rgba(102, 126, 234, 0.35);
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
    }

    .service-icon-wrapper {
      flex-shrink: 0;
      position: relative;
    }

    .service-icon {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: rgba(102, 126, 234, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #667eea;
      box-shadow: inset 0 0 0 1px rgba(102, 126, 234, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    }

    .service-item:hover .service-icon {
      transform: translateY(-2px);
      background: rgba(102, 126, 234, 0.18);
      box-shadow: 0 8px 18px rgba(102, 126, 234, 0.2);
    }

    .service-icon svg {
      position: relative;
      z-index: 1;
      stroke-width: 2.2;
    }

    .service-content {
      flex: 1;
      padding-top: 0.25rem;
    }

    .service-description {
      color: #6c757d;
      margin-bottom: 0;
      font-size: 0.95rem;
      line-height: 1.6;
      font-weight: 400;
    }
    
    .hero-content {
      animation: fadeInUp 0.8s ease-out;
      background: transparent;
      padding: 0;
      max-width: 680px;
      margin-left: 0;
      margin-right: auto;
      padding-right: 0;
      text-align: left;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }

    
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      margin-bottom: 0;
      letter-spacing: -0.02em;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      text-wrap: balance;
    }

    .hero-title-brand {
      display: inline-block;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #ffffff;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .hero-title-main {
      font-weight: 800;
      background: linear-gradient(90deg, #667eea 0%, #1e40af 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: none;
    }

    .hero-title-sub {
      font-weight: 700;
      background: linear-gradient(90deg, #667eea 0%, #1e40af 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: none;
    }
    
    .hero-subtitle {
      font-size: 1rem;
      color: #ffffff;
      line-height: 1.6;
      margin-bottom: 0;
      max-width: 480px;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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

      .hero-section {
        padding-top: 80px;
        padding-bottom: 50px;
      }

      .hero-title {
        text-align: center;
      }

      .hero-subtitle {
        max-width: 100%;
      }
    }
    
    .hero-buttons {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
      justify-content: flex-start;
      margin-top: 0.25rem;
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
    
    .services-header {
      max-width: 760px;
      margin: 0 auto 2.5rem;
    }

    @media (max-width: 768px) {
      .services-title {
        font-size: 1.75rem;
      }
      
      .services-description {
        font-size: 0.9rem;
      }
    }
    
    @media (max-width: 576px) {
      .services-title {
        font-size: 1.5rem;
      }
      
      .services-description {
        font-size: 0.85rem;
      }
    }

    @media (max-width: 768px) {
      .services-shell {
        padding: 1.75rem;
      }
    }

    @media (max-width: 576px) {
      .services-shell {
        padding: 1.5rem;
        border-radius: 22px;
      }

      .services-preview {
        padding: 1rem;
        border-radius: 20px;
        margin-bottom: 1rem;
      }

      .preview-card h4 {
        font-size: 1.1rem;
      }

      .preview-card ul {
        font-size: 0.8rem;
      }

      .service-item {
        flex-direction: column;
        align-items: flex-start;
        padding: 1.25rem;
        gap: 1rem;
      }

      .service-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
      }
    }
    
    .services-title {
      color: #1a1a1a;
      font-size: 2rem;
      line-height: 1.3;
      margin-bottom: 0.875rem;
      text-align: center;
    }
    
    .services-description {
      color: #6c757d;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
      text-align: center;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
    }
    
    .service-card {
      background: #ffffff;
      border: 1px solid rgba(222, 226, 230, 0.9);
      border-radius: 18px;
      padding: 1.5rem;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }
    
    .service-card:hover {
      transform: translateY(-4px);
      border-color: rgba(102, 126, 234, 0.35);
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
    }
    
    .service-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(102, 126, 234, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #667eea;
      box-shadow: inset 0 0 0 1px rgba(102, 126, 234, 0.2);
    }
    
    .service-icon svg {
      stroke-width: 2.2;
    }
    
    .service-title {
      color: #1a1a1a;
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    
    .service-list {
      margin: 0;
      padding-left: 1.1rem;
      color: #6c757d;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    @media (max-width: 768px) {
      .service-icon {
        width: 52px;
        height: 52px;
        border-radius: 14px;
      }
      
      .service-icon svg {
        width: 24px;
        height: 24px;
      }
      
      .service-title {
        font-size: 1rem;
      }
      
      .service-list {
        font-size: 0.85rem;
      }
    }

    @media (max-width: 991px) {
      .services-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    
    @media (max-width: 576px) {
      .services-grid {
        grid-template-columns: 1fr;
      }
    }

    .services-cta {
      margin-top: 2.75rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
    }

    .services-cta-marker {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }

    .services-cta-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #667eea;
      box-shadow: 0 4px 10px rgba(102, 126, 234, 0.35);
    }

    .services-cta-line {
      width: 2px;
      height: 22px;
      border-radius: 999px;
      background: rgba(102, 126, 234, 0.65);
    }

    .services-cta-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }

    .services-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.7rem 1.6rem;
      border-radius: 999px;
      background: linear-gradient(90deg, #0d1b2a, #1e40af);
      color: #ffffff;
      font-weight: 600;
      text-decoration: none;
      box-shadow: 0 10px 20px rgba(30, 64, 175, 0.25);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .services-cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 26px rgba(30, 64, 175, 0.32);
      color: #ffffff;
    }

    .services-cta-btn-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      font-size: 1rem;
    }

    @media (max-width: 576px) {
      .services-cta-title {
        font-size: 1.05rem;
      }

      .services-cta-btn {
        width: 100%;
        justify-content: center;
      }
    }
    
    
    
    .planos-section {
      margin-top: 4.5rem;
      padding-top: 5rem;
      background: rgba(227, 242, 253, 0.7);
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

      .plano-card .card-body {
        padding: 1.5rem !important;
      }

      .plano-card .card-title {
        font-size: 1.25rem;
      }

      .plano-card .btn {
        font-size: 0.9rem;
        padding: 0.75rem 1rem;
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
      box-shadow: 0 20px 50px rgba(30, 64, 175, 0.25);
      transform: translateY(-8px) scale(1.02);
    }
    
    .plano-card.featured {
      border-color: rgba(102, 126, 234, 0.6);
      box-shadow: 0 20px 50px rgba(30, 64, 175, 0.3);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(30, 64, 175, 0.15) 100%);
      animation: pulse 3s ease-in-out infinite;
    }
    
    .plano-card.featured:hover {
      transform: translateY(-10px) scale(1.03);
      box-shadow: 0 25px 60px rgba(30, 64, 175, 0.4);
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
      color: #1e40af;
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
        border-radius: 14px;
      }
      
      .diferencial-icon {
        width: 60px;
        height: 60px;
        margin-bottom: 1.5rem !important;
      }
      
      .diferencial-icon svg {
        width: 24px;
        height: 24px;
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
        nome: 'Enterprise',
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
