import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OrderListDetailFormModel, OrderListDetailTableModel } from '../../../models/order-list-detail.model';
import { mDict } from '../../../models/m-dict';
import { OrderListAttachmentTableModel } from '../../../models/order-list-attachment.model';
import { AccessoriesTemplateModel} from '../../../models/accessories-template.model'; 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable()
export class OrderListDetailService {
  orderListDetailForm = 'http://localhost:53366/api/orderListDetailForm/';
  orderListAttachment = 'http://localhost:53366/api/OrderListAttachment/';
  orderListDetailTable = 'http://localhost:53366/api/orderListDetailTable/';
  accessoriesTemplate = 'http://localhost:53366/api/accessoriestemplate/';
  constructor(private http: HttpClient) { }

  getOrderListDetailForm(orderNo: String) {
    return this.http.get<OrderListDetailFormModel>(this.orderListDetailForm + orderNo.replace("/", "|SLASH|")).pipe(retry(3), catchError(this.handleError));
  }

  getOrderListDetailTable(orderNo: String) {
    return this.http.get<Array<OrderListDetailTableModel>>(this.orderListDetailTable + orderNo.replace("/", "|SLASH|")).pipe(retry(3), catchError(this.handleError));
  }

  getAccessoriesTemplate(orderNo: String) {
    return this.http.get<Array<AccessoriesTemplateModel>>(this.accessoriesTemplate + orderNo.replace("/", "|SLASH|")).pipe(retry(3), catchError(this.handleError));
  }

  delOrderListDetailTableData(orderNo: string, bumpIdList: String[]) {
    return this.http.delete<any>(this.orderListDetailTable + orderNo + "|DASH|" + bumpIdList.toString()).pipe(catchError(this.handleError));
  }

  delAccessoriesTemplateData(SeqID: String) {
    return this.http.delete<any>(this.accessoriesTemplate + SeqID ).pipe(catchError(this.handleError));
  }

