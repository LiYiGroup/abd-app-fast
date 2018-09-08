import { Component, OnInit, Input } from '@angular/core';
import { OrderListDetailFormModel, OrderListDetailTableModel } from '../../../models/order-list-detail.model';
import { OrderListDetailService } from './order-list-detail.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-list-detail.component.html',
  styleUrls: ['./order-list-detail.component.css'],
  providers: [ OrderListDetailService ]
})
export class OrderListDetailComponent implements OnInit {

  constructor(private orderListDetailService: OrderListDetailService, private message: NzMessageService, private location: Location,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getOrderListDetailForm();
    this.getOrderListDetailTable();
  }

  // MODEL
  isVisible = false;
  isOkLoading = false;

  //IS UPDATE FLG
  isUpdate = false;
  currentBumpInfo = new OrderListDetailTableModel();

  showModal(currentData: any): void {
    if (currentData == null) {
      // INSERT
      currentData = new OrderListDetailTableModel();
      var orderNo = this.route.snapshot.paramMap.get('orderNo');
      if (orderNo == null || orderNo == undefined) {
        // NEW ORDER, GET ORDER FROM FORM
        if (this.orderListDetailFormModel.ORDER_NO == null || this.orderListDetailFormModel.ORDER_NO == undefined) {
          // ERROR MSG HERE TODO..
          return;
        } else {
          currentData.ORDER_NO = this.orderListDetailFormModel.ORDER_NO;
        }
      } else {
        currentData.ORDER_NO = orderNo;
      }
    }
    // EDIT
    this.currentBumpInfo = currentData;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.saveOrderListDetailTable();
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1500);
  }

  handleCancel(): void {
    this.getOrderListDetailTable();
    this.isVisible = false;
  }

  // ERROR
  error: any;

  // ORDER LIST FORM
  orderListDetailFormModel = new OrderListDetailFormModel();
  orderListSearchSubmitData = {};

  // ORDER DETAIL LIST TABLE
  orderListDetailTableAllChecked = false;
  orderListDetailTableIndeterminate = false;
  orderListDetailTableDisplayData = [];
  orderListDetailTableCheckedData = [];
  orderListDetailTableData :Array<OrderListDetailTableModel>;

  orderDetailListCurrentPageDataChange($event: Array<any>): void {
    this.orderListDetailTableDisplayData = $event;
    this.refreshOrderDetailListStatus();
  }

  refreshOrderDetailListStatus(): void {
    const allChecked = this.orderListDetailTableDisplayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.orderListDetailTableDisplayData.filter(value => !value.disabled).every(value => !value.checked);
    this.orderListDetailTableAllChecked = allChecked;
    this.orderListDetailTableIndeterminate = (!allChecked) && (!allUnChecked);
    this.orderListDetailTableCheckedData = this.orderListDetailTableDisplayData.filter(e=>e.checked);
  }

  orderDetailListCheckAll(value: boolean): void {
    this.orderListDetailTableDisplayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshOrderDetailListStatus();
  }

  getOrderListDetailForm(): any {
    const orderNo = this.route.snapshot.paramMap.get('orderNo') == undefined ? null : this.route.snapshot.paramMap.get('orderNo').replace("|SLASH|","/");
    if (orderNo !== undefined && orderNo !== null) {
      this.orderListDetailService.getOrderListDetailForm(orderNo).subscribe((data) => (this.orderListDetailFormModel = data), error => this.error = error);
      this.isUpdate = true;
    }
  }

  getOrderListDetailTable(): any {

    const orderNo = this.route.snapshot.paramMap.get('orderNo') == undefined ? null : this.route.snapshot.paramMap.get('orderNo').replace("|SLASH|","/");

    if (orderNo !== undefined && orderNo !== null) {
      this.orderListDetailService.getOrderListDetailTable(orderNo).subscribe((data) => (this.orderListDetailTableData = data), error => this.error = error);
      this.isUpdate = true;
    }

  }

  deleteOrderListDetailTableData(bumpItem: any) {
    
    var submitList = [];

    const orderNo = this.route.snapshot.paramMap.get('orderNo') == undefined ? null : this.route.snapshot.paramMap.get('orderNo').replace("|SLASH|","/");

    if (bumpItem == undefined) {
      if (this.orderListDetailTableCheckedData.length > 0) {
        for (var i = 0; i < this.orderListDetailTableCheckedData.length; i++) {
          submitList.push(this.orderListDetailTableCheckedData[i].BUMP_ID.replace("/","|SLASH|"));
        }
        this.orderListDetailService.delOrderListDetailTableData(orderNo, submitList).subscribe(delRes => {this.message.success('删除成功！', { nzDuration: 1000 }); this.getOrderListDetailTable() }, error => this.error = error);
      }
    } else {
      submitList.push(bumpItem.BUMP_ID.replace("/","|SLASH|"));
      this.orderListDetailService.delOrderListDetailTableData(orderNo, submitList).subscribe(delRes => {this.message.success('删除成功！', { nzDuration: 1000 }); this.getOrderListDetailTable() }, error => this.error = error);
    }
  }

  saveOrderListDetailForm(orderListDetailFormModel: any) {
    this.orderListDetailService.saveOrderListDetailForm(orderListDetailFormModel).subscribe((data) => {(this.message.success('保存成功！', { nzDuration: 1000 }));this.location.back();}, error => this.error = error);
  }

  saveOrderListDetailTable() {
    this.orderListDetailService.saveOrderListDetailTable(this.currentBumpInfo).subscribe((data) => (this.getOrderListDetailTable()), error => this.message.error('请先保存订单！', { nzDuration: 1000 }));
  }

}
