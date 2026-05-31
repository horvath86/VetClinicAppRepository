import { Injectable } from '@angular/core';
import { enviroment } from '../../Enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Procedure } from '../models/procedure';
import { ProcedureDTO } from '../models/procedureDTO';



@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  private readonly apiUrl = `${enviroment.apiUrl}/procedure`;

  constructor(private http: HttpClient) { }

  getAllProcedures():Observable<Procedure[]>{
    return this.http.get<Procedure[]>(this.apiUrl);
  }

  getProcedureById(id:number): Observable<Procedure> {
    return this.http.get<Procedure>(`${this.apiUrl}/${id}`);
  }

  createProcedure(procedure: ProcedureDTO): Observable<Procedure>{
    return this.http.post<Procedure>(this.apiUrl,procedure);
  }

  updateProcedure(id: number, procedure : ProcedureDTO): Observable<Procedure>{
    return this.http.put<Procedure>(`${this.apiUrl}/${id}`, procedure);
  }

  deleteProcedure(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
