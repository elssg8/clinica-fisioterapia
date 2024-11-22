import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppointmentService } from '../../shared/appointment.service';

interface ImagenServicio {
  url: string;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})

export class ServiciosComponent {
  @ViewChild('carousel') carousel!: ElementRef;
  currentIndex = 0;
  servicioSeleccionado: ImagenServicio | null = null;

  constructor(private appointmentService: AppointmentService) { }

  imagenes: ImagenServicio[] = [
    {
      url: 'images/fracturas.jpg',
      titulo: 'Fracturas',
      descripcion: 'Servicio de fisioterapia para fracturas.',
    },
    {
      url: 'images/esguince.png',
      titulo: 'Esguinces',
      descripcion: 'Servicio de fisioterapia para esguinces.',
    },
    {
      url: 'images/pie-plano.jpg',
      titulo: 'Pie Plano',
      descripcion: 'Servicio de fisioterapia para pie plano.',
    },
    {
      url: 'images/tendinitis.jpg',
      titulo: 'Tendinitis',
      descripcion: 'Servicio de fisioterapia para la tendinitis.',
    },
    {
      url: 'images/tratamiento-post-covid.jpg',
      titulo: 'Tratamiento Post Covid',
      descripcion: 'Servicio de fisioterapia para el tratamiento post covid.',
    },
    {
      url: 'images/evento-cerebro-vascular-2.jpg',
      titulo: 'Evento cerebro vascular',
      descripcion: 'Servicio de fisioterapia para el evento cerebro vascular.',
    },
    {
      url: 'images/estimulacion-temprana.jpg',
      titulo: 'Estimulación temprana',
      descripcion: 'Servicio de fisioterapia para la estimulación temprana.',
    },
    {
      url: 'images/neurorehabilitacion.jpg',
      titulo: 'Neurorehabilitación',
      descripcion: 'Servicio de fisioterapia para la neurorehabilitación.',
    },
    {
      url: 'images/tratamiento-grasa.jpg',
      titulo: 'Tratamiento de grasa localizada',
      descripcion: 'Servicio de fisioterapia para el tratamiento de grasa localizada.',
    },
    {
      url: 'images/tunel-carpiano.jpg',
      titulo: 'Tunel carpiano',
      descripcion: 'Servicio de fisioterapia para el tunel carpiano.',
    },
    {
      url: 'images/lesion-nerviosa.jpg',
      titulo: 'Lesiones Nerviosas',
      descripcion: 'Servicio de fisioterapia para lesiones nerviosas.',
    },
    {
      url: 'images/masaje-relajante.jpg',
      titulo: 'Masaje Relajante',
      descripcion: 'Servicio de fisioterapia para el masaje relajante.',
    },
    {
      url: 'images/dolor-espalda.webp',
      titulo: 'Dolor de espalda',
      descripcion: 'Servicio de fisioterapia para el dolor de espalda.',
    },
    {
      url: 'images/paralisis-cerebral.jpg',
      titulo: 'Paralisis Cerebral',
      descripcion: 'Servicio de fisioterapia para la paralisis cerebral.',
    },
    {
      url: 'images/incontinencia-urinaria.jpg',
      titulo: 'Incontinencia Urinaria',
      descripcion: 'Servicio de fisioterapia para la incontenencia urinaria.',
    },
    {
      url: 'images/masaje-descontracturante.jpg',
      titulo: 'Masaje Descontracturante',
      descripcion: 'Servicio de fisioterapia para el masaje descontracturante.',
    }
  ];

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.next();
    }
    if (event.key === 'ArrowLeft') {
      this.prev();
    }
  }

  isMouseOverCarousel(event: MouseEvent): boolean {
    const rect = this.carousel.nativeElement.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.imagenes.length - 1) {
      this.currentIndex++;
    }
  }

  agendarCita() {
    this.appointmentService.setSelectedService(this.imagenes[this.currentIndex].titulo);
    console.log('Agendar cita para:', this.imagenes[this.currentIndex].titulo);
    const calendarComponent = document.getElementById('agendar-cita');
    if (calendarComponent) {
      const offset = calendarComponent.offsetTop - 25; // Ajuste por el margen
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  }

}
