import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Add a new appointment
  async addAppointment(appointmentData: any) {
    try {
      const appointmentsRef = collection(this.firestore, 'appointments');
      const docRef = await addDoc(appointmentsRef, {
        ...appointmentData,
        createdAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding appointment:', error);
      return { success: false, error };
    }
  }

  // Check if time slot is available
  async isTimeSlotAvailable(date: string, time: string) {
    try {
      const appointmentsRef = collection(this.firestore, 'appointments');
      const q = query(
        appointmentsRef,
        where('date', '==', date),
        where('time', '==', time)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    } catch (error) {
      console.error('Error checking time slot:', error);
      return false;
    }
  }

  // Get appointments for a specific date
  async getAppointmentsByDate(date: string) {
    try {
      const appointmentsRef = collection(this.firestore, 'appointments');
      const q = query(appointmentsRef, where('date', '==', date));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting appointments:', error);
      return [];
    }
  }
}
