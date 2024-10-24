import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  backgroundImage: string = 'images/fisio.jpg';
  title: string = 'DEUS FISIOTERAPIA';
  subtitle: string = 'Expertos en el cuidado de tu salud';
  ctaText: string = 'Ver más';

  scrollToServices() {
    const serviciosElement = document.getElementById('servicios');
    if (serviciosElement) {
      serviciosElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
