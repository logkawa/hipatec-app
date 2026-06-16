import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Perfil {
    nome: string;
    biografia?: string;
    usuario: string;
    num_posts?: number;
    num_seguidores?: number;
    num_seguindo?: number;
    pfp?: string;
    background?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PerfilService {

    constructor(private http: HttpClient) { }

    getPerfil(role: string, id: number) {
        return this.http.get(
            `${environment.apiUrl}perfil/${role}/${id}`
        );
    }

    updatePerfil(role: string, id: number, formData: FormData) {
        return this.http.put(
            `${environment.apiUrl}perfil/${role}/${id}`,
            formData
        );
    }

}
