import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppSiderComponent } from './components/app-sider/app-sider.component';
import { HeaderComponent } from './components/header/header.component';
import { OrderListComponent } from './components/page-content/order-list/order-list.component';
import { AppRoutingModule } from './app-routing.module';
import { OrderListDetailComponent } from './components/page-content/order-list-detail/order-list-detail.component';
import { InnerOrderComponent } from './components/page-content/inner-order/inner-order.component';
import { OtherComponentModelComponent } from './components/page-content/other-component-model/other-component-model.component';
import { AbdDoubleSealMstComponent } from './components/page-content/abd-double-seal-mst/abd-double-seal-mst.component';
import { AbdIntegrateSealMstComponent } from './components/page-content/abd-integrate-seal-mst/abd-integrate-seal-mst.component';
import { AbdSingleSealMstComponent } from './components/page-content/abd-single-seal-mst/abd-single-seal-mst.component';
import { OrderQueryComponent } from './components/page-content/order-query/order-query.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AppSiderComponent,
    HeaderComponent,
    OrderListComponent,
    OrderListDetailComponent,
    InnerOrderComponent,
    OtherComponentModelComponent,
    AbdDoubleSealMstComponent,
    AbdIntegrateSealMstComponent,
    AbdSingleSealMstComponent,
    OrderQueryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
