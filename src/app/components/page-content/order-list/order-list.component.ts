import { Component, OnInit } from '@angular/core';
import { OrderListSearchModel, OrderListTableModel } from '../../../models/order-list.model';
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
  }

  // ERROR
  error: any;
  // SEARCH FORM
  orderListSearchModel = new OrderListSearchModel();
  orderListSearchSubmitData = {};
  // TABLE
  orderListTableAllChecked = false;
  orderListTableIndeterminate = false;
  orderListTableDisplayData = [];
  orderListTableCheckedData = [];
  orderListTableData :Array<OrderListTableModel>;

  currentPageDataChange($event: Array<any>): void {
    this.orderListTableDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.orderListTableDisplayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.orderListTableDisplayData.filter(value => !value.disabled).every(value => !value.checked);
    this.orderListTableAllChecked = allChecked;
    this.orderListTableIndeterminate = (!allChecked) && (!allUnChecked);
    this.orderListTableCheckedData = this.orderListTableData.filter(e=>e.checked);
  }

  checkAll(value: boolean): void {
    this.orderListTableDisplayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  onSubmit() {
    // DATE CONVERT
    this.orderListSearchModel.deliveryDateStStr = this.orderListSearchModel.deliveryDateSt.toLocaleDateString();
    this.orderListSearchModel.deliveryDateEdStr = this.orderListSearchModel.deliveryDateEd.toLocaleDateString();
    this.orderListSearchModel.departureDateStStr = this.orderListSearchModel.deliveryDateSt.toLocaleDateString();
    this.orderListSearchModel.departureDateEdStr = this.orderListSearchModel.deliveryDateEd.toLocaleDateString();
    // JSON
    console.log(JSON.stringify(this.orderListSearchModel));
  }

  showOrderList() {
    this.orderListService.getOrderList().subscribe((data) => (this.orderListTableData = data), error => this.error = error);
  }
}
