import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListProdutoComponent } from './pages/list-produto/list-produto.component';
import { NewProdutoComponent } from './pages/new-produto/new-produto.component';
import { EditProdutoComponent } from './pages/edit-produto/edit-produto.component';
import { NewVendaComponent } from './pages/new-venda/new-venda.component';




const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'listProdutos', component: ListProdutoComponent },
  { path: 'newProdutos', component: NewProdutoComponent },
  { path: 'editProdutos', component: EditProdutoComponent },
  { path: 'newVenda', component: NewVendaComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
