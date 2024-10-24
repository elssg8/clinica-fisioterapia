import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

interface ImagenServicio {
  url: string;
  titulo: string;
  descripcion: string;
  informacionAdicional?: string; // Nuevo campo para la información del modal
}

@Component({
  selector: 'app-servicios-cards',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './servicios-cards.component.html',
  styleUrl: './servicios-cards.component.css'
})
export class ServiciosCardsComponent {
  imagenes: ImagenServicio[] = [
    {
      url: 'images/backache.jpg',
      titulo: 'Dolor de espalda',
      descripcion: 'Servicio de fisioterapia para el dolor de espalda.',
      informacionAdicional: 'Información detallada del servicio 2...'
    },
    {
      url: 'images/knee-pain.jpg',
      titulo: 'Dolor de rodilla',
      descripcion: 'Servicio de fisioterapia para el dolor de rodilla.',
      informacionAdicional: 'Información detallada del servicio 3...'
    },
    {
      url: 'images/babies.jpg',
      titulo: 'Estimulación temprana',
      descripcion: 'Servicio de fisioterapia para niños desde el nacimiento hasta los 3 años.',
      informacionAdicional: 'Información detallada del servicio 1...'
    },
    {
      url: 'images/fisio.jpg',
      titulo: 'Neurología',
      descripcion: 'Servicio de fisioterapia para la neurología.',
      informacionAdicional: 'Información detallada del servicio 4...'
    },
    {
      url: 'images/hero.jpg',
      titulo: 'Rehabilitación postquirúrgica',
      descripcion: 'Servicio de fisioterapia para la rehabilitación postquirúrgica.',
      informacionAdicional: 'Información detallada del servicio 5...'
    },
    {
      url: 'images/neuro.jpg',
      titulo: 'Evento cerebro vascular',
      descripcion: 'Servicio de fisioterapia para el evento cerebro vascular.',
      informacionAdicional: 'Información detallada del servicio 6...'
    },
    {
      url: 'images/pregnant.jpg',
      titulo: 'Ginecología',
      descripcion: 'Servicio de fisioterapia para la ginecología.',
      informacionAdicional: 'Información detallada del servicio 7...'
    }
  ];

  modalAbierto = false;
  servicioSeleccionado: ImagenServicio | null = null;

  abrirModal(servicio: ImagenServicio) {
    this.servicioSeleccionado = servicio;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.servicioSeleccionado = null;
  }

  agendarCita() {
    // Implementa la lógica para agendar cita aquí
    console.log('Agendar cita para:', this.servicioSeleccionado?.titulo);
    this.cerrarModal();
  }
}
