import { Component, OnInit } from '@angular/core';
import { OtherComponentModelSearchModel} from '../../../models/other-component-model.model';
import { OtherComponentModelService } from './other-component-model.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-component-model',
  templateUrl: './other-component-model.component.html',
  styleUrls: ['./other-component-model.component.css'],
  providers: [ OtherComponentModelService ]
})
export class OtherComponentModelComponent implements OnInit {

  constructor(private OtherComponentModelService: OtherComponentModelService, private route: ActivatedRoute) { }

  // ERROR
  error: any;
  // SEARCH FORM
  otherComponentModelSearchModel = new OtherComponentModelSearchModel();

  orderListTableAllChecked = false;
  orderListTableIndeterminate = false;
  orderListTableDisplayData = [];
  orderListTableCheckedData :Array<OtherComponentModelSearchModel> = [];
  otherComponentModelTableData :Array<OtherComponentModelSearchModel>;

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

  currentBumpInfo = new OtherComponentModelSearchModel();

  showModal(currentData: any): void {
    if (currentData == null) {
      currentData = new OtherComponentModelSearchModel();
      var bump_type = this.route.snapshot.paramMap.get('bump_type');
      if (bump_type == null || bump_type == undefined) {
        // NEW ORDER, GET ORDER FROM FORM
        currentData.BUMP_TYPE = this.otherComponentModelSearchModel.BUMP_TYPE;
      } 
      else {
        currentData.BUMP_TYPE = bump_type;
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
    this.OtherComponentModelService.getOtherComponentModel().subscribe((data) => (this.otherComponentModelTableData = data), error => this.error = error);
  }
 
 getOtherComponentModelWithCondition(searchCondition: OtherComponentModelSearchModel) {
    this.OtherComponentModelService.getOtherComponentModelWithCondition(searchCondition).subscribe((data) => (this.otherComponentModelTableData = data), error => this.error = error);
  }

  //删除方法
deleteOtherComponentModelTableData(Item: any) {
    
var submitList = [];

if (Item == undefined) {
  if (this.orderListTableCheckedData.length > 0) {
    for (var i = 0; i < this.orderListTableCheckedData.length; i++) {
      submitList.push(this.orderListTableCheckedData[i].BUMP_TYPE);
    }
    this.OtherComponentModelService.deleteOtherComponentModelTableData(submitList).subscribe(delRes => {console.log(delRes.data); this.getOtherComponentModel() }, error => this.error = error);
 
 
  }
} else {
  submitList.push(Item.BUMP_TYPE);
  this.OtherComponentModelService.deleteOtherComponentModelTableData(submitList).subscribe(delRes => {console.log(delRes.data); this.getOtherComponentModel() }, error => this.error = error);
 }
}
//保存（插入）数据到数据库
  saveOtherComponentModelTable() {
    this.OtherComponentModelService.saveOtherComponentModelTable(this.currentBumpInfo).subscribe((data) => (this.getOtherComponentModel()), error => this.error = error);
  }
}
