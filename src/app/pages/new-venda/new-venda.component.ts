import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProdutoService } from 'src/app/service/produto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
 
  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

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
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(total);
  }
}
