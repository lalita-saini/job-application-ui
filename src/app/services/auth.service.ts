import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterUser } from '../models/register-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string, role: string }> {
    return this.http.post<{ token: string, role: string }>(`${this.authUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token); 
      })
    );
  }

  register(user: RegisterUser): Observable<{ token: string, role: string }> {
      return this.http.post<{ token: string, role: string }>(`${this.authUrl}/register`, user);
    }

  logout() {
    localStorage.removeItem('authToken'); 
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); 
  }
}