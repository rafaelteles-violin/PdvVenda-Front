import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-financeiro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent {
  dataInicio: string = '';
  dataFim: string = '';

  dados = {
    totalDeVenda: 4,
    totalFaturamento: 'R$ 212,96',
    filtro: '08/10/2025 até 08/10/2025',
    mensagem: '',
    vendaDtos: [
      {
        valorTotal: 'R$ 86,98',
        formaDePagamento: 'Dinheiro',
        dataVenda: '08/10/2025 17:10',
        totalProdutosVendidos: 3,
        vendaDetalhe: [
          { nomeProduto: 'Bolo de laranja', quantidade: 1, precoUnitario:"R$ 22,98" },
          { nomeProduto: 'Bolo de limao', quantidade: 6, precoUnitario:"R$ 22,98" },
          { nomeProduto: 'Bolo de Uva G', quantidade: 1, precoUnitario:"R$ 22,98" }
        ]
      },
      {
        valorTotal: 'R$ 44,00',
        formaDePagamento: 'Pix',
        dataVenda: '08/10/2025 17:10',
        totalProdutosVendidos: 1,
        vendaDetalhe: [
          { nomeProduto: 'Bolo de laranja', quantidade: 1, precoUnitario:"R$ 22,98" }
        ]
      },
      {
        valorTotal: 'R$ 37,98',
        formaDePagamento: 'Dinheiro',
        dataVenda: '08/10/2025 17:05',
        totalProdutosVendidos: 2,
        vendaDetalhe: [
          { nomeProduto: 'Bolo de fuba', quantidade: 1, precoUnitario:"R$ 22,98" },
          { nomeProduto: 'Bolo de Uva G', quantidade: 3 , precoUnitario:"R$ 19,98"}
        ]
      },
      {
        valorTotal: 'R$ 44,00',
        formaDePagamento: 'Pix',
        dataVenda: '08/10/2025 17:04',
        totalProdutosVendidos: 1,
        vendaDetalhe: [
          { nomeProduto: 'Bolo de laranja', quantidade: 1, precoUnitario:"R$ 16,98" }
        ]
      },
      {
        valorTotal: 'R$ 44,00',
        formaDePagamento: 'Pix',
        dataVenda: '08/10/2025 17:04',
        totalProdutosVendidos: 1,
        vendaDetalhe: [
          { nomeProduto: 'Bolo de laranja', quantidade: 1, precoUnitario:"R$ 22,98" }
        ]
      }
    ]
  };

  filtrarPorData() {
    console.log('Filtro aplicado:', this.dataInicio, this.dataFim);
  }

  limparFiltro() {
    this.dataInicio = '';
    this.dataFim = '';
  }
}
