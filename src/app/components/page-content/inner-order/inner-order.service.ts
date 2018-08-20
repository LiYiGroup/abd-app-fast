import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderListDetailTableModel } from '../../../models/order-list-detail.model';


@Injectable()
export class InnerOrderService {
  existBumpInfo = 'http://192.168.0.163:53366/api/innerOrder/existBumpInfo/';

  constructor(private http: HttpClient) { }

  getExistedBumpInfo(orderNo:string, bumpId: string) {
    return this.http.get<OrderListDetailTableModel> (this.existBumpInfo + orderNo + "卍" + bumpId).pipe( catchError(this.handleError) );
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