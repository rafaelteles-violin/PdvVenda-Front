import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { LojaContextService } from './LojaContextService';
import { environment } from '../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor(public http: HttpClient,
        private storage: StorageService,
        private lojaContext: LojaContextService) { }


    Autenticar(obj: any) {
        return this.http.post(`${environment.urlApi}Auth/login`, obj, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.storage.getToken()}`,
            }),
        });
    }

    obterVendedores() {
        return this.http.get(`${environment.urlApi}auth/obterVendedores/${this.lojaContext.lojaId}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.storage.getToken()}`,
            }),
        });
    }

    obterPermissoes() {
        return this.http.get(`${environment.urlApi}auth/obterPermissoes`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.storage.getToken()}`,
            }),
        });
    }

    adicionarUsuario(obj: any) {
        obj.LojaId = this.lojaContext.lojaId
        return this.http.post(`${environment.urlApi}Auth/Registrar`, obj, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.storage.getToken()}`,
            }),
        });
    }

    atualizarSenha(obj: any) {
        return this.http.post(`${environment.urlApi}Auth/UpdatePassword`, obj, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.storage.getToken()}`,
            }),
        });
    }

    obterUsuarios() {
        return this.http.get(`${environment.urlApi}auth/obterUsuarios/${this.lojaContext.lojaId}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.storage.getToken()}`,
            }),
        });
    }

    removerConta(id: number) {
        return this.http.delete(`${environment.urlApi}auth/${id}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.storage.getToken()}`,
            }),
        });
    }

    validarPermissao(obj: any) {
        return this.http.post(`${environment.urlApi}Auth/validarPermissao`, obj, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.storage.getToken()}`,
            }),
        });
    }
}
