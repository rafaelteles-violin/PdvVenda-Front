import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importe o RouterModule aqui
import { DemoFlexyModule } from '../demo-flexy-module';
import { DashboardComponent } from './dashboard.component';
// import { ProductComponent } from './dashboard-components/product/product.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    DashboardComponent,
    // ProductComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule,
  ],
  exports: [
    DashboardComponent,
    // ProductComponent,
  ],
})
export class DashboardModule {}
