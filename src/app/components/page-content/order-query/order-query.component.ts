import { Component, OnInit } from '@angular/core';
import { OrderQuerySearchModel} from '../../../models/order-query.model';
import { OrderQueryTableModel} from '../../../models/order-query.model';
import { OrderQueryService } from './order-query.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.css'],
  providers: [ OrderQueryService ]
})
export class OrderQueryComponent implements OnInit {

  constructor(private OrderQueryService: OrderQueryService, private message: NzMessageService, private route: ActivatedRoute) { }

  // ERROR
  error: any;
  // SEARCH FORM
  orderQuerySearchModel = new OrderQuerySearchModel();

  orderListTableIndeterminate = false;
  orderListTableDisplayData = [];
  orderQueryTableData :Array<OrderQueryTableModel>;

  orderListCurrentPageDataChange($event: Array<any>): void {
    this.orderListTableDisplayData = $event;
    this.refreshOrderListStatus();
  }
  refreshOrderListStatus(): void {
    if(this.orderListTableDisplayData===null) {
      return;
    }    
  }
  
  //show model
  isVisible = false;
  isOkLoading = false;

  currentOrderInfo = new OrderQueryTableModel();
  
  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1500);
  }

  handleCancel(): void {
    this.getOrderQueryModel();
    this.isVisible = false;
  }

  ngOnInit() {
    this.getOrderQueryModel();
  }

  //查询方法
  getOrderQueryModel() {
    this.OrderQueryService.getOrderQueryModel().subscribe((data) => (this.orderQueryTableData = data), error => this.error = error);
  }
 
  getOrderQueryWithCondition(searchCondition: OrderQuerySearchModel) {
    this.OrderQueryService.getOrderQueryWithCondition(searchCondition).subscribe((data) => (this.orderQueryTableData = data), error => this.error = error);
  }

}
