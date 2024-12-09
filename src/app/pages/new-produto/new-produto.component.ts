import { Component } from '@angular/core';
import { DemoFlexyModule } from 'src/app/demo-flexy-module'; // Caminho correto para o módulo

@Component({
  selector: 'app-new-produto',
  standalone: true,
  imports: [DemoFlexyModule], // Importa o módulo compartilhado com todos os Material Modules
  templateUrl: './new-produto.component.html',
  styleUrls: ['./new-produto.component.scss']
})
export class NewProdutoComponent {
}
