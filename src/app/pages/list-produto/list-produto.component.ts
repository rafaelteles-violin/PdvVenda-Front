import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importe RouterModule
import { DemoFlexyModule } from 'src/app/demo-flexy-module'; // Caminho correto para o módulo


@Component({
  selector: 'app-list-produto',
  standalone: true,
  imports: [RouterModule, DemoFlexyModule],
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.scss']
})
export class ListProdutoComponent {
}




