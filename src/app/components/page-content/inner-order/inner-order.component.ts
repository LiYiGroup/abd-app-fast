import { Component, OnInit } from '@angular/core';
import { BasicAndSealModel } from '../../../models/inner-order.model';
import { OrderListDetailTableModel } from '../../../models/order-list-detail.model';
import { ActivatedRoute } from '@angular/router';
import { InnerOrderService } from './inner-order.service';

@Component({
  selector: 'app-inner-order',
  templateUrl: './inner-order.component.html',
  styleUrls: ['./inner-order.component.css'],
  providers: [ InnerOrderService ]
})
export class InnerOrderComponent implements OnInit {

  constructor(public activeRouter: ActivatedRoute, private innerOrderService: InnerOrderService) { }

  // ERROR
  error: any;

  // KEY
  orderNo: string;
  bumpId: string;

  // ORDER LIST FORM
  basicAndSealModel = new BasicAndSealModel();

  // LOAD ITEM BELOW WHEN INIT
  orderListDetailTableModel = new OrderListDetailTableModel();

  ngOnInit() {
    this.activeRouter.queryParams.subscribe(params => {
      this.orderListDetailTableModel.ORDER_NO = params.orderNo;
      this.orderListDetailTableModel.BUMP_ID = params.bumpId;
      this.orderNo = params.orderNo;
      this.bumpId = params.bumpId; 
      // GET BUMP DATA THROUGH BUMPID AND ORDERNO
      this.getExistedBumpInfo();
    });
  }

  getExistedBumpInfo () {
    this.innerOrderService.
        getExistedBumpInfo(this.orderNo, this.bumpId).
        subscribe((data) => (this.orderListDetailTableModel = data), error => this.error = error);
  }
}
