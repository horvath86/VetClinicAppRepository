import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../Enviroments/enviroment';
import { MedicalRecord } from '../models/medicalRecord';
import { Observable } from 'rxjs';
import { MedicalRecordDTO } from '../models/medicalRecordDTO';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  private readonly apiUrl = `${enviroment.apiUrl}/medicalRecord`;

  constructor(private http: HttpClient)
  {

  }

  getMedicalRecords() : Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.apiUrl}`);
  }

  getMedicalRecordById(id: number) : Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${this.apiUrl}/${id}`);
  }

  createMedicalRecord(medicalRecord: MedicalRecordDTO) : Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(`${this.apiUrl}`, medicalRecord);
  }

  updateMedicalRecord(id: number, medicalRecord: MedicalRecordDTO) : Observable<MedicalRecord> {
    return this.http.put<MedicalRecord>(`${this.apiUrl}/${id}`, medicalRecord);
  }

  deleteMedicalRecord(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
