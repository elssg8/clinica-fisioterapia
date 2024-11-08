import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';


interface CalendarDay {
  date: string;
  day: number;
  holiday: string;
  isToday: boolean;
  isCurrentMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  days: CalendarDay[] = [];
  monthName: string = '';
  selectedDate: Date | null = null;

  // Lista de días festivos - esto podría venir de una API o base de datos
  holidays: Record<string, string> = {
    '2024-02-01': 'Dark Chocolate Day',
    '2024-02-02': 'Groundhog Day',
    // ... añadir más días festivos según necesites
  };

  appointmentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    service: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  });
window: any;

  ngOnInit() {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.updateMonthName();
    this.generateCalendar();
  }

  generateCalendar() {
    this.days = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    // Días del mes anterior
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(this.currentYear, this.currentMonth, -i);
      this.days.push({
        date: prevDate.toISOString().split('T')[0],
        day: prevDate.getDate(),
        holiday: this.holidays[prevDate.toISOString().split('T')[0]] || 'No Holiday',
        isToday: this.isToday(prevDate),
        isCurrentMonth: false // Días del mes anterior
      });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, i);
      const dateString = currentDate.toISOString().split('T')[0];

      this.days.push({
        date: dateString,
        day: i,
        holiday: this.holidays[dateString] || 'No Holiday',
        isToday: this.isToday(currentDate),
        isCurrentMonth: true // Días del mes actual
      });
    }

    // Días del mes siguiente
    const remainingDays = 35 - this.days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(this.currentYear, this.currentMonth + 1, i);
      this.days.push({
        date: nextDate.toISOString().split('T')[0],
        day: nextDate.getDate(),
        holiday: this.holidays[nextDate.toISOString().split('T')[0]] || 'No Holiday',
        isToday: this.isToday(nextDate),
        isCurrentMonth: false // Días del mes siguiente
      });
    }
  }

  updateMonthName() {
    const date = new Date(this.currentYear, this.currentMonth, 1);
    this.monthName = date.toLocaleString('es-ES', { month: 'long' }).charAt(0).toUpperCase() + date.toLocaleString('es-ES', { month: 'long' }).slice(1);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateMonthName();
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateMonthName();
    this.generateCalendar();
  }

  setDate(day: any) {
    this.selectedDate = new Date(day.date + 'T00:00:00');
    this.appointmentForm.get('date')?.setValue(this.selectedDate.toISOString().split('T')[0]);
  }

  cancelAppointment() {
    this.appointmentForm.reset();
  }

  scheduleAppointment() {
    // Aquí implementarías la lógica para guardar la cita
    console.log(this.appointmentForm.value);
  }
}
