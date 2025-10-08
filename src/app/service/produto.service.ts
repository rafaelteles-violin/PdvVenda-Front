// produto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}Produto`);
  }

  getProdutoId(id: string): Observable<any> {
    return this.http.get<any[]>(`${environment.urlApi}Produto/${id}`);
  }

  adicionarProduto(obj: any) {
    return this.http.post(`${environment.urlApi}produto`, obj, {

    });
  }

  atualizarProduto(obj: any) {
    return this.http.put(`${environment.urlApi}produto`, obj, {

    });
  }

}
