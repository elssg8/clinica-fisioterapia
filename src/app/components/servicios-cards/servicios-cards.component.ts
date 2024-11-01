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

  alto_lg = 'h-[552px]';
  alto_md = 'h-[268px]';

  imagenes: ImagenServicio[] = [
    {
      url: 'images/fracturas.jpg',
      titulo: 'Fracturas',
      descripcion: 'Servicio de fisioterapia para fracturas.',
      informacionAdicional: 'Información detallada del servicio 2...',
      class: 'col-start-1 col-end-3 row-start-1 row-end-3 ' + this.alto_lg
    },
    {
      url: 'images/esguince.png',
      titulo: 'Esguinces',
      descripcion: 'Servicio de fisioterapia para esguinces.',
      informacionAdicional: 'Información detallada del servicio 3...',
      class: 'col-start-3 col-end-5 row-start-1 row-end-2 ' + this.alto_md
    },
    {
      url: 'images/pie-plano.jpg',
      titulo: 'Pie Plano',
      descripcion: 'Servicio de fisioterapia para pie plano.',
      informacionAdicional: 'Información detallada del servicio 1...',
      class: 'col-start-3 col-end-4 row-start-2 row-end-3 ' + this.alto_md
    },
    {
      url: 'images/tendinitis.jpg',
      titulo: 'Tendinitis',
      descripcion: 'Servicio de fisioterapia para la tendinitis.',
      informacionAdicional: 'Información detallada del servicio 4...',
      class: 'col-start-4 col-end-5 row-start-2 row-end-3 ' + this.alto_md
    },
    {
      url: 'images/tratamiento-post-covid.jpg',
      titulo: 'Tratamiento Post Covid',
      descripcion: 'Servicio de fisioterapia para el tratamiento post covid.',
      informacionAdicional: 'Información detallada del servicio 5...',
      class: 'col-start-1 col-end-2 row-start-3 row-end-5 ' + this.alto_lg
    },
    {
      url: 'images/evento-cerebro-vascular-2.jpg',
      titulo: 'Evento cerebro vascular',
      descripcion: 'Servicio de fisioterapia para el evento cerebro vascular.',
      informacionAdicional: 'Información detallada del servicio 6...',
      class: 'col-start-2 col-end-5 row-start-3 row-end-4 ' + this.alto_md
    },
    {
      url: 'images/estimulacion-temprana.jpg',
      titulo: 'Estimulación temprana',
      descripcion: 'Servicio de fisioterapia para la estimulación temprana.',
      informacionAdicional: 'Información detallada del servicio 7...',
      class: 'col-start-2 col-end-3 row-start-4 row-end-5 ' + this.alto_md
    },
    {
      url: 'images/neurorehabilitacion.jpg',
      titulo: 'Neurorehabilitación',
      descripcion: 'Servicio de fisioterapia para la neurorehabilitación.',
      informacionAdicional: 'Información detallada del servicio 2...',
      class: 'col-start-3 col-end-5 row-start-4 row-end-6 ' + this.alto_lg
    },
    {
      url: 'images/tratamiento-grasa.jpg',
      titulo: 'Tratamiento de grasa localizada',
      descripcion: 'Servicio de fisioterapia para el tratamiento de grasa localizada.',
      informacionAdicional: 'Información detallada del servicio 3...',
      class: 'col-start-1 col-end-2 row-start-5 row-end-6 ' + this.alto_md
    },
    {
      url: 'images/tunel-carpiano.jpg',
      titulo: 'Tunel carpiano',
      descripcion: 'Servicio de fisioterapia para el tunel carpiano.',
      informacionAdicional: 'Información detallada del servicio 1...',
      class: 'col-start-2 col-end-3 row-start-5 row-end-7 ' + this.alto_lg
    },
    {
      url: 'images/lesion-nerviosa.jpg',
      titulo: 'Lesiones Nerviosas',
      descripcion: 'Servicio de fisioterapia para lesiones nerviosas.',
      informacionAdicional: 'Información detallada del servicio 4...',
      class: 'col-start-1 col-end-2 row-start-6 row-end-7 ' + this.alto_md
    },
    {
      url: 'images/masaje-relajante.jpg',
      titulo: 'Masaje Relajante',
      descripcion: 'Servicio de fisioterapia para el masaje relajante.',
      informacionAdicional: 'Información detallada del servicio 5...',
      class: 'col-start-3 col-end-4 row-start-6 row-end-7 ' + this.alto_md
    },
    {
      url: 'images/dolor-espalda.webp',
      titulo: 'Dolor de espalda',
      descripcion: 'Servicio de fisioterapia para el dolor de espalda.',
      informacionAdicional: 'Información detallada del servicio 6...',
      class: 'col-start-4 col-end-5 row-start-6 row-end-8 ' + this.alto_lg
    },
    {
      url: 'images/paralisis-cerebral.jpg',
      titulo: 'Paralisis Cerebral',
      descripcion: 'Servicio de fisioterapia para la paralisis cerebral.',
      informacionAdicional: 'Información detallada del servicio 7...',
      class: 'col-start-1 col-end-3 row-start-7 row-end-9 ' + this.alto_lg
    },
    {
      url: 'images/incontinencia-urinaria.jpg',
      titulo: 'Incontinencia Urinaria',
      descripcion: 'Servicio de fisioterapia para la incontenencia urinaria.',
      informacionAdicional: 'Información detallada del servicio 6...',
      class: 'col-start-3 col-end-4 row-start-7 row-end-8 ' + this.alto_md
    },
    {
      url: 'images/masaje-descontracturante.jpg',
      titulo: 'Masaje Descontracturante',
      descripcion: 'Servicio de fisioterapia para el masaje descontracturante.',
      informacionAdicional: 'Información detallada del servicio 7...',
      class: 'col-start-3 col-end-5 row-start-8 row-end-9 ' + this.alto_md
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
