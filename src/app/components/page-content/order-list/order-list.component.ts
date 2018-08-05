import { Component, OnInit } from '@angular/core';
import { OrderListSearchModel, OrderListTableModel, OrderDetailListTableModel } from '../../../models/order-list.model';
import { OrderListService } from './order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [ OrderListService ]
})
export class OrderListComponent implements OnInit {  

  constructor(private orderListService: OrderListService) { }

  ngOnInit() {
    this.showOrderList();
    // this.showOrderDetailList();
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
  orderListTableCheckedData = [];
  orderListTableData :Array<OrderListTableModel>;

  // ORDER DETAIL LIST TABLE
  orderDetailListTableAllChecked = false;
  orderDetailListTableIndeterminate = false;
  orderDetailListTableDisplayData = [];
  orderDetailListTableCheckedData = [];
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

  onSubmit() {
    // DATE CONVERT
    this.orderListSearchModel.DELIVERY_DATE_ST_STR = this.orderListSearchModel.DELIVERY_DATE_ST.toLocaleDateString();
    this.orderListSearchModel.DELIVERY_DATE_ED_STR = this.orderListSearchModel.DELIVERY_DATE_ED.toLocaleDateString();
    this.orderListSearchModel.DEPARTURE_DATE_ST_STR = this.orderListSearchModel.DELIVERY_DATE_ST.toLocaleDateString();
    this.orderListSearchModel.DEPARTURE_DATE_ED_STR = this.orderListSearchModel.DELIVERY_DATE_ED.toLocaleDateString();
    // JSON
    console.log(JSON.stringify(this.orderListSearchModel));
  }

  showOrderList() {
    this.orderListService.getOrderList().subscribe((data) => (this.orderListTableData = data), error => this.error = error);
  }

  showOrderDetailList(orderItem: any) {
    var submitOrderNo = orderItem.ORDER_NO;
    this.orderListService.getOrderDetailList(submitOrderNo).subscribe((data) => (this.orderDetailListTableData = data), error => this.error = error);
  }
}
