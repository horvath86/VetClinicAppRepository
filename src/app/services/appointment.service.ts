import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../Enviroments/enviroment';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import { AppointmentDTO } from '../models/appointmentDTO';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private readonly apiUrl = `${enviroment.apiUrl}/appointment`;

  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentById(id: number): Observable<Appointment>{
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  createAppointment(appointment : AppointmentDTO): Observable<Appointment>{
    return this.http.post<Appointment>(this.apiUrl,appointment);
  }

  updateAppointment(id: number, appointment: AppointmentDTO): Observable<Appointment>{
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
