import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface NosotrosItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoggedIn = false;
  activeModal: NosotrosItem | null = null;
  showLoginModal: boolean = false;
  loginForm: FormGroup;
  error: string = '';
  showSuccessModal: boolean = false;
  showErrorModal: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

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

  showModal(item: NosotrosItem) {
    this.activeModal = item;
  }

  hideModal() {
    this.activeModal = null;
  }

  scrollToSection(elementId: string) {
    // Primero navegamos a la página principal si no estamos en ella
    if (this.router.url !== '/') {
      this.router.navigate(['/'], { fragment: elementId }).then(() => {
        // Esperamos un momento para que el DOM se actualice
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            const offset = element.offsetTop - 25;
            window.scrollTo({
              top: offset,
              behavior: 'smooth'
            });
          }
        }, 100);
      });
    } else {
      // Si ya estamos en la página principal, solo hacemos scroll
      const element = document.getElementById(elementId);
      if (element) {
        const offset = element.offsetTop - 25;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    }
  }

  scrollToTop() {
    this.router.navigate(['/admin']).then(() => {
      setTimeout(() => {
        const element = document.getElementById('admin');
        if (element) {
          const offset = element.offsetTop - 70;
          window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    });
  }

  toggleLoginModal() {
    this.showLoginModal = !this.showLoginModal;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.showLoginModal = false;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const success = await this.authService.login(email, password);
        if (success) {
          this.showLoginModal = false;
          this.loginForm.reset();
          this.showSuccessModal = true; // Mostrar modal de éxito
          setTimeout(() => {
            this.showSuccessModal = false;
            this.router.navigate(['/']);
          }, 2000);
        } else {
          this.error = 'Credenciales inválidas';
          this.showErrorModal = true; // Mostrar modal de error
        }
      } catch (error) {
        console.error('Login error:', error);
        this.error = 'Error al iniciar sesión';
        this.showErrorModal = true; // Mostrar modal de error
      }
    }
  }

}
