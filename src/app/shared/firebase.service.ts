import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where, updateDoc, doc } from '@angular/fire/firestore';

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

  async getAppointmentsForDateRange(startDate: string, endDate: string) {
    const appointmentsRef = collection(this.firestore, 'appointments');
    const q = query(
      appointmentsRef,
      where('date', '>=', startDate),
      where('date', '<=', endDate)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }

  async addRequest(requestData: any) {
    try {
      const requestsRef = collection(this.firestore, 'requests');
      const docRef = await addDoc(requestsRef, {
        ...requestData,
        status: 'pending',
        createdAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding request:', error);
      return { success: false, error };
    }
  }
  
  async getRequests() {
    try {
      const requestsRef = collection(this.firestore, 'requests');
      const q = query(requestsRef, where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting requests:', error);
      return [];
    }
  }
  
  async updateRequestStatus(requestId: string, status: 'accepted' | 'rejected') {
    try {
      const requestRef = doc(this.firestore, 'requests', requestId);
      await updateDoc(requestRef, { status });
      return true;
    } catch (error) {
      console.error('Error updating request:', error);
      return false;
    }
  }

  async getAllAppointments() {
    try {
      const appointmentsRef = collection(this.firestore, 'appointments');
      const querySnapshot = await getDocs(appointmentsRef);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting all appointments:', error);
      return [];
    }
  }
}