  saveOrderListDetailForm(orderListDetailFormModel: any) {
    return this.http.post<any>(this.orderListDetailForm, this.checkInput(JSON.stringify(orderListDetailFormModel)), httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  saveOrderListAttachment(orderListAttachment: any) {
    return this.http.post<any>(this.orderListAttachment, this.checkInput(JSON.stringify(orderListAttachment)), httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  saveOrderListDetailTable(currentBumpInfo: any) {
    return this.http.post<any>(this.orderListDetailTable, this.checkInput(JSON.stringify(currentBumpInfo)), httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  saveAccessoriesTemplateTable(currentAccTemp: any) {
    return this.http.post<any>(this.accessoriesTemplate, this.checkInput(JSON.stringify(currentAccTemp)), httpOptions).pipe(retry(3), catchError(this.handleError));
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


  mDictDebug = 'http://localhost:53366/api/mdictsearch/01';
  mDictTexRate = 'http://localhost:53366/api/mdictsearch/02';
  mDictMotor = 'http://localhost:53366/api/mdictsearch/03';
  mDictSealForm = 'http://localhost:53366/api/mdictsearch/04';
  mDictSealBrand = 'http://localhost:53366/api/mdictsearch/05';
  mDictRollerBrand = 'http://localhost:53366/api/mdictsearch/06';
  mDictCoupling = 'http://localhost:53366/api/mdictsearch/07';
  mDictSealCooler = 'http://localhost:53366/api/mdictsearch/08';
  mDictFlangesStd = 'http://localhost:53366/api/mdictsearch/09';
  mDictFlangesLvl = 'http://localhost:53366/api/mdictsearch/10';
  mDictBase = 'http://localhost:53366/api/mdictsearch/11';
  mDictCouplingHood = 'http://localhost:53366/api/mdictsearch/12';
  mDictAnchorBolt = 'http://localhost:53366/api/mdictsearch/13';
  mDictPaint = 'http://localhost:53366/api/mdictsearch/14';
  mDictSurfaceTreatment = 'http://localhost:53366/api/mdictsearch/15';
  mDictPackage = 'http://localhost:53366/api/mdictsearch/16';
  mDictTransport = 'http://localhost:53366/api/mdictsearch/17';
  mDictQualification = 'http://localhost:53366/api/mdictsearch/18';
  mDictIdentification = 'http://localhost:53366/api/mdictsearch/19';
  mDictProductSample = 'http://localhost:53366/api/mdictsearch/20';
  mDictDynamicReport = 'http://localhost:53366/api/mdictsearch/21';
  mDictStaticReport = 'http://localhost:53366/api/mdictsearch/22';
  mDictPerformanceReport = 'http://localhost:53366/api/mdictsearch/23';
  mDictBlueprint = 'http://localhost:53366/api/mdictsearch/24';
  mDictPerformanceCurve = 'http://localhost:53366/api/mdictsearch/25';

  getmDictDebug() { return this.http.get<mDict>(this.mDictDebug).pipe(retry(3), catchError(this.handleError)); }
  getmDictTexRate() { return this.http.get<mDict>(this.mDictTexRate).pipe(retry(3), catchError(this.handleError)); }
  getmDictMotor() { return this.http.get<mDict>(this.mDictMotor).pipe(retry(3), catchError(this.handleError)); }
  getmDictSealForm() { return this.http.get<mDict>(this.mDictSealForm).pipe(retry(3), catchError(this.handleError)); }
  getmDictSealBrand() { return this.http.get<mDict>(this.mDictSealBrand).pipe(retry(3), catchError(this.handleError)); }
  getmDictRollerBrand() { return this.http.get<mDict>(this.mDictRollerBrand).pipe(retry(3), catchError(this.handleError)); }
  getmDictCoupling() { return this.http.get<mDict>(this.mDictCoupling).pipe(retry(3), catchError(this.handleError)); }
  getmDictSealCooler() { return this.http.get<mDict>(this.mDictSealCooler).pipe(retry(3), catchError(this.handleError)); }
  getmDictFlangesStd() { return this.http.get<mDict>(this.mDictFlangesStd).pipe(retry(3), catchError(this.handleError)); }
  getmDictFlangesLvl() { return this.http.get<mDict>(this.mDictFlangesLvl).pipe(retry(3), catchError(this.handleError)); }
  getmDictBase() { return this.http.get<mDict>(this.mDictBase).pipe(retry(3), catchError(this.handleError)); }
  getmDictCouplingHood() { return this.http.get<mDict>(this.mDictCouplingHood).pipe(retry(3), catchError(this.handleError)); }
  getmDictAnchorBolt() { return this.http.get<mDict>(this.mDictAnchorBolt).pipe(retry(3), catchError(this.handleError)); }
  getmDictPaint() { return this.http.get<mDict>(this.mDictPaint).pipe(retry(3), catchError(this.handleError)); }
  getmDictSurfaceTreatment() { return this.http.get<mDict>(this.mDictSurfaceTreatment).pipe(retry(3), catchError(this.handleError)); }
  getmDictPackage() { return this.http.get<mDict>(this.mDictPackage).pipe(retry(3), catchError(this.handleError)); }
  getmDictTransport() { return this.http.get<mDict>(this.mDictTransport).pipe(retry(3), catchError(this.handleError)); }
  getmDictQualification() { return this.http.get<mDict>(this.mDictQualification).pipe(retry(3), catchError(this.handleError)); }
  getmDictIdentification() { return this.http.get<mDict>(this.mDictIdentification).pipe(retry(3), catchError(this.handleError)); }
  getmDictProductSample() { return this.http.get<mDict>(this.mDictProductSample).pipe(retry(3), catchError(this.handleError)); }
  getmDictDynamicReport() { return this.http.get<mDict>(this.mDictDynamicReport).pipe(retry(3), catchError(this.handleError)); }
  getmDictStaticReport() { return this.http.get<mDict>(this.mDictStaticReport).pipe(retry(3), catchError(this.handleError)); }
  getmDictPerformanceReport() { return this.http.get<mDict>(this.mDictPerformanceReport).pipe(retry(3), catchError(this.handleError)); }
  getmDictBlueprint() { return this.http.get<mDict>(this.mDictBlueprint).pipe(retry(3), catchError(this.handleError)); }
  getmDictPerformanceCurve() { return this.http.get<mDict>(this.mDictPerformanceCurve).pipe(retry(3), catchError(this.handleError)); }


  OrderListAttachment = 'http://localhost:53366/api/OrderListAttachment/';
  getOrderListAttachment(orderNo: String) {
    return this.http.get<OrderListAttachmentTableModel>(this.OrderListAttachment + orderNo.replace("/", "|SLASH|")).pipe(retry(3), catchError(this.handleError));
  }
}