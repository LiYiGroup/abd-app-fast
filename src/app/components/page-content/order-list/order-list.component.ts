import { Component, OnInit } from '@angular/core';
import { OrderListSearchModel } from '../../../models/order-list.model'
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // SEARCH FORM
  orderListSearchModel = new OrderListSearchModel();
  orderListSearchSubmitData = {};
  // TABLE
  orderListTableAllChecked = false;
  orderListTableIndeterminate = false;
  orderListTableDisplayData = [];
  orderListTableCheckedData=[];
  orderListTableData = [
    {
      no : 1,
      orderNo : 'OrderNo1',
      contractNo : 'ContractNo1',
      projectNm : 'ProjectName1',
      departureDate : '2018/07/22',
      deliveryDate : '2018/09/10',
      orderCompany : 'Customer1',
      salesPerson : 'SalesMan1',
      remark : 'Demo1',
      checked : false,
      disabled: false
    },
    {
      no : 2,
      orderNo : 'OrderNo2',
      contractNo : 'ContractNo2',
      projectNm : 'ProjectName2',
      departureDate : '2018/07/22',
      deliveryDate : '2018/09/10',
      orderCompany : 'Customer2',
      salesPerson : 'SalesMan2',
      remark : 'Demo2',
      checked : false,
      disabled: false
    },
    {
      no : 3,
      orderNo : 'OrderNo3',
      contractNo : 'ContractNo3',
      projectNm : 'ProjectName3',
      departureDate : '2018/07/22',
      deliveryDate : '2018/09/10',
      orderCompany : 'Customer3',
      salesPerson : 'SalesMan3',
      remark : 'Demo3',
      checked : false,
      disabled: false
    }
  ];

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
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
}
