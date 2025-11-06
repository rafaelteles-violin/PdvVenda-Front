import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProdutoService } from 'src/app/service/produto.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/service/storage.service';

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
    private produtoService: ProdutoService,
    private storage: StorageService) { }

  ngOnInit() {
    if (this.storage.getItem().userToken.perfil == 'Caixa') {
      this.router.navigate(['/']);
    }
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
      error: (err) => {
        this.msgError("Erro ao carregar produtos")
      }
    });
  }

  filtrarProdutos(termo: string) {
    termo = termo.trim().toLowerCase();
    if (!termo) {
      this.produtosFiltrados = this.produtos;
      return;
    }

    const ehNumero = !isNaN(Number(termo)); // verifica se o termo é numérico

    this.produtosFiltrados = this.produtos.filter(p => {
      const codigoStr = p.codigo?.toString().toLowerCase() || '';
      const nome = p.nome?.toLowerCase() || '';

      if (ehNumero) {
        // busca exata para números
        return codigoStr === termo;
      } else {
        // busca parcial para nomes
        return nome.includes(termo);
      }
    });
  }




  // removerProduto(codigo: number): void {
  //   console.log(`Remover produto com código: ${codigo}`);
  // }


  removerProduto(produtoId: number) {
    Swal.fire({
      title: "Deseja remover?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.removerProduto(produtoId).subscribe(
          (res: any) => {
            this.msgSucess(res.data.message);
            this.ngOnInit();
          },
          (error) => {
            this.msgError(error?.error.errors[0]);
          }
        );
      }
    });
  }

  msgError(msg: string) {
    Swal.fire({
      icon: "error",
      title: msg,
      showConfirmButton: false,
      timer: 3000
    });
  }

    msgSucess(msg: string) {
      Swal.fire({
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 2000
      });
    }
}




