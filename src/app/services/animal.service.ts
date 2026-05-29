import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../Enviroments/enviroment';
import { Animal } from '../models/animal';
import { Observable } from 'rxjs';
import { AnimalDTO } from '../models/animalDTO';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private readonly apiUrl = `${enviroment.apiUrl}/animal`;

  constructor(private http: HttpClient) { }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}`);
  }

  GetAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }

  CreateAnimal(animal: AnimalDTO): Observable<Animal> {
    return this.http.post<Animal>(`${this.apiUrl}`, animal);
  }

  DeleteAnimal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  UpdateAnimal(id: number, animal: AnimalDTO): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/${id}`, animal);
  }
}

  
