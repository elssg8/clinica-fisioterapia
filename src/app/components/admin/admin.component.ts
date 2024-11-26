import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../shared/firebase.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface ModalConfig {
  title: string;
  message: string;
  success: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  pendingRequests: any[] = [];
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  filterForm: FormGroup;
  showModal = false;
  modalConfig: ModalConfig = {
    title: '',
    message: '',
    success: true
  };

  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      filterType: ['all'],
      selectedDate: [new Date().toISOString().split('T')[0]],
      showCompleted: [true]
    });
  }

  async ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await this.loadRequests();
    await this.loadAllAppointments();

    // Suscribirse a cambios en el formulario
    this.filterForm.valueChanges.subscribe(() => {
      this.updateDateFilter();
    });
  }

  async loadRequests() {
      this.pendingRequests = await this.firebaseService.getRequests();
    }
  
    async loadAllAppointments() {
      this.appointments = await this.firebaseService.getAllAppointments();
      this.updateDateFilter();
    }
  
    updateDateFilter() {
      const { filterType, selectedDate, showCompleted } = this.filterForm.value;
      const selectedDateObj = new Date(selectedDate);
      let filtered = [...this.appointments];
      
      // Primero aplicamos el filtro de fecha
      switch (filterType) {
        case 'all':
          break;
        case 'day':
          filtered = filtered.filter(app => {
            const appDate = new Date(app.date);
            return this.isSameDay(appDate, selectedDateObj);
          });
          break;
        case 'week':
          filtered = filtered.filter(app => {
            const appDate = new Date(app.date);
            return this.isInSameWeek(appDate, selectedDateObj);
          });
          break;
        case 'month':
          filtered = filtered.filter(app => {
            const appDate = new Date(app.date);
            return appDate.getMonth() === selectedDateObj.getMonth() &&
                   appDate.getFullYear() === selectedDateObj.getFullYear();
          });
          break;
      }
    
      // Luego aplicamos el filtro de citas completadas
      if (!showCompleted) {
        filtered = filtered.filter(app => {
          const appointmentDate = new Date(`${app.date} ${app.time}`);
          const now = new Date();
          return appointmentDate >= now;
        });
      }
    
      // Ordenar por fecha y hora
      this.filteredAppointments = filtered.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
    }
  
    isSameDay(date1: Date, date2: Date): boolean {
      return date1.getDate() === date2.getDate() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getFullYear() === date2.getFullYear();
    }
  
    isInSameWeek(date1: Date, date2: Date): boolean {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDay = new Date(date2.getTime() - (date2.getDay() * oneDay));
      const lastDay = new Date(firstDay.getTime() + (6 * oneDay));
      return date1 >= firstDay && date1 <= lastDay;
    }
  
    getAppointmentStatus(date: string, time: string): string {
      const appointmentDate = new Date(`${date} ${time}`);
      const now = new Date();

      if (appointmentDate < now) {
        return 'Completada';
      } else {
        const today = new Date();
        // Comparar directamente con today usando isSameDay
        if (this.isSameDay(appointmentDate, today)) {
          return 'Hoy';
        }
        return 'Próxima';
      }
    }
  
    getStatusClass(date: string, time: string): string {
      const status = this.getAppointmentStatus(date, time);
      switch (status) {
        case 'Completada':
          return 'bg-gray-200 text-gray-700';
        case 'Hoy':
          return 'bg-green-100 text-green-800';
        default:
          return 'bg-blue-100 text-blue-800';
      }
    }
  
    isToday(date: Date): boolean {
      const today = new Date();
      return this.isSameDay(date, today);
    }
  
    
  async acceptRequest(requestId: string) {
    const request = this.pendingRequests.find(r => r.id === requestId);
    if (request) {
      const isAvailable = await this.firebaseService.isTimeSlotAvailable(
        request.date,
        request.time
      );

      if (!isAvailable) {
        this.showModalMessage({
          title: 'Horario No Disponible',
          message: 'Este horario ya no está disponible',
          success: false
        });
        return;
      }

      try {
        await this.firebaseService.addAppointment({
          name: request.name,
          service: request.service,
          date: request.date,
          time: request.time,
          phone: request.phone
        });

        await this.firebaseService.updateRequestStatus(requestId, 'accepted');
        await this.loadRequests();
        await this.loadAllAppointments();

        this.showModalMessage({
          title: 'Cita Aceptada',
          message: 'La cita ha sido agendada correctamente',
          success: true
        });
      } catch (error) {
        this.showModalMessage({
          title: 'Error',
          message: 'Ocurrió un error al agendar la cita',
          success: false
        });
      }
    }
  }

  async rejectRequest(requestId: string) {
    try {
      await this.firebaseService.updateRequestStatus(requestId, 'rejected');
      await this.loadRequests();
      
      this.showModalMessage({
        title: 'Cita Rechazada',
        message: 'La solicitud ha sido rechazada',
        success: false
      });
    } catch (error) {
      this.showModalMessage({
        title: 'Error',
        message: 'Ocurrió un error al rechazar la solicitud',
        success: false
      });
    }
  }

  showModalMessage(config: ModalConfig) {
    this.modalConfig = config;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
