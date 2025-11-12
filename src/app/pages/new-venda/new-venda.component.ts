import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProdutoService } from 'src/app/service/produto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/service/storage.service';
import { HostListener } from '@angular/core';

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
  perfil: any;
  valorPago: any;
  troco: number = 0;

  dataVenda: string = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });

  paymentOptions = [
    { label: 'Dinheiro', value: 'dinheiro', icon: 'fas fa-money-bill' },
    { label: 'Pix', value: 'pix', icon: 'fas fa-bolt' },
    { label: 'Débito', value: 'debito', icon: 'fas fa-credit-card' },
    { label: 'Crédito', value: 'credito', icon: 'far fa-credit-card' }
  ];

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    public storage: StorageService
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

    this.perfil = this.storage.getItem().userToken.perfil;
  }

  filtrarProdutos() {
    this.filtroSubject.next(this.filtro);
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  adicionarAoPedido(produto: any) {
    // Cada clique adiciona um novo item independente
    const novoItem = { ...produto, quantidade: 1 };
    this.orderItems.push(novoItem);
  }

  removerItem(index: number) {
    this.orderItems.splice(index, 1);
  }

  calcularTotal(): string {
    const total = this.orderItems.reduce((total, item) => total + item.valor * item.quantidade, 0);
    this.totalCompra = total
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(total);
  }


  @HostListener('document:keydown.enter', ['$event'])
  onEnterPress(event: KeyboardEvent) {
    if (this.isLoading || this.orderItems.length > 0) {
      this.finalizarVenda();
    }

  }

  finalizarVenda() {
    Swal.fire({
      icon: "info",
      title: "Processando...",
      showConfirmButton: false,
      timer: 2000
    });

    this.confirmarVenda();
  }



  confirmarVenda() {
    if (this.selectedPayment == '') {
      this.msgAlert('Selecione a forma de pagamento');
      return;
    }
    this.isLoading = true; // desabilita o botão
    const venda = {
      quantidade: this.orderItems.length,
      valorTotal: this.totalCompra,
      formaPagamento: this.selectedPayment,
      vendaProduto: this.orderItems,
      dataVenda: this.dataVenda
    }

    this.produtoService.enviarVenda(venda)
      .subscribe({
        next: (res) => {
          this.msgSucess('Venda realizada com sucesso!');
          this.troco = 0;
          this.filtro = '';
          this.filtroSubject.next(this.filtro);
          this.valorPago = 0
          this.orderItems = [];
        },
        error: (err) => {
          this.msgError(err.error.errors[0]);
          this.isLoading = false; // reabilita o botão
        },
        complete: () => {
          this.isLoading = false; // reabilita o botão
        }
      });
  }

  calcularTroco() {
    if (this.valorPago > 0)
      this.troco = this.valorPago - this.totalCompra;
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
      timer: 4000
    });
  }

  msgAlert(msg: string) {
    Swal.fire({
      icon: "info",
      title: msg,
      showConfirmButton: true,
    });
  }
}
