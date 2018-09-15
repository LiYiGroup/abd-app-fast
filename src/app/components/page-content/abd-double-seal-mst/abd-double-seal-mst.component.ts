import { Component, OnInit } from '@angular/core';
import { AbdDoubleSealMstSearchModel} from '../../../models/abd-double-seal-mst.model';
import { AbdDoubleSealMstService } from './abd-double-seal-mst.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'abd-double-seal-mst',
  templateUrl: './abd-double-seal-mst.component.html',
  styleUrls: ['./abd-double-seal-mst.component.css'],
  providers: [ AbdDoubleSealMstService ]
})
export class AbdDoubleSealMstComponent implements OnInit {

  constructor(private AbdDoubleSealMstService: AbdDoubleSealMstService, private message: NzMessageService, private route: ActivatedRoute) { }

  // ERROR
  error: any;
  // SEARCH FORM
  otherComponentModelSearchModel = new AbdDoubleSealMstSearchModel();

  orderListTableAllChecked = false;
  orderListTableIndeterminate = false;
  orderListTableDisplayData = [];
  orderListTableCheckedData :Array<AbdDoubleSealMstSearchModel> = [];
  otherComponentModelTableData :Array<AbdDoubleSealMstSearchModel>;

  orderListCurrentPageDataChange($event: Array<any>): void {
    this.orderListTableDisplayData = $event;
    this.refreshOrderListStatus();
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
  orderListCheckAll(value: boolean): void {
    this.orderListTableDisplayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshOrderListStatus();
  }

  //show model
  isVisible = false;
  isOkLoading = false;

  currentBumpInfo = new AbdDoubleSealMstSearchModel();

  showModal(currentData: any): void {
    if (currentData == null) {
      currentData = new AbdDoubleSealMstSearchModel();
      var bump_type = this.route.snapshot.paramMap.get('bump_type');
      if (bump_type == null || bump_type == undefined) {
        // NEW ORDER, GET ORDER FROM FORM
        currentData.ID = this.otherComponentModelSearchModel.ID;
      } 
      else {
        currentData.ID = bump_type;
      }
    }
    this.currentBumpInfo = currentData;
    this.isVisible = true;
  }
  
  handleOk(): void {
    this.isOkLoading = true;
    this.saveOtherComponentModelTable();
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1500);
  }

  handleCancel(): void {
    this.getOtherComponentModel();
    this.isVisible = false;
  }

  ngOnInit() {
    this.getOtherComponentModel();
  }

  //查询方法
  getOtherComponentModel() {
    this.AbdDoubleSealMstService.getOtherComponentModel().subscribe((data) => (this.otherComponentModelTableData = data), error => this.error = error);
  }
 
 getOtherComponentModelWithCondition(searchCondition: AbdDoubleSealMstSearchModel) {
    this.AbdDoubleSealMstService.getOtherComponentModelWithCondition(searchCondition).subscribe((data) => (this.otherComponentModelTableData = data), error => this.error = error);
  }

  //删除方法
deleteOtherComponentModelTableData(Item: any) {
    
var submitList = [];

if (Item == undefined) {
  if (this.orderListTableCheckedData.length > 0) {
    for (var i = 0; i < this.orderListTableCheckedData.length; i++) {
      submitList.push(this.orderListTableCheckedData[i].ID);
    }
    this.AbdDoubleSealMstService.deleteOtherComponentModelTableData(submitList).subscribe(delRes => {this.message.success('删除成功！', { nzDuration: 1000 }); this.getOtherComponentModel() }, error => this.error = error);
 
 
  }
} else {
  submitList.push(Item.ID);
  this.AbdDoubleSealMstService.deleteOtherComponentModelTableData(submitList).subscribe(delRes => {this.message.success('删除成功！', { nzDuration: 1000 }); this.getOtherComponentModel() }, error => this.error = error);
 }
}
//保存（插入）数据到数据库
  saveOtherComponentModelTable() {
    this.AbdDoubleSealMstService.saveOtherComponentModelTable(this.currentBumpInfo).subscribe((data) => (this.getOtherComponentModel()), error => this.error = error);
  }
}
