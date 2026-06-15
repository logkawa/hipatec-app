import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MentoraCadastro {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
}

@Injectable({
  providedIn: 'root'
})
export class MentoraService {
  constructor(private http: HttpClient) {}

  create(mentora: MentoraCadastro): Observable<{ message?: string }> {
    const url = `${environment.apiUrl}mentoras`;
    return this.http.post<{ message?: string }>(url, mentora);
  }
  getPerfil(id: number): Observable<any> {
    const url = `${environment.apiUrl}mentoras/${id}`;
    return this.http.get(url);
  }
}
