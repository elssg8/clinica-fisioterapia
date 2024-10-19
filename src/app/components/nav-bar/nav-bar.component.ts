import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'] // Cambié "styleUrl" por "styleUrls" (plural).
})
export class NavBarComponent {
  isLoggedIn = false;  // Para manejar el estado de sesión.
  isHovered = false; // Para manejar el estado de hover.

  toggleSession() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  toggleHover() {
    this.isHovered = !this.isHovered;
  }
}
