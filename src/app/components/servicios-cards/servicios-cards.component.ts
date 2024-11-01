import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

interface ImagenServicio {
  url: string;
  titulo: string;
  descripcion: string;
  informacionAdicional?: string;
  class?: string;
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
      informacionAdicional: 'Información detallada del servicio 2...',
      class: 'col-start-1 col-end-3 row-start-1 row-end-3',
    },
    {
      url: 'images/knee-pain.webp',
      titulo: 'Dolor de rodilla',
      descripcion: 'Servicio de fisioterapia para el dolor de rodilla.',
      informacionAdicional: 'Información detallada del servicio 3...',
      class: 'col-start-3 col-end-5 row-start-1 row-end-2 h-[268px]'
    },
    {
      url: 'images/babies.jpg',
      titulo: 'Estimulación temprana',
      descripcion: 'Servicio de fisioterapia para niños desde el nacimiento hasta los 3 años.',
      informacionAdicional: 'Información detallada del servicio 1...',
      class: 'col-start-3 col-end-4 row-start-2 row-end-3 h-[268px]'
    },
    {
      url: 'images/fisio.jpg',
      titulo: 'Neurología',
      descripcion: 'Servicio de fisioterapia para la neurología.',
      informacionAdicional: 'Información detallada del servicio 4...',
      class: 'col-start-4 col-end-5 row-start-2 row-end-3 h-auto'
    },
    {
      url: 'images/hero.jpg',
      titulo: 'Rehabilitación postquirúrgica',
      descripcion: 'Servicio de fisioterapia para la rehabilitación postquirúrgica.',
      informacionAdicional: 'Información detallada del servicio 5...',
      class: 'col-start-1 col-end-2 row-start-3 row-end-5'
    },
    {
      url: 'images/neuro.jpg',
      titulo: 'Evento cerebro vascular',
      descripcion: 'Servicio de fisioterapia para el evento cerebro vascular.',
      informacionAdicional: 'Información detallada del servicio 6...',
      class: 'col-start-2 col-end-5 row-start-3 row-end-4 h-[268px]'
    },
    {
      url: 'images/pregnant.jpg',
      titulo: 'Ginecología',
      descripcion: 'Servicio de fisioterapia para la ginecología.',
      informacionAdicional: 'Información detallada del servicio 7...',
      class: 'col-start-2 col-end-3 row-start-4 row-end-5 h-[268px]'
    },
    {
      url: 'images/backache.jpg',
      titulo: 'Dolor de espalda',
      descripcion: 'Servicio de fisioterapia para el dolor de espalda.',
      informacionAdicional: 'Información detallada del servicio 2...',
      class: 'col-start-3 col-end-5 row-start-4 row-end-6 h-[544px]'
    },
    {
      url: 'images/knee-pain.jpg',
      titulo: 'Dolor de rodilla',
      descripcion: 'Servicio de fisioterapia para el dolor de rodilla.',
      informacionAdicional: 'Información detallada del servicio 3...',
      class: 'col-start-1 col-end-2 row-start-5 row-end-6 h-[268px]'
    },
    {
      url: 'images/babies.jpg',
      titulo: 'Estimulación temprana',
      descripcion: 'Servicio de fisioterapia para niños desde el nacimiento hasta los 3 años.',
      informacionAdicional: 'Información detallada del servicio 1...',
      class: 'col-start-2 col-end-3 row-start-5 row-end-7 h-auto'
    },
    {
      url: 'images/fisio.jpg',
      titulo: 'Neurología',
      descripcion: 'Servicio de fisioterapia para la neurología.',
      informacionAdicional: 'Información detallada del servicio 4...',
      class: 'col-start-1 col-end-2 row-start-6 row-end-7 h-[268px]'
    },
    {
      url: 'images/hero.jpg',
      titulo: 'Rehabilitación postquirúrgica',
      descripcion: 'Servicio de fisioterapia para la rehabilitación postquirúrgica.',
      informacionAdicional: 'Información detallada del servicio 5...',
      class: 'col-start-3 col-end-4 row-start-6 row-end-7 h-[268px]'
    },
    {
      url: 'images/neuro.jpg',
      titulo: 'Evento cerebro vascular',
      descripcion: 'Servicio de fisioterapia para el evento cerebro vascular.',
      informacionAdicional: 'Información detallada del servicio 6...',
      class: 'col-start-4 col-end-5 row-start-6 row-end-8 h-auto'
    },
    {
      url: 'images/pregnant.jpg',
      titulo: 'Ginecología',
      descripcion: 'Servicio de fisioterapia para la ginecología.',
      informacionAdicional: 'Información detallada del servicio 7...',
      class: 'col-start-1 col-end-3 row-start-7 row-end-9 h-auto'
    },
    {
      url: 'images/neuro.jpg',
      titulo: 'Evento cerebro vascular',
      descripcion: 'Servicio de fisioterapia para el evento cerebro vascular.',
      informacionAdicional: 'Información detallada del servicio 6...',
      class: 'col-start-3 col-end-4 row-start-7 row-end-8 h-[268px]'
    },
    {
      url: 'images/pregnant.jpg',
      titulo: 'Ginecología',
      descripcion: 'Servicio de fisioterapia para la ginecología.',
      informacionAdicional: 'Información detallada del servicio 7...',
      class: 'col-start-3 col-end-5 row-start-8 row-end-9 h-[268px]'
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
