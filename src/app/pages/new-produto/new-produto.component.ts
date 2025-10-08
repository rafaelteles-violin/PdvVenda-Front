import { Component } from '@angular/core';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-new-produto',
  standalone: true,
  imports: [DemoFlexyModule, CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './new-produto.component.html',
  styleUrls: ['./new-produto.component.scss']
})
export class NewProdutoComponent {
  produtoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private produtoService: ProdutoService
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      codigo: [''],
      valor: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  voltar() {
    this.router.navigate(['/listProdutos']);
  }

  salvarProduto() {
     if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }
      this.produtoService.adicionarProduto(this.produtoForm.value).subscribe({
        next: () => {
          alert('Produto salvo com sucesso!');
          this.voltar();
        },
        error: (err) => {
          console.error('Erro ao salvar produto', err);
          alert('Erro ao salvar produto.');
        }
      });

       this.produtoForm.markAllAsTouched();
      return;
  }
}
