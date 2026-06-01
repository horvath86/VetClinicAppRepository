import { Injectable } from '@angular/core';
import { enviroment } from '../../Enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '../models/prescription';
import { PrescriptionDTO } from '../models/prescriptionDTO';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private readonly apiUrl = `${enviroment.apiUrl}/prescription`;

  constructor(private http: HttpClient) {}

  getAllPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.apiUrl);
  }

  getPrescriptionById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/${id}`);
  }

  createPrescription(prescription: PrescriptionDTO): Observable<Prescription> {
    return this.http.post<Prescription>(this.apiUrl, prescription);
  }

  updatePrescription(id: number, prescription: PrescriptionDTO): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.apiUrl}/${id}`, prescription);
  }

  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPrescriptionsByMedicalRecord(medicalRecordId: number): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/ByMR/${medicalRecordId}`);
  }
}
