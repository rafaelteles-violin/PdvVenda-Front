// produto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// interface Produto {
//   id: string;
//   nome: string;
//   valorTxt: string;
//   valor: number;
//   codigo: string;
// }

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:5087/Produto'; // URL da sua API

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
