import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';  // Import TokenService

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:3000'; // Base URL for API requests

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Helper method to create HTTP headers with optional parameters
  // Helper method to create HTTP headers with optional parameters
  private getHeaders(options?: { [key: string]: string }): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Add token to headers if available
    const token = this.tokenService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (options) {
      Object.keys(options).forEach(key => {
        headers = headers.set(key, options[key]);
      });
    }

    return headers;
  }
  // GET request
  get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders(), params: httpParams });
  }

  // POST request
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.getHeaders() });
  }

  // PUT request
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.getHeaders() });
  }

  // DELETE request
  delete<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders(), params: httpParams });
  }
}
