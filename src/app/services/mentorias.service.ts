import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Mentoria {
  id?: number;
  titulo: string;
  descricao?: string;
  progresso?: number;
}

export interface MentoriaCreate {
  titulo: string;
  descricao?: string;
  progresso?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MentoriasService {
  private base = `${environment.apiUrl}mentorias`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Mentoria[]> {
    return this.http.get<Mentoria[]>(this.base);
  }

  create(payload: MentoriaCreate): Observable<Mentoria> {
    return this.http.post<Mentoria>(this.base, payload);
  }
}
