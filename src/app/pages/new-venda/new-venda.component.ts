import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProdutoService } from 'src/app/service/produto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-venda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-venda.component.html',
  styleUrls: ['./new-venda.component.scss']
})
export class NewVendaComponent implements OnInit {
  produtos$!: Observable<any[]>;
  produtosOriginais: any[] = [];
  filtro: string = '';
  filtroSubject = new BehaviorSubject<string>('');

  orderItems: any[] = [];
  selectedPayment: string = '';
  isLoading = false;
  totalCompra: any;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.produtoService.getProdutos().subscribe(produtos => {
      this.produtosOriginais = produtos;
      this.filtroSubject.next(this.filtro);
    });

    this.produtos$ = combineLatest([
      this.produtoService.getProdutos(),
      this.filtroSubject.pipe(startWith(''))
    ]).pipe(
      map(([produtos, filtro]) =>
        produtos.filter(produto =>
          produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
          produto.codigo.toString().includes(filtro)
        )
      )
    );
  }

  filtrarProdutos() {
    this.filtroSubject.next(this.filtro);
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  adicionarAoPedido(produto: any) {
    const itemExistente = this.orderItems.find(item => item.id === produto.id);
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      this.orderItems.push({ ...produto, quantidade: 1 });
    }
  }

  removerItem(item: any) {
    this.orderItems = this.orderItems.filter(i => i.id !== item.id);
  }

  alterarQuantidade(item: any, delta: number) {
    const produto = this.orderItems.find(i => i.id === item.id);
    if (produto) {
      produto.quantidade += delta;
      if (produto.quantidade <= 0) {
        this.removerItem(produto);
      }
    }
  }

  calcularTotal(): string {
    const total = this.orderItems.reduce((total, item) => total + item.valor * item.quantidade, 0);
    this.totalCompra = total
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(total);
  }



  finalizarVenda() {
    Swal.fire({
      title: "Deseja confirmar a venda?",
      showCancelButton: true,
      confirmButtonText: "Finalizar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "info",
          title: "Processando a venda...",
          showConfirmButton: false,
          timer: 1000
        });

        this.confirmarVenda();
      }
    });
  }



  confirmarVenda() {
    this.isLoading = true; // desabilita o botão
    const venda = {
      quantidade: this.orderItems.length,
      valorTotal: this.totalCompra,
      formaPagamento: this.selectedPayment,
      vendaProduto: this.orderItems
    }

    this.produtoService.enviarVenda(venda)
      .subscribe({
        next: (res) => {
          this.msgSucess('Venda realizada com sucesso!');
          this.orderItems = [];
        },
        error: (err) => {
          this.msgError('Erro ao finalizar venda');
        },
        complete: () => {
          this.isLoading = false; // reabilita o botão
        }
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

  msgError(msg: string) {
    Swal.fire({
      icon: "error",
      title: msg,
      showConfirmButton: false,
      timer: 2000
    });
  }
}
