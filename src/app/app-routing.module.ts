import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/page-content/order-list/order-list.component';
import { OrderListDetailComponent } from './components/page-content/order-list-detail/order-list-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/order-list', pathMatch: 'full' },
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-list/detail', component: OrderListDetailComponent },
  { path: 'order-list/detail/:orderNo', component: OrderListDetailComponent }
];

@NgModule ({
  imports: [
    RouterModule.forRoot(routes)
  ], 
  exports: [ 
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }