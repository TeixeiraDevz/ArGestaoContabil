import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    }

    .cadastro-container {
      min-height: 100vh;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 2rem;
      padding-top: 8rem;
      padding-bottom: 4rem;
      margin-top: 0;
    }

    .cadastro-wrapper {
      display: flex;
      width: 100%;
      max-width: 1200px;
      min-height: 600px;
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      position: relative;
    }
    
    .cadastro-wrapper::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 24px;
      pointer-events: none;
      z-index: 100;
      box-shadow: inset 0 0 0 0 transparent;
    }

    .cadastro-image-section {
      flex: 0 0 50%;
      position: relative;
      overflow: hidden;
      z-index: 1;
      min-height: 600px;
    }

    .office-image {
      width: 100%;
      height: 100%;
      min-height: 600px;
      object-fit: cover;
      object-position: right center;
      display: block;
    }

    .office-placeholder {
      width: 100%;
      height: 100%;
      min-height: 600px;
      background: linear-gradient(135deg, #a8c5e2 0%, #667eea 50%, #764ba2 100%);
      background-image: 
        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%23e3f2fd;stop-opacity:1" /><stop offset="100%" style="stop-color:%23bbdefb;stop-opacity:1" /></linearGradient><linearGradient id="window" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23b3e5fc;stop-opacity:0.8" /><stop offset="100%" style="stop-color:%2390caf9;stop-opacity:0.6" /></linearGradient></defs><rect width="1600" height="1000" fill="url(%23bg)"/><rect x="0" y="700" width="1600" height="300" fill="%23f5f5f5"/><rect x="50" y="200" width="500" height="400" fill="url(%23window)" rx="4"/><rect x="600" y="200" width="500" height="400" fill="url(%23window)" rx="4"/><rect x="1150" y="200" width="400" height="400" fill="url(%23window)" rx="4"/><rect x="80" y="250" width="440" height="320" fill="%23ffffff" opacity="0.3"/><rect x="630" y="250" width="440" height="320" fill="%23ffffff" opacity="0.3"/><rect x="1180" y="250" width="340" height="320" fill="%23ffffff" opacity="0.3"/><rect x="100" y="650" width="300" height="200" fill="%23ffffff" rx="8" opacity="0.9"/><rect x="450" y="650" width="300" height="200" fill="%23ffffff" rx="8" opacity="0.9"/><rect x="800" y="650" width="300" height="200" fill="%23ffffff" rx="8" opacity="0.9"/><rect x="1150" y="650" width="300" height="200" fill="%23ffffff" rx="8" opacity="0.9"/><rect x="120" y="680" width="80" height="120" fill="%23e0e0e0" rx="4"/><rect x="220" y="680" width="80" height="120" fill="%23e0e0e0" rx="4"/><rect x="470" y="680" width="80" height="120" fill="%23e0e0e0" rx="4"/><rect x="570" y="680" width="80" height="120" fill="%23e0e0e0" rx="4"/><rect x="820" y="680" width="80" height="120" fill="%23e0e0e0" rx="4"/><rect x="920" y="680" width="80" height="120" fill="%23e0e0e0" rx="4"/><rect x="1170" y="680" width="80" height="120" fill="%23e0e0e0" rx="4"/><rect x="1270" y="680" width="80" height="120" fill="%23e0e0e0" rx="4"/><circle cx="160" cy="740" r="12" fill="%23667eea" opacity="0.6"/><circle cx="260" cy="740" r="12" fill="%23667eea" opacity="0.6"/><circle cx="510" cy="740" r="12" fill="%23667eea" opacity="0.6"/><circle cx="610" cy="740" r="12" fill="%23667eea" opacity="0.6"/><circle cx="860" cy="740" r="12" fill="%23667eea" opacity="0.6"/><circle cx="960" cy="740" r="12" fill="%23667eea" opacity="0.6"/><circle cx="1210" cy="740" r="12" fill="%23667eea" opacity="0.6"/><circle cx="1310" cy="740" r="12" fill="%23667eea" opacity="0.6"/><rect x="150" y="300" width="60" height="80" fill="%23ffffff" opacity="0.5" rx="4"/><rect x="250" y="300" width="60" height="80" fill="%23ffffff" opacity="0.5" rx="4"/><rect x="350" y="300" width="60" height="80" fill="%23ffffff" opacity="0.5" rx="4"/><rect x="700" y="300" width="60" height="80" fill="%23ffffff" opacity="0.5" rx="4"/><rect x="800" y="300" width="60" height="80" fill="%23ffffff" opacity="0.5" rx="4"/><rect x="900" y="300" width="60" height="80" fill="%23ffffff" opacity="0.5" rx="4"/><rect x="1250" y="300" width="60" height="80" fill="%23ffffff" opacity="0.5" rx="4"/><rect x="1350" y="300" width="60" height="80" fill="%23ffffff" opacity="0.5" rx="4"/><rect x="200" y="450" width="200" height="150" fill="%23e3f2fd" opacity="0.4" rx="6"/><rect x="750" y="450" width="200" height="150" fill="%23e3f2fd" opacity="0.4" rx="6"/><rect x="1300" y="450" width="150" height="150" fill="%23e3f2fd" opacity="0.4" rx="6"/></svg>');
      background-size: cover;
      background-position: right center;
    }

    .placeholder-content {
      display: none;
    }

    .cadastro-form-section {
      flex: 0 0 50%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 3rem;
      padding-top: 4rem;
      background: #ffffff;
      position: relative;
      z-index: 2;
      overflow-y: auto;
      min-height: 600px;
      border-radius: 0 24px 24px 0;
    }

    .cadastro-card {
      width: 100%;
      max-width: 400px;
    }

    .cadastro-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 0.5rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .cadastro-subtitle {
      font-size: 1rem;
      color: #666;
      margin-bottom: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .cadastro-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      color: #999;
      z-index: 1;
    }

    .form-group input {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 3rem;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      font-size: 0.95rem;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #f8f9fa;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      background: #ffffff;
    }

    .cadastro-button {
      width: 100%;
      padding: 0.875rem 1.5rem;
      background: #667eea;
      color: #ffffff;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      margin-top: 0.5rem;
    }

    .cadastro-button:hover {
      background: #5568d3;
      transform: translateY(-2px);
    }

    .cadastro-button:active {
      transform: translateY(0);
    }

    .login-link {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.9rem;
      color: #666;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .login-link a {
      color: #667eea;
      text-decoration: underline;
      font-weight: 600;
      transition: color 0.2s;
    }

    .login-link a:hover {
      color: #5568d3;
    }

    .social-icons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }

    .social-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #667eea;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.2s, background-color 0.2s;
      font-size: 0.875rem;
    }

    .social-icon:hover {
      transform: translateY(-2px);
      background: #5568d3;
    }

    .social-icon svg {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 991px) {
      .cadastro-wrapper {
        flex-direction: column;
        min-height: auto;
      }

      .cadastro-image-section {
        flex: 1;
      }

      .cadastro-form-section {
        flex: 1;
        padding: 2rem 1.5rem;
      }

      .cadastro-image-section {
        display: none;
      }
    }

    @media (max-width: 576px) {
      .cadastro-container {
        padding: 1rem;
      }

      .cadastro-form-section {
        padding: 1.5rem 1rem;
      }

      .cadastro-title {
        font-size: 2rem;
      }
    }
  `]
})
export class Cadastro implements OnInit {
  email = '';
  password = '';
  showPassword = false;
  imageLoaded = false;
  imageError = false;

  ngOnInit() {
    // Se a imagem já estiver carregada, ativar animação imediatamente
    const img = new Image();
    img.src = 'office - login -image.jpg';
    if (img.complete) {
      this.imageLoaded = true;
    } else {
      img.onerror = () => {
        this.imageError = true;
        this.imageLoaded = true;
      };
      img.onload = () => {
        this.imageLoaded = true;
      };
    }
  }

  onImageLoad() {
    this.imageLoaded = true;
    this.imageError = false;
  }

  onImageError() {
    this.imageError = true;
    this.imageLoaded = true;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    // TODO: Implementar lógica de cadastro
    console.log('Cadastro submitted', { email: this.email, password: this.password });
  }

  loginWithGoogle(): void {
    // TODO: Implementar login com Google
    console.log('Login with Google');
  }
}
