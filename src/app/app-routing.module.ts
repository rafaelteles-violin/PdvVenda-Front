import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { ListProdutoComponent } from './pages/list-produto/list-produto.component';
import { NewProdutoComponent } from './pages/new-produto/new-produto.component';
import { EditProdutoComponent } from './pages/edit-produto/edit-produto.component';
import { NewVendaComponent } from './pages/new-venda/new-venda.component';
import { FinanceiroComponent } from './pages/financeiro/financeiro.component';
import { LoginComponent } from './pages/login/login.component';



const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },
      { path: 'listProdutos', component: ListProdutoComponent },
      { path: 'newProdutos', component: NewProdutoComponent },
      { path: 'editProdutos/:id', component: EditProdutoComponent },
      { path: 'newVenda', component: NewVendaComponent },
      { path: 'financeiro', component: FinanceiroComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
