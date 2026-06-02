import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../Enviroments/enviroment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${enviroment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(credentials:any){
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', response.username);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }
}
