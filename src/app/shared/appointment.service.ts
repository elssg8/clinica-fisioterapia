import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private selectedServiceSubject = new BehaviorSubject<string>('');
  selectedService$ = this.selectedServiceSubject.asObservable();

  setSelectedService(service: string) {
    this.selectedServiceSubject.next(service);
  }
}
