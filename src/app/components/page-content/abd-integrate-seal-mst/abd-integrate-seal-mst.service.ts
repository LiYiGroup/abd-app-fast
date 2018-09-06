import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AbdIntegrateSealMstSearchModel} from '../../../models/abd-integrate-seal-mst.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class AbdIntegrateSealMstService {

  abdintegratesealmst = 'http://localhost:53366/api/AbdIntegrateSealMst/';

  constructor(private http: HttpClient) { }

  //查询所有的数据
  getOtherComponentModel()  {
    return this.http.get<Array<AbdIntegrateSealMstSearchModel>>(this.abdintegratesealmst).pipe( retry(3), catchError(this.handleError) );
  }
  //按条件查询
  getOtherComponentModelWithCondition(searchCondition: AbdIntegrateSealMstSearchModel) {
    return this.http.post<Array<AbdIntegrateSealMstSearchModel>>(this.abdintegratesealmst + "searchWithCond", this.makeSearchCondition(JSON.stringify(searchCondition)), httpOptions).pipe( retry(3), catchError(this.handleError) );
  }
  makeSearchCondition(searchCondition: string) {
    var tempSearchCondition = JSON.parse(searchCondition);  
    return JSON.stringify(tempSearchCondition);
  }

//删除多条记录
deleteOtherComponentModelTableData( bumptypeList: String[]) {
  return this.http.delete<any> (this.abdintegratesealmst + bumptypeList.toString()).pipe( catchError(this.handleError) );
}


//保存（插入）数据至数据库
saveOtherComponentModelTable(currentBumpInfo: any) {
  return this.http.post<any>(this.abdintegratesealmst + "save", this.checkInput(JSON.stringify(currentBumpInfo)), httpOptions).pipe( retry(3), catchError(this.handleError) );
}
checkInput(orderListDetailFormModel: string) {
  var temporderListDetailFormModel = JSON.parse(orderListDetailFormModel)
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
