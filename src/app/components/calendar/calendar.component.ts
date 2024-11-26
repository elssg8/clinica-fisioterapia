import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../shared/appointment.service';
import { FirebaseService } from '../../shared/firebase.service';


interface CalendarDay {
  date: string;
  day: number;
  holiday: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  appointmentCount: number;
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
  availableTimes: string[] = [];
  availableTimesByDay: Record<number, string[]> = {
    0: ['10:00', '11:00', '12:00', '13:00', '14:00', '16:00', '17:00', '18:00', '19:00'], // Domingo - Lunes
    1: ['10:00', '11:00', '12:00', '13:00'], // Lunes - Martes
    2: ['10:00', '11:00', '12:00', '13:00', '14:00', '16:00', '17:00', '18:00', '19:00'], // Martes - Miércoles
    3: ['10:00', '11:00', '12:00', '13:00'], // Miércoles - Jueves
    4: ['10:00', '11:00', '12:00', '13:00'], // Jueves - Viernes
    5: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'], // Viernes - Sábado
    6: [], // Sábado - Domingo (cerrado)
  };
  bookedTimes: string[] = [];
  showModal = false;
  modalTitle = '';
  modalMessage = '';

  // Lista de días festivos - esto podría venir de una API o base de datos
  holidays: Record<string, string> = {
    '2024-02-01': 'Dark Chocolate Day',
    '2024-02-02': 'Groundhog Day',
    // ... añadir más días festivos según necesites
  };

  servicios: string[] = [
    'Fracturas',
    'Esguinces',
    'Pie Plano',
    'Tendinitis',
    'Tratamiento Post Covid',
    'Evento cerebro vascular',
    'Estimulación temprana',
    'Neurorehabilitación',
    'Tratamiento de grasa localizada',
    'Masaje Relajante',
    'Dolor de espalda',
    'Paralisis Cerebral',
    'Incontinencia Urinaria',
    'Masaje Descontracturante',
    'Tunel carpiano',
    'Lesiones Nerviosas'
  ];

  appointmentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    service: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });
  window: any;

  constructor(private appointmentService: AppointmentService, private firebaseService: FirebaseService) {
    this.appointmentService.selectedService$.subscribe(service => {
      if (service) {
        this.appointmentForm.get('service')?.setValue(service);
      }
    });
  }

  async ngOnInit() {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.updateMonthName();
    await this.generateCalendar();
  }

  async generateCalendar() {
    this.days = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    // Obtener todas las citas del mes de una sola vez
    const startDate = new Date(this.currentYear, this.currentMonth - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(this.currentYear, this.currentMonth + 2, 0).toISOString().split('T')[0];
    const monthAppointments = await this.firebaseService.getAppointmentsForDateRange(startDate, endDate);

    // Crear un mapa de fechas con citas para búsqueda rápida
    // Crea un mapa que cuenta cuántas citas hay en cada fecha
    const appointmentsByDate = new Map<string, number>();
    monthAppointments.forEach((appointment: any) => {
      // Obtiene el número actual de citas para esa fecha (0 si no hay ninguna)
      const count = appointmentsByDate.get(appointment.date) || 0;
      // Incrementa el contador de citas para esa fecha
      appointmentsByDate.set(appointment.date, count + 1);
    });

    // Días del mes anterior
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(this.currentYear, this.currentMonth, -i);
      const dateString = prevDate.toISOString().split('T')[0];

      this.days.push({
        date: dateString,
        day: prevDate.getDate(),
        holiday: this.holidays[dateString] || 'No Holiday',
        isToday: this.isToday(prevDate),
        isCurrentMonth: false,
        appointmentCount: appointmentsByDate.get(dateString) || 0
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
        isCurrentMonth: true,
        appointmentCount: appointmentsByDate.get(dateString) || 0
      });
    }

    // Días del mes siguiente
    const remainingDays = 35 - this.days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(this.currentYear, this.currentMonth + 1, i);
      const dateString = nextDate.toISOString().split('T')[0];

      this.days.push({
        date: dateString,
        day: nextDate.getDate(),
        holiday: this.holidays[dateString] || 'No Holiday',
        isToday: this.isToday(nextDate),
        isCurrentMonth: false,
        appointmentCount: appointmentsByDate.get(dateString) || 0
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

  async setDate(day: any) {
    this.selectedDate = new Date(day.date + 'T00:00:00');
    this.appointmentForm.get('date')?.setValue(this.selectedDate.toISOString().split('T')[0]);

    // Obtener las citas para esta fecha y actualizar los horarios disponibles
    await this.updateAvailableTimes(this.selectedDate.toISOString().split('T')[0]);
  }

  async updateAvailableTimes(date: string) {
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    
    // Actualizar availableTimes según el día de la semana
    this.availableTimes = this.availableTimesByDay[dayOfWeek];
    
    // Obtener las citas para esta fecha
    const appointments = await this.firebaseService.getAppointmentsByDate(date);
    
    // Obtener los horarios ya reservados
    this.bookedTimes = appointments.map((app: any) => app.time);
    
    // Resetear el valor del tiempo seleccionado
    this.appointmentForm.get('time')?.setValue('');
  }

  // Método helper para verificar si un horario está disponible
  isTimeAvailable(time: string): boolean {
    return !this.bookedTimes.includes(time);
  }

  cancelAppointment() {
    this.appointmentForm.reset();
  }

  async scheduleAppointment() {
    if (this.appointmentForm.valid) {
      try {
        const formData = this.appointmentForm.value;
  
        if (!formData.date || !formData.time) {
          this.showModalMessage('Error', 'Por favor seleccione fecha y hora para la cita');
          return;
        }
  
        const isAvailable = await this.firebaseService.isTimeSlotAvailable(
          formData.date as string,
          formData.time as string
        );
  
        if (!isAvailable) {
          this.showModalMessage('Horario no disponible', 'Este horario ya no está disponible. Por favor seleccione otro.');
          await this.updateAvailableTimes(formData.date as string);
          return;
        }
  
        await this.firebaseService.addRequest(formData);
  
        this.showModalMessage('¡Éxito!', '¡Solicitud enviada exitosamente! Espere la confirmación.');
        this.appointmentForm.reset();
        await this.updateAvailableTimes(formData.date as string);
  
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        this.showModalMessage('Error', 'Error al enviar la solicitud. Por favor intente nuevamente.');
      }
    } else {
      this.showModalMessage('Error', 'Por favor complete todos los campos requeridos');
    }
  }

  // Agregar estos métodos
  showModalMessage(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
