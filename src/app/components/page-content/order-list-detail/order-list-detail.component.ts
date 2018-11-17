import { Component, OnInit, Input } from '@angular/core';
import { OrderListDetailFormModel, OrderListDetailTableModel } from '../../../models/order-list-detail.model';
import { mDict } from '../../../models/m-dict';
import { AccessoriesTemplateModel } from '../../../models/accessories-template.model';
import { OrderListAttachmentTableModel } from '../../../models/order-list-attachment.model';
import { OrderListDetailService } from './order-list-detail.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-list-detail.component.html',
  styleUrls: ['./order-list-detail.component.css'],
  providers: [OrderListDetailService]
})
export class OrderListDetailComponent implements OnInit {

  constructor(private orderListDetailService: OrderListDetailService, private message: NzMessageService, public router: Router, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMdictInfo();
    this.getOrderListDetailForm();
    this.getOrderListDetailTable();
    this.getOrderListAttachment();
    this.getAccessoriesTemplate();
/*     this.message.success(this.orderListDetailTableData.length.toString());
    for (var i = 0; i < this.orderListDetailTableData.length; i++) {
      this.message.success("1");
      this.OrderListDetail_AMT = this.OrderListDetail_AMT + this.orderListDetailTableData[i].AMOUNT;
    }
    this.message.success(this.OrderListDetail_AMT.toString()); */
  }

/*   OrderListDetail_AMT = 0;
  AccessoriesTemp_AMT = 0; */
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

  // MODEL
  isVisibleAcc = false;
  isOkLoadingAcc = false;

