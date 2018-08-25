import { Component, OnInit } from '@angular/core';
import { OrderListSearchModel, OrderListTableModel, OrderDetailListTableModel } from '../../../models/order-list.model';
import { OrderListService } from './order-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [ OrderListService ]
})
export class OrderListComponent implements OnInit {  

  constructor(private orderListService: OrderListService,public router: Router) { }

  ngOnInit() {
    this.getOrderList();
    // this.getOrderDetailList();
  }

  // ERROR
  error: any;
  // SEARCH FORM
  orderListSearchModel = new OrderListSearchModel();
  orderListSearchSubmitData = {};
  // ORDER LIST TABLE
  orderListTableAllChecked = false;
  orderListTableIndeterminate = false;
  orderListTableDisplayData = [];
  orderListTableCheckedData :Array<OrderListTableModel> = [];
  orderListTableData :Array<OrderListTableModel>;

  // ORDER DETAIL LIST TABLE
  orderDetailListTableAllChecked = false;
  orderDetailListTableIndeterminate = false;
  orderDetailListTableDisplayData = [];
  orderDetailListTableCheckedData :Array<OrderDetailListTableModel> = [];
  orderDetailListTableData :Array<OrderDetailListTableModel>;

  orderListCurrentPageDataChange($event: Array<any>): void {
    this.orderListTableDisplayData = $event;
    this.refreshOrderListStatus();
  }

  orderDetailListCurrentPageDataChange($event: Array<any>): void {
    this.orderDetailListTableDisplayData = $event;
    this.refreshOrderDetailListStatus();
  }

  refreshOrderListStatus(): void {
    if(this.orderListTableDisplayData===null) {
      return;
    }
    const allChecked = this.orderListTableDisplayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.orderListTableDisplayData.filter(value => !value.disabled).every(value => !value.checked);
    this.orderListTableAllChecked = allChecked;
    this.orderListTableIndeterminate = (!allChecked) && (!allUnChecked);
    this.orderListTableCheckedData = this.orderListTableDisplayData.filter(e=>e.checked);
  }

  refreshOrderDetailListStatus(): void {
    const allChecked = this.orderDetailListTableDisplayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.orderDetailListTableDisplayData.filter(value => !value.disabled).every(value => !value.checked);
    this.orderDetailListTableAllChecked = allChecked;
    this.orderDetailListTableIndeterminate = (!allChecked) && (!allUnChecked);
    this.orderDetailListTableCheckedData = this.orderDetailListTableDisplayData.filter(e=>e.checked);
  }

  orderListCheckAll(value: boolean): void {
    this.orderListTableDisplayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshOrderListStatus();
  }

  orderDetailListCheckAll(value: boolean): void {
    this.orderDetailListTableDisplayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshOrderDetailListStatus();
  }

  getOrderList() {
    this.orderListService.getOrderList().subscribe((data) => (this.orderListTableData = data), error => this.error = error);
  }

  getOrderListDetailTable(orderItem: any) {
    var submitOrderNo = orderItem.ORDER_NO;
    this.orderListService.getOrderListDetailTable(submitOrderNo).subscribe((data) => (this.orderDetailListTableData = data), error => this.error = error);
  }

  getOrderListWithCondition(searchCondition: OrderListSearchModel) {
    this.orderListService.getOrderListWithCondition(searchCondition).subscribe((data) => (this.orderListTableData = data), error => this.error = error);
  }

  deleteOrderListItem(orderItem: any) {

    var submitList = [];

    if (orderItem == undefined) {
      if (this.orderListTableCheckedData.length > 0) {
        for (var i = 0; i < this.orderListTableCheckedData.length; i++) {
          submitList.push(this.orderListTableCheckedData[i].ORDER_NO);
        }
        this.orderListService.delOrderListItem(submitList).subscribe(delRes => {console.log(delRes.data); this.getOrderList(); this.orderDetailListTableData = [] }, error => this.error = error);
      }
    } else {
      submitList.push(orderItem.ORDER_NO);
      this.orderListService.delOrderListItem(submitList).subscribe(delRes => {console.log(delRes.data); this.getOrderList(); this.orderDetailListTableData = [] }, error => this.error = error);
    }
  }

  jumpToBOM() {
    if (this.orderDetailListTableCheckedData[0] == undefined) {
      return false;
    } else {
      this.router.navigate(['/order-list/bom'], {
        queryParams: {
          orderNo: this.orderDetailListTableCheckedData[0].ORDER_NO,
          bumpId: this.orderDetailListTableCheckedData[0].BUMP_ID
        }
      });
    }
  }

  handleUpload(obj) {
    if (obj.type == "success") {
      // REFRESH HERE
      this.getOrderList();
    }
  }
}