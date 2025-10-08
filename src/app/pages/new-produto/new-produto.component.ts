import { Component } from '@angular/core';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

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
    private router: Router
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

    const produto = {
      nome: this.produtoForm.value.nome,
      codigo: this.produtoForm.value.codigo,
      valor: this.produtoForm.value.valor
    };

    this.http.post('http://localhost:5087/Produto', produto)
      .subscribe({
        next: () => {
          alert('Produto salvo com sucesso!');
          this.router.navigate(['/list-produto']); // Redireciona para a lista de produtos
        },
        error: (err) => {
          console.error('Erro ao salvar produto', err);
          alert('Erro ao salvar produto.');
        }
      });
  }
}
