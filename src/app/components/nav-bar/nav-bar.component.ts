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
      content: 'Consolidar un modelo de atención fisioterapéutica integral que permita la recuperación funcional de nuestros pacientes, garantizando un tratamiento efectivo y personalizado.\n\nNuestro objetivo es mejorar la calidad de vida de cada paciente, reduciendo el tiempo de recuperación y promoviendo el bienestar físico a largo plazo.'
    },
    {
      title: 'Misión',
      content: 'Ofrecer servicios de fisioterapia de alta calidad, enfocados en la rehabilitación y bienestar de nuestros pacientes, utilizando técnicas avanzadas y un trato personalizado. \n\nNos comprometemos a mejorar la calidad de vida de quienes acuden a nuestra clínica mediante un enfoque integral y profesional, priorizando siempre la salud y recuperación de cada persona.'
    },
    {
      title: 'Visión',
      content: 'Ser una clínica de referencia en fisioterapia, reconocida por nuestra excelencia en el tratamiento y recuperación de lesiones, contando con un equipo capacitado y comprometido con la innovación en técnicas terapéuticas.\n\nAspiramos a expandir nuestros servicios y mejorar continuamente, con el fin de contribuir al bienestar de nuestra comunidad.'
    },
    {
      title: 'Valores',
      content: 'Profesionalismo y ética: Ofrecer servicios de calidad con ética profesional y respeto. \n\nEmpatía y trato personalizado: Escuchar y comprender a cada paciente para un tratamiento adaptado. \n\nExcelencia y mejora continua: Compromiso con la actualización constante de conocimientos y técnicas. \n\nCompromiso con la salud: Fomentar la recuperación y bienestar físico de los pacientes. \n\nTransparencia: Mantener comunicación clara sobre tratamientos y avances.'
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

  scrollToCalendar() {
    const calendarElement = document.getElementById('calendar');
    if (calendarElement) {
      const offset = calendarElement.offsetTop - 25; // Ajuste por el margen
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  }

  scrollToServices() {
    const serviciosElement = document.getElementById('servicios');
    if (serviciosElement) {
      const offset = serviciosElement.offsetTop; // Ajuste por el margen
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  }

  scrollToMaps() {
    const mapsElement = document.getElementById('maps');
    if (mapsElement) {
      const offset = mapsElement.offsetTop;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }
}
