import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styles: `
    /* Contact Section */
    .contact-section {
      background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
      padding: 60px 0 120px;
      position: relative;
    }

    .contact-card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      display: flex;
      gap: 40px;
      align-items: center;
      flex-wrap: wrap;
    }

    .contact-content {
      flex: 1;
      min-width: 300px;
    }

    .contact-content h2 {
      color: #2c3e50;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .contact-content p {
      color: #5a6c7d;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
    }

    .contact-form {
      flex: 1.5;
      min-width: 400px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }

    .form-control {
      padding: 14px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s;
    }

    .form-control:focus {
      outline: none;
      border-color: #ff6b35;
      box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    }

    .form-control::placeholder {
      color: #a0a0a0;
    }

    .btn-whatsapp {
      width: 100%;
      background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
      color: white;
      border: none;
      padding: 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.3s;
    }

    .btn-whatsapp:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
    }

    /* Footer Main */
    .footer-main {
      background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
      color: white;
      padding: 80px 0 40px;
      margin-top: -60px;
    }

    .footer-logo img {
      max-width: 180px;
      height: auto;
      filter: brightness(0) invert(1);
    }

    .logo-placeholder {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      padding: 16px 24px;
      display: inline-block;
    }

    .logo-placeholder h3 {
      color: white;
      font-size: 28px;
      font-weight: 800;
      margin: 0;
      letter-spacing: 2px;
    }

    .logo-placeholder .logo-subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 12px;
      margin: 0;
      text-align: center;
      letter-spacing: 1px;
      font-weight: 500;
    }

    .footer-description {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .social-icons {
      display: flex;
      gap: 12px;
    }

    .social-icon {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      text-decoration: none;
    }

    .social-icon.facebook {
      background: #3b5998;
    }

    .social-icon.linkedin {
      background: #0077b5;
    }

    .social-icon.instagram {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    }

    .social-icon:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .social-icon svg {
      color: white;
    }

    .footer-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 24px;
      color: white;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 12px;
    }

    .footer-links a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      font-size: 14px;
      transition: all 0.3s;
      display: inline-block;
    }

    .footer-links a:hover {
      color: white;
      transform: translateX(4px);
    }

    .contact-map {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .contact-item {
      color: rgba(255, 255, 255, 0.8);
      font-size: 13px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin: 0;
      line-height: 1.5;
    }

    .contact-item svg {
      flex-shrink: 0;
      margin-top: 2px;
      opacity: 0.9;
    }

    /* Responsive */
    @media (max-width: 991px) {
      .contact-card {
        flex-direction: column;
        padding: 30px;
      }

      .contact-form {
        min-width: unset;
        width: 100%;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .footer-main {
        padding: 60px 0 30px;
      }
    }

    @media (max-width: 768px) {
      .contact-section {
        padding: 40px 0 80px;
      }

      .contact-card {
        padding: 24px;
      }

      .contact-content h2 {
        font-size: 22px;
      }

      .footer-main {
        margin-top: -40px;
      }
    }
  `
})
export class Footer {
  currentYear = new Date().getFullYear();
}
