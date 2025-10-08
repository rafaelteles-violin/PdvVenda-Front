import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-list-produto',
  standalone: true,
  imports: [RouterModule, DemoFlexyModule, CommonModule, HttpClientModule],
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.scss']
})
export class ListProdutoComponent implements OnInit {

  produtos: any[] = [];
  produtosFiltrados: any[] = [];

  constructor(private http: HttpClient,
    private router: Router,
    private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getProdutos();
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.produtosFiltrados = data;
      },
      error: (err) => console.error("Erro ao carregar produtos", err)
    });
  }

  filtrarProdutos(termo: string) {
    termo = termo.toLowerCase();
    this.produtosFiltrados = this.produtos.filter(p =>
      (p.codigo && p.codigo.toString().toLowerCase().includes(termo)) ||
      (p.nome && p.nome.toLowerCase().includes(termo))
    );
  }

  removerProduto(codigo: number): void {
    console.log(`Remover produto com código: ${codigo}`);
  }
}




