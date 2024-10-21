import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  backgroundImage: string = 'assets/hero-background.jpg';
  title: string = 'Welcome to Our Physiotherapy Clinic';
  subtitle: string = 'Expert care for your physical well-being';
  ctaText: string = 'Book an Appointment';
}
