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
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/service/storage.service';

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

  constructor(private produtoService: ProdutoService,
     private router: Router,
    private storage: StorageService) { }

  ngOnInit() {
    if (this.storage.getItem() == null ||
        this.storage.getItem().userToken.perfil == 'Caixa') {
      this.router.navigate(['/']);
    }
  }

  filtrarPorData() {
    if (!this.dataInicio || !this.dataFim) {
      this.msgAlert('Informe a data início e a data fim');
      return;
    }
    this.isLoading = true;

    const data = {
      dataInicio: this.dataInicio.format('YYYY-MM-DD'),
      dataFim: this.dataFim.format('YYYY-MM-DD'),
    };

    this.produtoService.obterVendas(data).subscribe({
      next: (res: any) => {
        this.vendas = res;
        this.isLoading = false;
        if (this.vendas.vendaDtos.length == 0) {
          this.msgAlert(res.mensagem)
        }
      },
      error: (err) => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigate(['/']);
          return;
        }
        this.msgError("falha ao consultar venda")
        this.isLoading = false;
      },
    });
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  msgAlert(msg: string) {
    Swal.fire({
      icon: "info",
      title: msg,
      showConfirmButton: true,
      // timer: 3000
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
