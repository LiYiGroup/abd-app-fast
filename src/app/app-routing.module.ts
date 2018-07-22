import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/page-content/order-list/order-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/order-list', pathMatch: 'full' },
  { path: 'order-list', component: OrderListComponent }
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