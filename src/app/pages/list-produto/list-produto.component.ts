// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';  // Importe RouterModule
// import { DemoFlexyModule } from 'src/app/demo-flexy-module'; // Caminho correto para o módulo


// @Component({
//   selector: 'app-list-produto',
//   standalone: true,
//   imports: [RouterModule, DemoFlexyModule, CommonModule],
//   templateUrl: './list-produto.component.html',
//   styleUrls: ['./list-produto.component.scss']
// })
// export class ListProdutoComponent {

//   produtos: any = [];

//   ngOnInit(){
//   this.getProdutos();
//   console.log(this.produtos)
// }
 
// getProdutos(){
//   this.produtos =   [
//     {
//       codigo: 1,
//       nome: 'Chocolate',
//       valorVenda: 20,
//       imagem: 'assets/images/boloexemplo.png',
//     },
//     {
//       codigo: 12,
//       nome: 'Abacaxi',
//       valorVenda: 25,
//       imagem: 'assets/images/boloexemplo.png',
//     },
//     // Adicione mais produtos conforme necessário
//   ];
// }


//   removerProduto(codigo: number): void {
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getProdutos();
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  getProdutos() {
    this.http.get<any[]>('http://localhost:5087/Produto')
      .subscribe({
        next: (data) => {
          this.produtos = data;
          this.produtosFiltrados = data; // inicializa filtrados
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




