import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselItem {
  id: string;
  imageUrl: string;
  alt?: string;
  title?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styles: [`
    .carousel-container {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding: 2rem 0;
    }

    .carousel-track {
      display: flex;
      gap: 2rem;
      width: max-content;
      animation: scroll 120s linear infinite;
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-33.333%);
      }
    }

    .carousel-item {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 150px;
      height: 100px;
      padding: 1rem;
      background: var(--color-white, #ffffff);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .carousel-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .carousel-item img {
      max-width: 100%;
      max-height: 80px;
      object-fit: contain;
      filter: grayscale(20%);
      transition: filter 0.3s ease;
    }

    .carousel-item:hover img {
      filter: grayscale(0%);
    }

    .logo-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(140deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-radius: 8px;
    }

    .logo-text {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-purple, #667eea);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .carousel-controls {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(102, 126, 234, 0.2);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .carousel-controls:hover {
      background: var(--color-purple, #667eea);
      border-color: var(--color-purple, #667eea);
      color: white;
    }

    .carousel-controls.prev {
      left: 1rem;
    }

    .carousel-controls.next {
      right: 1rem;
    }

    .carousel-controls:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .carousel-controls {
        display: none;
      }

      .carousel-item {
        min-width: 120px;
        height: 80px;
      }
    }
  `]
})
export class CarouselComponent {
  @Input() items: CarouselItem[] = [];
  @Input() autoPlay: boolean = true;
  @Input() autoPlayInterval: number = 3000;
  @Input() showControls: boolean = true;

  placeholderImage = '/images/placeholder-logo.png';

  onImageError(item: CarouselItem): void {
    // Marcar como erro para mostrar placeholder
    item.imageUrl = '';
  }

  getInitials(name: string): string {
    if (!name) return '?';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }

  getDuplicatedItems(): CarouselItem[] {
    // Duplicar itens para criar efeito de scroll infinito contínuo
    return [...this.items, ...this.items, ...this.items];
  }

}

