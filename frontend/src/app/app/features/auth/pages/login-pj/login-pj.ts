import { Component } from '@angular/core';

@Component({
  selector: 'app-login-pj',
  standalone: true,
  imports: [],
  templateUrl: './login-pj.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: radial-gradient(circle at top right, rgba(118, 75, 162, 0.18), transparent 45%), var(--color-gray-light);
      padding: 6rem 0 4rem;
    }

    .badge-soft {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      background: rgba(118, 75, 162, 0.12);
      color: var(--color-purple);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 600;
    }

    .section-title {
      font-size: 2.75rem;
      font-weight: 700;
      color: var(--color-black);
      margin: 1rem 0;
      letter-spacing: -0.02em;
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: var(--color-gray);
      margin-bottom: 0;
      line-height: 1.7;
    }

    .card-form {
      background: var(--color-white);
      border-radius: 24px;
      padding: 2.75rem 2.5rem;
      box-shadow: 0 25px 60px rgba(118, 75, 162, 0.12);
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .card-form::after {
      content: '';
      position: absolute;
      bottom: -70px;
      left: -45px;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(118, 75, 162, 0.18) 0%, transparent 70%);
      z-index: 0;
    }

    .card-header {
      position: relative;
      z-index: 1;
      margin-bottom: 2rem;
    }

    .card-header h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--color-black);
      margin-bottom: 0.5rem;
    }

    .card-header p {
      color: var(--color-gray);
      margin-bottom: 0;
    }

    .standard-form {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form-group {
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group.two-columns {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .form-group label {
      font-weight: 600;
      color: var(--color-black);
      font-size: 0.95rem;
    }

    .form-group input,
    .form-group textarea {
      border-radius: 14px;
      border: 1.5px solid rgba(118, 75, 162, 0.25);
      padding: 0.95rem 1.1rem;
      font-size: 0.98rem;
      transition: border var(--transition-fast), box-shadow var(--transition-fast);
      background: rgba(255, 255, 255, 0.92);
      resize: none;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: rgba(118, 75, 162, 0.9);
      box-shadow: 0 12px 30px rgba(118, 75, 162, 0.18);
      background: #ffffff;
    }

    .form-actions,
    .form-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1rem;
    }

    .form-footer {
      align-items: center;
      justify-content: space-between;
    }

    .form-footer .link {
      color: var(--color-purple);
      font-weight: 500;
      font-size: 0.95rem;
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .form-footer .link:hover {
      color: var(--color-purple-dark);
    }

    .btn-primary,
    .btn-outline {
      flex: 1;
      min-width: 180px;
      padding: 0.9rem 1.25rem;
      border-radius: 14px;
      font-weight: 600;
      border: 0;
      cursor: pointer;
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    }

    .btn-primary {
      background: var(--color-purple);
      color: var(--color-white);
      box-shadow: 0 18px 35px rgba(118, 75, 162, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 22px 40px rgba(118, 75, 162, 0.4);
    }

    .btn-outline {
      background: rgba(255, 255, 255, 0.92);
      color: var(--color-purple);
      border: 1.5px solid rgba(118, 75, 162, 0.35);
    }

    .btn-outline:hover {
      transform: translateY(-3px);
      box-shadow: 0 18px 35px rgba(118, 75, 162, 0.2);
    }

    @media (max-width: 991px) {
      :host {
        padding-top: 5rem;
      }

      .section-title {
        font-size: 2.25rem;
      }

      .card-form {
        padding: 2.25rem 2rem;
      }

    }

    @media (max-width: 768px) {
      :host {
        padding: 4rem 0 3rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .card-form {
        padding: 2rem 1.75rem;
      }

      .form-group.two-columns {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 576px) {
      .form-actions {
        flex-direction: column;
      }

      .form-actions .btn-primary,
      .form-actions .btn-outline {
        width: 100%;
      }
    }
  `]
})
export class LoginPj {
}

