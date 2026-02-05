import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core/config/app-config';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseRepository {
  protected readonly apiUrl = inject(APP_CONFIG).apiUrl;

  constructor(protected http: HttpClient) { }

<<<<<<< HEAD
  protected get<T>(endpoint: string, options?: { headers?: HttpHeaders }): Observable<T> {
    const defaultHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const headers = options?.headers ? options.headers : defaultHeaders;
=======
  protected getAuthHeaders(extra?: HttpHeaders): HttpHeaders {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return extra || new HttpHeaders();
    }

    if (!extra) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }

    return extra.set('Authorization', `Bearer ${token}`);
  }

  protected get<T>(endpoint: string, options?: { headers?: HttpHeaders }): Observable<T> {
    const headers = this.getAuthHeaders(options?.headers);
>>>>>>> 4e5270536f5d0f30339711d96a74ecf628260170
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers });
  }

  protected post<T>(endpoint: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
<<<<<<< HEAD
    const defaultHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const headers = options?.headers ? options.headers : defaultHeaders;
=======
    const headers = this.getAuthHeaders(options?.headers);
>>>>>>> 4e5270536f5d0f30339711d96a74ecf628260170
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, { headers });
  }

  protected put<T>(endpoint: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
<<<<<<< HEAD
    const defaultHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const headers = options?.headers ? options.headers : defaultHeaders;
=======
    const headers = this.getAuthHeaders(options?.headers);
>>>>>>> 4e5270536f5d0f30339711d96a74ecf628260170
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, body, { headers });
  }

  protected delete<T>(endpoint: string, options?: { headers?: HttpHeaders }): Observable<T> {
<<<<<<< HEAD
    const defaultHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const headers = options?.headers ? options.headers : defaultHeaders;
=======
    const headers = this.getAuthHeaders(options?.headers);
>>>>>>> 4e5270536f5d0f30339711d96a74ecf628260170
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers });
  }
}
