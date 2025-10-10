import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from 'src/app/service/produto.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localePt);

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-financeiro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule, // 👈 Aqui muda!
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss'],
})
export class FinanceiroComponent {
  dataInicio: any = null;
  dataFim: any = null;
  vendas: any = [];
  isLoading = false;

  constructor(private produtoService: ProdutoService, private router: Router) { }

  filtrarPorData() {
    if (!this.dataInicio || !this.dataFim) {
      alert('Selecione o período corretamente.');
      return;
    }
    this.isLoading = true;

    const data = {
      dataInicio: this.dataInicio.format('YYYY-MM-DD'),
      dataFim: this.dataFim.format('YYYY-MM-DD'),
    };

    this.produtoService.obterVendas(data).subscribe({
      // next: (data) => (this.vendas = data),
      // error: (err) => console.error('Erro ao carregar vendas', err),
      next: (res) => {
        this.vendas = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
