import { Component, OnInit } from '@angular/core';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-edit-produto',
  standalone: true,
  imports: [DemoFlexyModule, CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './edit-produto.component.html',
  styleUrls: ['./edit-produto.component.scss']
})
export class EditProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  idProduto: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      codigo: [''],
      valor: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.idProduto = this.route.snapshot.paramMap.get('id') || '';
    if (this.idProduto) {
      this.carregarProduto(this.idProduto);
    }
  }

  carregarProduto(id: string) {
    this.produtoService.getProdutoId(id).subscribe({
      next: (data) => {
        this.produtoForm.patchValue({
          nome: data.nome,
          codigo: data.codigo,
          valor: data.valor
        });
      },
      error: (err) => console.error("Erro ao carregar produto", err)
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
      valor: this.produtoForm.value.valor,
      produtoId: this.idProduto
    };

    this.produtoService.atualizarProduto(produto).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso!');
        this.voltar();
      },
      error: (err) => {
        console.error('Erro ao atualizar produto', err);
        alert('Erro ao atualizar produto.');
      }
    });
  }
}
