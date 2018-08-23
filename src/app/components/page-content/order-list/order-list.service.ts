import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OrderListTableModel, OrderDetailListTableModel, OrderListSearchModel } from '../../../models/order-list.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable()
export class OrderListService {
  orderList = 'http://localhost:53366/api/orderList/';
  orderListDetailTable = 'http://localhost:53366/api/orderListDetailTable/';

  constructor(private http: HttpClient) { }

  getOrderList() {
    return this.http.get<Array<OrderListTableModel>>(this.orderList).pipe( retry(3), catchError(this.handleError) );
  }

  getOrderListDetailTable(orderNo: String) {
    return this.http.get<Array<OrderDetailListTableModel>>(this.orderListDetailTable + orderNo).pipe( retry(3), catchError(this.handleError) );
  }

  getOrderListWithCondition(searchCondition: OrderListSearchModel) {
    return this.http.post<Array<OrderListTableModel>>(this.orderList, this.makeSearchCondition(JSON.stringify(searchCondition)), httpOptions).pipe( retry(3), catchError(this.handleError) );
  }

  delOrderListItem(orderNoList: String[]) {
    return this.http.delete<any> (this.orderList + orderNoList.toString()).pipe( catchError(this.handleError) );
  }

  makeSearchCondition(searchCondition: string) {

    var tempSearchCondition = JSON.parse(searchCondition);

    if(tempSearchCondition.DELIVERY_DATE_ST == null) tempSearchCondition.DELIVERY_DATE_ST = new Date(1,1,1);
    if(tempSearchCondition.DELIVERY_DATE_ED == null) tempSearchCondition.DELIVERY_DATE_ED = new Date(1,1,1);
    if(tempSearchCondition.DEPARTURE_DATE_ST == null) tempSearchCondition.DEPARTURE_DATE_ST = new Date(1,1,1);
    if(tempSearchCondition.DEPARTURE_DATE_ED == null) tempSearchCondition.DEPARTURE_DATE_ED = new Date(1,1,1);
    
    return JSON.stringify(tempSearchCondition);
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