  //IS UPDATE FLG
  isUpdateAcc = false;
  currentAccInfo = new AccessoriesTemplateModel();
  showModalAcc(currentData: any): void {
    if (currentData == null) {
      // INSERT
      currentData = new AccessoriesTemplateModel();
      var orderNo = this.route.snapshot.paramMap.get('orderNo');
      if (orderNo == null || orderNo == undefined) {
        // NEW ORDER, GET ORDER FROM FORM
        if (this.accessoriesTemplateFormModel.ORDER_NO == null || this.accessoriesTemplateFormModel.ORDER_NO == undefined) {
          // ERROR MSG HERE TODO..
          return;
        } else {
          currentData.ORDER_NO = this.accessoriesTemplateFormModel.ORDER_NO;
        }
      } else {
        currentData.ORDER_NO = orderNo;
      }
    }
    // EDIT
    this.currentAccInfo = currentData;
    this.isVisibleAcc = true;
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

  handleOkAcc(): void {
    this.isOkLoadingAcc = true;
    this.saveAccessoriesTemplateTable();
    window.setTimeout(() => {
      this.isVisibleAcc = false;
      this.isOkLoadingAcc = false;
    }, 1500);
  }

  handleCancelAcc(): void {
    this.getAccessoriesTemplate();
    this.isVisibleAcc = false;
  }

  // ERROR
  error: any;

  // ORDER LIST FORM
  orderListDetailFormModel = new OrderListDetailFormModel();
  orderListSearchSubmitData = {};

  accessoriesTemplateFormModel = new AccessoriesTemplateModel();
  // ORDER DETAIL LIST TABLE
  orderListDetailTableAllChecked = false;
  orderListDetailTableIndeterminate = false;
  orderListDetailTableDisplayData = [];
  orderListDetailTableCheckedData = [];
  orderListDetailTableData: Array<OrderListDetailTableModel>;

  accessoriesTemplateTableAllChecked = false;
  accessoriesTemplateTableIndeterminate = false;
  accessoriesTemplateTableDisplayData = [];
  accessoriesTemplateTableCheckedData = [];
  accessoriesTemplateTableData: Array<AccessoriesTemplateModel>;

  orderDetailListCurrentPageDataChange($event: Array<any>): void {
    this.orderListDetailTableDisplayData = $event;
    this.refreshOrderDetailListStatus();
  }

  accessoriesTemplateCurrentPageDataChange($event: Array<any>): void {
    this.accessoriesTemplateTableDisplayData = $event;
    this.refreshaccessoriesTemplateStatus();
  }

  refreshOrderDetailListStatus(): void {
    const allChecked = this.orderListDetailTableDisplayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.orderListDetailTableDisplayData.filter(value => !value.disabled).every(value => !value.checked);
    this.orderListDetailTableAllChecked = allChecked;
    this.orderListDetailTableIndeterminate = (!allChecked) && (!allUnChecked);
    this.orderListDetailTableCheckedData = this.orderListDetailTableDisplayData.filter(e => e.checked);
  }

  refreshaccessoriesTemplateStatus(): void {
    const allChecked = this.accessoriesTemplateTableDisplayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.accessoriesTemplateTableDisplayData.filter(value => !value.disabled).every(value => !value.checked);
    this.accessoriesTemplateTableAllChecked = allChecked;
    this.accessoriesTemplateTableIndeterminate = (!allChecked) && (!allUnChecked);
    this.accessoriesTemplateTableCheckedData = this.accessoriesTemplateTableDisplayData.filter(e => e.checked);
  }

  orderDetailListCheckAll(value: boolean): void {
    this.orderListDetailTableDisplayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshOrderDetailListStatus();
  }

  accessoriesTemplateCheckAll(value: boolean): void {
    this.accessoriesTemplateTableDisplayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshaccessoriesTemplateStatus();
  }

  getOrderListDetailForm(): any {
    const orderNo = this.route.snapshot.paramMap.get('orderNo') == undefined ? null : this.route.snapshot.paramMap.get('orderNo').replace("|SLASH|", "/");
    if (orderNo !== undefined && orderNo !== null) {
      this.orderListDetailService.getOrderListDetailForm(orderNo).subscribe((data) => (this.orderListDetailFormModel = data), error => this.error = error);
      this.isUpdate = true;
    }
  }

  getOrderListDetailTable(): any {

    const orderNo = this.route.snapshot.paramMap.get('orderNo') == undefined ? null : this.route.snapshot.paramMap.get('orderNo').replace("|SLASH|", "/");

    if (orderNo !== undefined && orderNo !== null) {
      this.orderListDetailService.getOrderListDetailTable(orderNo).subscribe((data) => (this.orderListDetailTableData = data), error => this.error = error);
      this.isUpdate = true;
    }
  }

  getAccessoriesTemplate(): any {
    const orderNo = this.route.snapshot.paramMap.get('orderNo') == undefined ? null : this.route.snapshot.paramMap.get('orderNo').replace("|SLASH|", "/");
    if (orderNo !== undefined && orderNo !== null) {
      this.orderListDetailService.getAccessoriesTemplate(orderNo).subscribe((data) => (this.accessoriesTemplateTableData = data), error => this.error = error);
      this.isUpdateAcc = true;
    }
  }

  deleteOrderListDetailTableData(bumpItem: any) {

    var submitList = [];

    const orderNo = this.route.snapshot.paramMap.get('orderNo') == undefined ? null : this.route.snapshot.paramMap.get('orderNo').replace("|SLASH|", "/");

    if (bumpItem == undefined) {
      if (this.orderListDetailTableCheckedData.length > 0) {
        for (var i = 0; i < this.orderListDetailTableCheckedData.length; i++) {
          submitList.push(this.orderListDetailTableCheckedData[i].BUMP_ID.replace("/", "|SLASH|"));
        }
        this.orderListDetailService.delOrderListDetailTableData(orderNo, submitList).subscribe(delRes => { this.message.success('删除成功！', { nzDuration: 1000 }); this.getOrderListDetailTable() }, error => this.error = error);
      }
    } else {
      submitList.push(bumpItem.BUMP_ID.replace("/", "|SLASH|"));
      this.orderListDetailService.delOrderListDetailTableData(orderNo, submitList).subscribe(delRes => { this.message.success('删除成功！', { nzDuration: 1000 }); this.getOrderListDetailTable() }, error => this.error = error);
    }
  }

  deleteAccessoriesTemplateTableData(AccItem: any) {
    const orderNo = this.route.snapshot.paramMap.get('orderNo') == undefined ? null : this.route.snapshot.paramMap.get('orderNo').replace("|SLASH|", "/");

    if (AccItem == undefined) {
      if (this.accessoriesTemplateTableCheckedData.length > 0) {

        this.orderListDetailService.delAccessoriesTemplateData(this.accessoriesTemplateTableCheckedData[0].SEQ_ID).subscribe(delRes => { this.message.success('删除成功！', { nzDuration: 1000 }); this.getAccessoriesTemplate() }, error => this.error = error);
      }
    }
  }

  saveOrderListDetailForm(orderListDetailFormModel: any, orderListAttachment: any) {
    orderListAttachment.ORDER_NO = orderListDetailFormModel.ORDER_NO;
    this.orderListDetailService.saveOrderListAttachment(orderListAttachment).subscribe((data) => { (this.message.success('随货资料保存成功！', { nzDuration: 1000 })); this.location.back(); }, error => this.error = error);
    this.orderListDetailService.saveOrderListDetailForm(orderListDetailFormModel).subscribe((data) => { (this.message.success('订单信息保存成功！', { nzDuration: 1000 })); this.location.back(); }, error => this.error = error);
  }

  saveOrderListDetailTable() {
    this.orderListDetailService.saveOrderListDetailTable(this.currentBumpInfo).subscribe((data) => (this.getOrderListDetailTable()), error => console.log(error));
  }

  saveAccessoriesTemplateTable() {
    this.orderListDetailService.saveAccessoriesTemplateTable(this.currentAccInfo).subscribe((data) => (this.getAccessoriesTemplate()), error => console.log(error));
  }

  mDictDebug = new mDict();
  mDictTexRate = new mDict();
  mDictMotor = new mDict();
  mDictSealForm = new mDict();
  mDictSealBrand = new mDict();
  mDictRollerBrand = new mDict();
  mDictCoupling = new mDict();
  mDictSealCooler = new mDict();
  mDictFlangesStd = new mDict();
  mDictFlangesLvl = new mDict();
  mDictBase = new mDict();
  mDictCouplingHood = new mDict();
  mDictAnchorBolt = new mDict();
  mDictPaint = new mDict();
  mDictSurfaceTreatment = new mDict();
  mDictPackage = new mDict();
  mDictTransport = new mDict();
  mDictQualification = new mDict();
  mDictIdentification = new mDict();
  mDictProductSample = new mDict();
  mDictDynamicReport = new mDict();
  mDictStaticReport = new mDict();
  mDictPerformanceReport = new mDict();
  mDictBlueprint = new mDict();
  mDictPerformanceCurve = new mDict();

  getMdictInfo(): any {
    this.orderListDetailService.getmDictDebug().subscribe((data) => (this.mDictDebug = data), error => this.error = error);
    this.orderListDetailService.getmDictTexRate().subscribe((data) => (this.mDictTexRate = data), error => this.error = error);
    this.orderListDetailService.getmDictMotor().subscribe((data) => (this.mDictMotor = data), error => this.error = error);
    this.orderListDetailService.getmDictSealForm().subscribe((data) => (this.mDictSealForm = data), error => this.error = error);
    this.orderListDetailService.getmDictSealBrand().subscribe((data) => (this.mDictSealBrand = data), error => this.error = error);
    this.orderListDetailService.getmDictRollerBrand().subscribe((data) => (this.mDictRollerBrand = data), error => this.error = error);
    this.orderListDetailService.getmDictCoupling().subscribe((data) => (this.mDictCoupling = data), error => this.error = error);
    this.orderListDetailService.getmDictSealCooler().subscribe((data) => (this.mDictSealCooler = data), error => this.error = error);
    this.orderListDetailService.getmDictFlangesStd().subscribe((data) => (this.mDictFlangesStd = data), error => this.error = error);
    this.orderListDetailService.getmDictFlangesLvl().subscribe((data) => (this.mDictFlangesLvl = data), error => this.error = error);
    this.orderListDetailService.getmDictBase().subscribe((data) => (this.mDictBase = data), error => this.error = error);
    this.orderListDetailService.getmDictCouplingHood().subscribe((data) => (this.mDictCouplingHood = data), error => this.error = error);
    this.orderListDetailService.getmDictAnchorBolt().subscribe((data) => (this.mDictAnchorBolt = data), error => this.error = error);
    this.orderListDetailService.getmDictPaint().subscribe((data) => (this.mDictPaint = data), error => this.error = error);
    this.orderListDetailService.getmDictSurfaceTreatment().subscribe((data) => (this.mDictSurfaceTreatment = data), error => this.error = error);
    this.orderListDetailService.getmDictPackage().subscribe((data) => (this.mDictPackage = data), error => this.error = error);
    this.orderListDetailService.getmDictTransport().subscribe((data) => (this.mDictTransport = data), error => this.error = error);
    this.orderListDetailService.getmDictQualification().subscribe((data) => (this.mDictQualification = data), error => this.error = error);
    this.orderListDetailService.getmDictIdentification().subscribe((data) => (this.mDictIdentification = data), error => this.error = error);
    this.orderListDetailService.getmDictProductSample().subscribe((data) => (this.mDictProductSample = data), error => this.error = error);
    this.orderListDetailService.getmDictDynamicReport().subscribe((data) => (this.mDictDynamicReport = data), error => this.error = error);
    this.orderListDetailService.getmDictStaticReport().subscribe((data) => (this.mDictStaticReport = data), error => this.error = error);
    this.orderListDetailService.getmDictPerformanceReport().subscribe((data) => (this.mDictPerformanceReport = data), error => this.error = error);
    this.orderListDetailService.getmDictBlueprint().subscribe((data) => (this.mDictBlueprint = data), error => this.error = error);
    this.orderListDetailService.getmDictPerformanceCurve().subscribe((data) => (this.mDictPerformanceCurve = data), error => this.error = error);

  }

  orderListAttachment = new OrderListAttachmentTableModel();
  getOrderListAttachment(): any {
    const orderNo = this.route.snapshot.paramMap.get('orderNo') == undefined ? null : this.route.snapshot.paramMap.get('orderNo').replace("|SLASH|", "/");
    if (orderNo !== undefined && orderNo !== null) {
      this.orderListDetailService.getOrderListAttachment(orderNo).subscribe((data) => (this.orderListAttachment = data), error => this.error = error);
    }
  }

  jumpToBOM() {
    if (this.orderListDetailTableCheckedData[0] == undefined) {
      return false;
    } else {
      this.router.navigate(['/order-list/bom'], {
        queryParams: {
          // 同时勾选多个时，进入第一个的泵信息
          orderNo: this.orderListDetailTableCheckedData[0].ORDER_NO,
          bumpId: this.orderListDetailTableCheckedData[0].BUMP_ID
        }
      });
    }
  }
}
