import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { JobApplication } from '../models/job-application.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  private apiUrl = `${environment.apiUrl}/JobApplications`; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getJobApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[] >(`${this.apiUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  getJobApplication(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()});
  }

  updateJobApplication(id: number, application: JobApplication): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, application, { headers: this.getAuthHeaders() });
  }

  createJobApplication(application: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.apiUrl, application, { headers: this.getAuthHeaders() });
  }
}
