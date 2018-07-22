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

  orderListSearchModel = new OrderListSearchModel();

  onSubmit() {
    console.log(this.orderListSearchModel);
  }
}
