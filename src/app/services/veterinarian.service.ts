import { Injectable } from '@angular/core';
import { enviroment } from '../../Enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veterinarian } from '../models/veterinarian';
import { VeterinarianDTO } from '../models/veterinarianDTO';

@Injectable({
  providedIn: 'root'
})
export class VeterinarianService {

  private readonly apiUrl = `${enviroment.apiUrl}/veterinarian`;

  constructor(private http: HttpClient) { 

  }

  getVeterinarians(): Observable<Veterinarian[]> {
      return this.http.get<Veterinarian[]>(`${this.apiUrl}`);
  }

  GetVeterinarianById(id: number): Observable<Veterinarian> {
    return this.http.get<Veterinarian>(`${this.apiUrl}/${id}`);
  }

  createVeterinarian(veterinarian: VeterinarianDTO): Observable<Veterinarian> {
    return this.http.post<Veterinarian>(`${this.apiUrl}`, veterinarian);
  }

  updateVeterinarian(id: number, veterinarian: VeterinarianDTO): Observable<Veterinarian> {
    return this.http.put<Veterinarian>(`${this.apiUrl}/${id}`, veterinarian);
  }

  deleteVeterinarian(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
