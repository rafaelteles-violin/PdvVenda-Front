import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { ListProdutoComponent } from './pages/list-produto/list-produto.component';
import { NewProdutoComponent } from './pages/new-produto/new-produto.component';
import { EditProdutoComponent } from './pages/edit-produto/edit-produto.component';
import { NewVendaComponent } from './pages/new-venda/new-venda.component';



const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },
      // { path: 'table', component: ProductComponent },
      { path: 'listProdutos', component: ListProdutoComponent },
      { path: 'newProdutos', component: NewProdutoComponent },
      { path: 'editProdutos/:id', component: EditProdutoComponent },
      { path: 'newVenda', component: NewVendaComponent },


    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
