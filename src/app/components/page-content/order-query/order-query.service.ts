import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OrderQueryResultSearchModel } from '../../../models/order-query.model';
import { OrderQueryResultTableModel } from '../../../models/order-query.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderQueryService {

  orderquerymodel = 'http://localhost:53366/api/orderqueryresult/';

  constructor(private http: HttpClient) { }

  //查询所有的数据
  getOrderQueryModel() {
    return this.http.get<Array<OrderQueryResultTableModel>>(this.orderquerymodel).pipe(retry(3), catchError(this.handleError));
  }
  //按条件查询
  getOrderQueryWithCondition(searchCondition: OrderQueryResultSearchModel) {
    return this.http.post<Array<OrderQueryResultTableModel>>(this.orderquerymodel + "searchWithCond", this.makeSearchCondition(JSON.stringify(searchCondition)), httpOptions).pipe(retry(3), catchError(this.handleError));
  }
  makeSearchCondition(searchCondition: string) {
    var tempSearchCondition = JSON.parse(searchCondition);
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
