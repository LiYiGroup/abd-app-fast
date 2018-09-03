import { Component, OnInit } from '@angular/core';
import { AbdSingleSealMstSearchModel} from '../../../models/abd-single-seal-mst.model';
import { AbdSingleSealMstService } from './abd-single-seal-mst.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'abd-single-seal-mst',
  templateUrl: './abd-single-seal-mst.component.html',
  styleUrls: ['./abd-single-seal-mst.component.css'],
  providers: [ AbdSingleSealMstService ]
})
export class AbdSingleSealMstComponent implements OnInit {

  constructor(private OtherComponentModelService: AbdSingleSealMstService, private route: ActivatedRoute) { }

  // ERROR
  error: any;
  // SEARCH FORM
  otherComponentModelSearchModel = new AbdSingleSealMstSearchModel();

  orderListTableAllChecked = false;
  orderListTableIndeterminate = false;
  orderListTableDisplayData = [];
  orderListTableCheckedData :Array<AbdSingleSealMstSearchModel> = [];
  otherComponentModelTableData :Array<AbdSingleSealMstSearchModel>;

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

  currentBumpInfo = new AbdSingleSealMstSearchModel();

  showModal(currentData: any): void {
    if (currentData == null) {
      currentData = new AbdSingleSealMstSearchModel();
      var bump_type = this.route.snapshot.paramMap.get('bump_type');
      if (bump_type == null || bump_type == undefined) {
        // NEW ORDER, GET ORDER FROM FORM
        currentData.BUMP_TYPE = this.otherComponentModelSearchModel.ID;
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
 
 getOtherComponentModelWithCondition(searchCondition: AbdSingleSealMstSearchModel) {
    this.OtherComponentModelService.getOtherComponentModelWithCondition(searchCondition).subscribe((data) => (this.otherComponentModelTableData = data), error => this.error = error);
  }

  //删除方法
deleteOtherComponentModelTableData(Item: any) {
    
var submitList = [];

if (Item == undefined) {
  if (this.orderListTableCheckedData.length > 0) {
    for (var i = 0; i < this.orderListTableCheckedData.length; i++) {
      submitList.push(this.orderListTableCheckedData[i].ID);
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

