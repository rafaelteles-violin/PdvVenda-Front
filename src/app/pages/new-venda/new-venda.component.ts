import { Component } from '@angular/core';
import { DemoFlexyModule } from 'src/app/demo-flexy-module'; // Caminho correto para o módulo

@Component({
  selector: 'app-new-venda',
  standalone: true,
  imports: [DemoFlexyModule], // Importa o módulo compartilhado com todos os Material Modules
  templateUrl: './new-venda.component.html',
  styleUrl: './new-venda.component.scss'
})
export class NewVendaComponent {

}
