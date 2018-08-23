import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OrderListDetailFormModel, OrderListDetailTableModel } from '../../../models/order-list-detail.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable()
export class OrderListDetailService {
  orderListDetailForm = 'http://localhost:53366/api/orderListDetailForm/';
  orderListDetailTable = 'http://localhost:53366/api/orderListDetailTable/';

  constructor(private http: HttpClient) { }

  getOrderListDetailForm(orderNo: String) {
    return this.http.get<OrderListDetailFormModel>(this.orderListDetailForm + orderNo).pipe( retry(3), catchError(this.handleError));
  }

  getOrderListDetailTable(orderNo: String) {
    return this.http.get<Array<OrderListDetailTableModel>>(this.orderListDetailTable + orderNo).pipe( retry(3), catchError(this.handleError));
  }

  delOrderListDetailTableData(orderNo:string, bumpIdList: String[]) {
    return this.http.delete<any> (this.orderListDetailTable + orderNo + "卍" + bumpIdList.toString()).pipe( catchError(this.handleError) );
  }

  saveOrderListDetailForm(orderListDetailFormModel: any) {
    return this.http.post<any>(this.orderListDetailForm, this.checkInput(JSON.stringify(orderListDetailFormModel)), httpOptions).pipe( retry(3), catchError(this.handleError) );
  }

  saveOrderListDetailTable(currentBumpInfo: any) {
    return this.http.post<any>(this.orderListDetailTable, this.checkInput(JSON.stringify(currentBumpInfo)), httpOptions).pipe( retry(3), catchError(this.handleError) );
  }

  checkInput(orderListDetailFormModel: string) {

    var temporderListDetailFormModel = JSON.parse(orderListDetailFormModel);

    // DO SOMETING HERE
    
    return JSON.stringify(temporderListDetailFormModel);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}