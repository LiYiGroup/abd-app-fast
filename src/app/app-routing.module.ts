import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/page-content/order-list/order-list.component';
import { OrderListDetailComponent } from './components/page-content/order-list-detail/order-list-detail.component';
import { InnerOrderComponent } from './components/page-content/inner-order/inner-order.component';
import { AbdIntegrateSealMstComponent } from './components/page-content/abd-integrate-seal-mst/abd-integrate-seal-mst.component';
import { OtherComponentModelComponent } from './components/page-content/other-component-model/other-component-model.component';
import { AbdDoubleSealMstComponent } from './components/page-content/abd-double-seal-mst/abd-double-seal-mst.component';
import { AbdSingleSealMstComponent } from './components/page-content/abd-single-seal-mst/abd-single-seal-mst.component';

const routes: Routes = [
  { path: '', redirectTo: '/order-list', pathMatch: 'full' },
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-list/detail', component: OrderListDetailComponent },
  { path: 'order-list/detail/:orderNo', component: OrderListDetailComponent },
  { path: 'order-list/bom', component: InnerOrderComponent },
  { path: 'order-list/bom/:bumpInfo', component: InnerOrderComponent },
  { path: 'other-component-model', component: OtherComponentModelComponent },
  { path: 'abd-double-seal-mst', component: AbdDoubleSealMstComponent },
  { path: 'abd-integrate-seal-mst', component: AbdIntegrateSealMstComponent },
  { path: 'abd-single-seal-mst', component: AbdSingleSealMstComponent }
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