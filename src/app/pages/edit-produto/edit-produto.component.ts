import { Component } from '@angular/core';
import { DemoFlexyModule } from 'src/app/demo-flexy-module'; // Caminho correto para o módulo

@Component({
  selector: 'app-edit-produto',
  standalone: true,
  imports: [DemoFlexyModule], // Importa o módulo compartilhado com todos os Material Modules
  templateUrl: './edit-produto.component.html',
  styleUrl: './edit-produto.component.scss'
})
export class EditProdutoComponent {

}

