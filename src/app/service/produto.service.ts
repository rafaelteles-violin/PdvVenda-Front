// produto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { LojaContextService } from './LojaContextService';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient,
    private lojaContext: LojaContextService,
    private storage: StorageService) { }

  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}produto/listaProdutos/${this.lojaContext.lojaId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getToken()}`,
      }),
    });
  }

  getProdutoId(id: string): Observable<any> {
    return this.http.get(`${environment.urlApi}produto/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getToken()}`,
      }),
    });
  }

  adicionarProduto(obj: any) {
    obj.lojaId = this.lojaContext.lojaId;
    return this.http.post(`${environment.urlApi}produto`, obj, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getToken()}`,
      }),
    });
  }

  atualizarProduto(obj: any) {
    obj.lojaId = this.lojaContext.lojaId;
    return this.http.put(`${environment.urlApi}produto`, obj, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getToken()}`,
      }),
    });
  }

  enviarVenda(obj: any) {
    obj.lojaId = this.lojaContext.lojaId;
    return this.http.post(`${environment.urlApi}venda`, obj, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getToken()}`,
      }),
    });
  }

  obterVendas(obj: any) {
    obj.lojaId = this.lojaContext.lojaId;
    return this.http.post(`${environment.urlApi}venda/obtervendapordata`, obj, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getToken()}`,
      }),
    });
  }

}
