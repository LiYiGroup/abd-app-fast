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
import { AppRoutingModule } from './/app-routing.module';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AppSiderComponent,
    HeaderComponent,
    OrderListComponent
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
