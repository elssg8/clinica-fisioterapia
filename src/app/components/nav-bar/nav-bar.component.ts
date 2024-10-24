import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NosotrosItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoggedIn = false;
  activeModal: NosotrosItem | null = null;

  nosotrosItems: NosotrosItem[] = [
    {
      title: 'Objetivos',
      content: 'Consolidar un modelo de atención fisioterapéutica integral que permita la recuperación funcional de nuestros pacientes, garantizando un tratamiento efectivo y personalizado. Nuestro objetivo es mejorar la calidad de vida de cada paciente, reduciendo el tiempo de recuperación y promoviendo el bienestar físico a largo plazo.'
    },
    {
      title: 'Misión',
      content: 'Ofrecer servicios de fisioterapia de alta calidad, enfocados en la rehabilitación y bienestar de nuestros pacientes, utilizando técnicas avanzadas y un trato personalizado. Nos comprometemos a mejorar la calidad de vida de quienes acuden a nuestra clínica mediante un enfoque integral y profesional, priorizando siempre la salud y recuperación de cada persona.'
    },
    {
      title: 'Visión',
      content: 'Ser una clínica de referencia en fisioterapia, reconocida por nuestra excelencia en el tratamiento y recuperación de lesiones, contando con un equipo capacitado y comprometido con la innovación en técnicas terapéuticas. Aspiramos a expandir nuestros servicios y mejorar continuamente, con el fin de contribuir al bienestar de nuestra comunidad.'
    },
    {
      title: 'Valores',
      content: 'Nuestros valores son...'
    },
  ];

  toggleSession() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  showModal(item: NosotrosItem) {
    this.activeModal = item;
  }

  hideModal() {
    this.activeModal = null;
  }
}
