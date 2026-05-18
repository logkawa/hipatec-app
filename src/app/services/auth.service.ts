import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(role: 'estudantes' | 'mentoras', email: string, senha: string): Observable<{ token?: string; message?: string }> {
    const endpoint = role === 'estudantes' ? 'estudantes/login' : 'mentoras/login';
    const url = `${environment.apiUrl}${endpoint}`;
    const params = new HttpParams().set('email', email).set('senha', senha);
    return this.http.post<{ token?: string; message?: string }>(url, {}, { params });
  }

  saveToken(token: string) {
    try { localStorage.setItem('auth_token', token); } catch { /* ignore on private mode */ }
  }

  getToken(): string | null {
    try { return localStorage.getItem('auth_token'); } catch { return null; }
  }

  logout() {
    try { localStorage.removeItem('auth_token'); } catch { /* ignore */ }
  }
}
