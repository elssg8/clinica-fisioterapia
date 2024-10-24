import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  servicios = [
    {
      titulo: 'Estimulación Temprana',
      imagen: 'images/babies.jpg',
      descripcion: 'La estimulación temprana es un conjunto de actividades que se realizan en las primeras etapas de la vida, con el objetivo de promover el desarrollo físico, mental y emocional del niño. Estas actividades suelen ser supervisadas por profesionales de la salud, como pediatras, psicólogos y terapeutas.'
    },
    {
      titulo: 'Neurorehabilitación',
      imagen: 'images/neuro.jpg',
      descripcion: 'La neurorehabilitación es un conjunto de actividades que se realizan para ayudar a las personas que han sufrido un accidente cerebrovascular o una enfermedad neurológica a recuperar sus habilidades y funciones. Estas actividades suelen ser supervisadas por profesionales de la salud, como neurologos, psicólogos y terapeutas.'
    },
    {
      titulo: 'Esguinces',
      imagen: 'assets/images/esguinces.jpg',
      descripcion: 'Los esguinces son lesiones comunes que afectan a los músculos y ligamentos. Pueden ser causados por una rápida y fuerte extensión o rotación del miembro afectado, como por ejemplo, un golpe o una caída. Los esguinces pueden ser leves, moderados o graves, dependiendo de la severidad de la lesión.'
    },
    {
      titulo: 'Fracturas',
      imagen: 'assets/images/fracturas.jpg',
      descripcion: 'Las fracturas son lesiones que afectan a los huesos. Pueden ser causadas por una fuerza externa, como una caída, un golpe o una fuerza repentina. Las fracturas pueden ser simples, con un solo fragmento de hueso roto, o complejas, con múltiples fragmentos de hueso roto.'
    },
    {
      titulo: 'Dolor de espalda',
      imagen: 'images/backache.jpg',
      descripcion: 'Los dolores de espalda son una variedad de dolores que afectan a la zona media y baja de la espalda. Pueden ser causados por una variedad de factores, como una mala postura, una lesión, una enfermedad o una herida.'
    },
    {
      titulo: 'Dolor de rodilla',
      imagen: 'images/knee-pain.jpg',
      descripcion: 'El dolor de rodilla es una variedad de dolores que afectan a la rodilla. Pueden ser causados por una variedad de factores, como una lesión, una enfermedad o una herida.'
    },
    {
      titulo: 'Paralisis cerebral',
      imagen: 'assets/images/paralisis-cerebral.jpg',
      descripcion: 'La parálisis cerebral es una condición médica que afecta a la capacidad de movimiento y coordinación del cuerpo. Puede ser causada por una variedad de factores, como una lesión cerebral, una enfermedad neurológica o una herida.'
    },
    {
      titulo: 'Lesiones nerviosas',
      imagen: 'assets/images/lesiones-nerviosas.jpg',
      descripcion: 'Las lesiones nerviosas son lesiones que afectan a los nervios. Pueden ser causadas por una variedad de factores, como una lesión, una enfermedad o una herida.'
    },
    {
      titulo: 'Evento vascular cerebral',
      imagen: 'assets/images/evento-vascular-cerebral.jpg',
      descripcion: 'Los eventos vasculares cerebrales son eventos que afectan a los vasos sanguíneos del cerebro. Pueden ser causados por una variedad de factores, como una lesión, una enfermedad o una herida.'
    },
    {
      titulo: 'Reducción de grasa localizada',
      imagen: 'assets/images/reduccion-grasa-localizada.jpg',
      descripcion: 'La reducción de grasa localizada es un conjunto de actividades que se realizan para ayudar a las personas a reducir la grasa localizada en una zona del cuerpo. Puede ser causada por una variedad de factores, como una dieta, una actividad física y una terapia.'
    },
    {
      titulo: 'Masaje relajante',
      imagen: 'assets/images/masaje-relajante.jpg',
      descripcion: 'El masaje relajante es un tipo de masaje que se realiza para ayudar a las personas a reducir el estrés y la ansiedad. Puede ser causado por una variedad de factores, como una dieta, una actividad física y una terapia.'
    },
    {
      titulo: 'Masaje descontracturante',
      imagen: 'assets/images/masaje-descontracturante.jpg',
      descripcion: 'El masaje descontracturante es un tipo de masaje que se realiza para ayudar a las personas a reducir el estrés y la ansiedad. Puede ser causado por una variedad de factores, como una dieta, una actividad física y una terapia.'
    },
    {
      titulo: 'Pie plano',
      imagen: 'assets/images/pie-plano.jpg',
      descripcion: 'El pie plano es una condición médica que afecta a la forma y la función del pie. Puede ser causada por una variedad de factores, como una lesión, una enfermedad o una herida.'
    },
    {
      titulo: 'Tratamiento postcovid',
      imagen: 'assets/images/tratamiento-postcovid.jpg',
      descripcion: 'El tratamiento postcovid es un conjunto de actividades que se realizan para ayudar a las personas que han sufrido COVID-19 a recuperar sus habilidades y funciones. Puede ser causado por una variedad de factores, como una dieta, una actividad física y una terapia.'
    },
    {
      titulo: 'Tendinitis',
      imagen: 'assets/images/tendinitis.jpg',
      descripcion: 'La tendinitis es una condición médica que afecta a los tendones. Puede ser causada por una variedad de factores, como una lesión, una enfermedad o una herida.'
    },
    {
      titulo: 'Túnel del carpo',
      imagen: 'assets/images/tunel-carpo.jpg',
      descripcion: 'El túnel del carpo es una condición médica que afecta a la zona del carpo. Puede ser causada por una variedad de factores, como una lesión, una enfermedad o una herida.'
    }
  ];

  currentIndex = 0;

  @ViewChild('carousel')
  carousel!: ElementRef;

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (this.isMouseOverCarousel(event)) {
      event.preventDefault();
      if (event.deltaY > 0) {
        this.next();
      } else {
        this.prev();
      }
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
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
  }

  next() {
    this.currentIndex = Math.min(this.currentIndex + 1, this.servicios.length - 4);
  }
}
