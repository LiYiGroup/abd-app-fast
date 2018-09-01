import { Component, OnInit } from '@angular/core';
import { BasicAndSealModel, BasicPartListTableModel, ComponentListTableModel, OtherComponentModel } from '../../../models/inner-order.model';
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

  
  // ---------FORM OBJECTS START---------
  // ORDER LIST FORM
  basicAndSealModel = new BasicAndSealModel();
  otherComponentModel = new OtherComponentModel();
  // GRID
  componentListTableData: Array<ComponentListTableModel>;
  basicPartListTableData: Array<BasicPartListTableModel>;
  // ---------FORM OBJECTS END-----------

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
      this.getBasicSealInfo();
      this.getOtherComponentInfo();
    });
  }

  getExistedBumpInfo () {
    this.innerOrderService.
        getExistedBumpInfo(this.orderNo, this.bumpId).
        subscribe((data) => (this.orderListDetailTableModel = data), error => this.error = error);
  }

  getBasicSealInfo () {
    this.innerOrderService.
        getBasicSealInfo(this.orderNo, this.bumpId).
        subscribe((data) => (this.basicAndSealModel = data), error => this.error = error);
  }

  getOtherComponentInfo() {
    this.innerOrderService.
    getOtherComponentInfo(this.orderNo, this.bumpId).
        subscribe((data) => (this.otherComponentModel = data), error => this.error = error);
  }

  saveInnerOrder() {
    this.innerOrderService.
        saveInnerOrder(this.orderListDetailTableModel,this.basicAndSealModel,this.componentListTableData, this.basicPartListTableData, this.otherComponentModel).subscribe((data) => (console.log(data)), error => this.error = error);
  }
}