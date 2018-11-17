import { Component, OnInit } from '@angular/core';
import { BasicAndSealModel, BasicPartListTableModel, ComponentListTableModel, OtherComponentModel } from '../../../models/inner-order.model';
import { OrderListDetailTableModel } from '../../../models/order-list-detail.model';
import { ActivatedRoute } from '@angular/router';
import { InnerOrderService } from './inner-order.service';
import { AbdIntegrateSealMstService } from '../abd-integrate-seal-mst/abd-integrate-seal-mst.service';
import { AbdSingleSealMstService } from '../abd-single-seal-mst/abd-single-seal-mst.service';
import { AbdDoubleSealMstService } from '../abd-double-seal-mst/abd-double-seal-mst.service';
import { AbdSingleSealMstSearchModel } from '../../../models/abd-single-seal-mst.model';
import { AbdDoubleSealMstSearchModel } from '../../../models/abd-double-seal-mst.model';
import { AbdIntegrateSealMstSearchModel } from '../../../models/abd-integrate-seal-mst.model';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-inner-order',
  templateUrl: './inner-order.component.html',
  styleUrls: ['./inner-order.component.css'],
  providers: [ InnerOrderService ]
})
export class InnerOrderComponent implements OnInit {

  constructor(public activeRouter: ActivatedRoute, private innerOrderService: InnerOrderService,
              private abdSingleSealMstService: AbdSingleSealMstService,
              private abdDoubleSealMstService: AbdDoubleSealMstService,
              private abdIntegrateSealMstService: AbdIntegrateSealMstService,
              private message: NzMessageService) { }

  // ERROR
  error: any;

  // KEY
  orderNo: string;
  bumpId: string;

  // MODEL
  isVisible = false;

  ABDSingleTableData = new Array<AbdSingleSealMstSearchModel>();
  ABDDoubleTableData = new Array<AbdDoubleSealMstSearchModel>();
  ABDIntegrateTableData = new Array<AbdIntegrateSealMstSearchModel>();

  showABDSingleTableDataModal(): void {
    // EDIT
    this.isVisible = true;
    // GET DATA HERE
    switch (this.basicAndSealModel.SEAL_TYPE) {
      case "ABD_SINGLE":
        // TODO
        this.abdSingleSealMstService.getOtherComponentModel().subscribe((data) => (this.ABDSingleTableData = data), error => this.error = error);
        break;
      case "ABD_DOUBLE":
        // TODO
        this.abdDoubleSealMstService.getOtherComponentModel().subscribe((data) => (this.ABDDoubleTableData = data), error => this.error = error);
        break;
      case "ABD_INTEGRATE":
        // TODO
        this.abdIntegrateSealMstService.getOtherComponentModel().subscribe((data) => (this.ABDIntegrateTableData = data), error => this.error = error);
        break;
      default: 
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.basicAndSealModel.ABD_SEAL_INFO = "";
  }
  
  // ---------FORM OBJECTS START---------
  // ORDER LIST FORM
  basicAndSealModel = new BasicAndSealModel();
  otherComponentModel = new OtherComponentModel();
  // GRID
  bumpInfoInGrid = new ComponentListTableModel();
  componentListTableData: Array<ComponentListTableModel>;
  basicPartListTableData: Array<BasicPartListTableModel>;
  // ---------FORM OBJECTS END-----------

  // LOAD ITEM BELOW WHEN INIT
  orderListDetailTableModel = new OrderListDetailTableModel();

  ngOnInit() {
    this.activeRouter.queryParams.subscribe(params => {
      this.orderListDetailTableModel.ORDER_NO = params.orderNo;
      this.orderListDetailTableModel.BUMP_ID = params.bumpId;
      this.orderNo = params.orderNo;
      this.bumpId = params.bumpId; 
      // GET BUMP DATA THROUGH BUMPID AND ORDERNO
      this.getExistedBumpInfo();
      this.getBasicSealInfo();
    });
  }

  getExistedBumpInfo () {
    this.innerOrderService
        .getExistedBumpInfo(this.orderNo, this.bumpId)
        .subscribe((data) => {if(data){this.orderListDetailTableModel = data ; this.getAbdStdInfo()}}, error => this.error = error);
  }

  getBasicSealInfo () {
    this.innerOrderService
        .getBasicSealInfo(this.orderNo, this.bumpId)
        .subscribe((data) => {if(data){this.basicAndSealModel = data;this.getOtherComponentInfo()}}, error => this.error = error);
  }

  getOtherComponentInfo() {
    this.innerOrderService
        .getOtherComponentInfo(this.orderNo, this.bumpId)
        .subscribe((data) => {if(data){this.otherComponentModel = data};this.getDisplayGridData()}, error => this.error = error);
  }

  saveInnerOrder() {
    // 处理未选择选项

    // 密封种类
    switch (this.basicAndSealModel.SEAL_TYPE) {
      case "PACKING":
        this.basicAndSealModel.ABD_SEAL_INFO = "";
        this.basicAndSealModel.OTHER_SEAL_PROVIDER = "";
        this.basicAndSealModel.OTHER_SEAL_INFO = "";
        this.basicAndSealModel.OTHER_SEAL_MODEL = "";
        break;
      case "ABD_SINGLE":
        this.basicAndSealModel.SEAL_MATERIAL = "";
        this.basicAndSealModel.OTHER_SEAL_PROVIDER = "";
        this.basicAndSealModel.OTHER_SEAL_INFO = "";
        this.basicAndSealModel.OTHER_SEAL_MODEL = "";
        break;   
      case "ABD_DOUBLE":
        this.basicAndSealModel.SEAL_MATERIAL = "";
        this.basicAndSealModel.OTHER_SEAL_PROVIDER = "";
        this.basicAndSealModel.OTHER_SEAL_INFO = "";
        this.basicAndSealModel.OTHER_SEAL_MODEL = "";
        break;
      case "ABD_INTEGRATE":
        this.basicAndSealModel.SEAL_MATERIAL = "";
        this.basicAndSealModel.OTHER_SEAL_PROVIDER = "";
        this.basicAndSealModel.OTHER_SEAL_INFO = "";
        this.basicAndSealModel.OTHER_SEAL_MODEL = "";
        break;
      case "OTHER":
        this.basicAndSealModel.SEAL_MODEL = "";
        this.basicAndSealModel.SEAL_MATERIAL = "";
        this.basicAndSealModel.ABD_SEAL_INFO = "";
        break;
      default:
        // 不作处理
    }

    // 机封冷却器
    if (this.basicAndSealModel.NEED_SEAL_COOLER_FLG == "N/A") {
        this.basicAndSealModel.SEAL_COOLER_MODEL = "";
    }

    // 轴承品牌
    if (this.basicAndSealModel.BEARING_BRAND != "OTHER") {
      this.basicAndSealModel.BEARING_OTHER_INFO = "";
    }

    // 底座
    switch (this.otherComponentModel.BASE_TYPE) {
      case "ABD_BASE":
        this.otherComponentModel.SPECIAL_BASE_DETAIL = "";
        break;
      case "N/A":
        this.otherComponentModel.SPECIAL_BASE_DETAIL = "";
        this.otherComponentModel.BASE_SPEC = "";
        break;
      case "SPECIAL_BASE":
        // 不作处理
    }

    // 联轴器罩
    switch (this.otherComponentModel.COUPLING_HOOD_TYPE) {
      case "ABD_HOOD_TYPE":
        this.otherComponentModel.SPECIAL_HOOD_TYPE_DETAIL = "";
        break;
      case "N/A":
        this.otherComponentModel.SPECIAL_HOOD_TYPE_DETAIL = "";
        this.otherComponentModel.COUPLING_HOOD_SPEC = "";
        break;
      case "SPECIAL_HOOD_TYPE":
        // 不作处理
    }

    // 地脚螺栓
    if (this.otherComponentModel.ANCHOR_BOLT_TYPE != "NEED") {
      this.otherComponentModel.ANCHOR_BOLT_EXTRA_NUT_SPEC = "";
      this.otherComponentModel.ANCHOR_BOLT_EXTRA_PAD_SPEC = "";
      this.otherComponentModel.ANCHOR_BOLT_MATERIAL = "";
      this.otherComponentModel.ANCHOR_BOLT_NUM = 0;
      this.otherComponentModel.ANCHOR_BOLT_SPEC = "";
    }

    // 联轴器
    switch (this.otherComponentModel.COUPLING_TYPE) {
      case "ABD_ELASTIC_PIN_COUPLING_TYPE":
        this.otherComponentModel.COUPLING_PROVIDER = "";
        this.otherComponentModel.COUPLING_SPEC = "";
        this.otherComponentModel.COUPLING_NUM = 0;
        this.otherComponentModel.SPECIAL_COUPLING_TYPE_DETAIL = "";
        break;
      case "ABD_ELONGATED_COUPLING_TYPE":
        this.otherComponentModel.COUPLING_BUMP_COUPLET = "";
        this.otherComponentModel.COUPLING_ELECTRIC_COUPLET = "";
        this.otherComponentModel.COUPLING_PIN = "";
        this.otherComponentModel.COUPLING_JUMP_RING = "";
        this.otherComponentModel.SPECIAL_COUPLING_TYPE_DETAIL = "";
        break;
      case "SPECIAL_COUPLING_TYPE":
        this.otherComponentModel.COUPLING_BUMP_COUPLET = "";
        this.otherComponentModel.COUPLING_ELECTRIC_COUPLET = "";
        this.otherComponentModel.COUPLING_PIN = "";
        this.otherComponentModel.COUPLING_JUMP_RING = "";
      case "N/A":
        this.otherComponentModel.COUPLING_BUMP_COUPLET = "";
        this.otherComponentModel.COUPLING_ELECTRIC_COUPLET = "";
        this.otherComponentModel.COUPLING_PIN = "";
        this.otherComponentModel.COUPLING_JUMP_RING = "";
        this.otherComponentModel.COUPLING_PROVIDER = "";
        this.otherComponentModel.COUPLING_SPEC = "";
        this.otherComponentModel.COUPLING_NUM = 0;
        this.otherComponentModel.SPECIAL_COUPLING_TYPE_DETAIL = "";
        break;
      default:
        // 不作处理
    }

    // 电机
    if (this.otherComponentModel.ELECTRIC_MOTER_TYPE != "NEED") {
      this.otherComponentModel.ELECTRIC_MOTER_PROVIDER = "";
      this.otherComponentModel.ELECTRIC_MOTER_POWER = 0;
      this.otherComponentModel.ELECTRIC_MOTER_SPEED = 0;
      this.otherComponentModel.ELECTRIC_MOTER_PFV = "";
      this.otherComponentModel.ELECTRIC_MOTER_EXTRA_INFO = "";
    }

    // 色标代号
    if (this.otherComponentModel.COLOR_TYPE != "SPECIAL_COLOR") {
      this.otherComponentModel.SPECIAL_COLOR_DETAIL = "";
    }

    // 表面特殊处理要求
    if (this.otherComponentModel.SURFACE_TREAT_TYPE != "NEED") {
      this.otherComponentModel.SURFACE_TREAT_EXTRA_INFO = "";
    }

    // 包装要求
    switch (this.otherComponentModel.PACKAGING_TYPE) {
      case "ABD_PACK":
        this.otherComponentModel.NEED_FUME_CERTIFICATE = "";
        this.otherComponentModel.SPECIAL_PACK_DETAIL = "";
      case "HOLLOWED_WOOD_PACK":
        this.otherComponentModel.NEED_FUME_CERTIFICATE = "";
        this.otherComponentModel.SPECIAL_PACK_DETAIL = "";
      case "CLOSURE_WOOD_PACK":
        this.otherComponentModel.NEED_FUME_CERTIFICATE = "";
        this.otherComponentModel.SPECIAL_PACK_DETAIL = "";
      case "EXPORT_STANDARD_PACK":
        this.otherComponentModel.SPECIAL_PACK_DETAIL = "";
      case "SPECIAL_PACK":
        this.otherComponentModel.NEED_FUME_CERTIFICATE = ""; 
      default:
        // 不作处理
    }

    // 保存操作
    this.innerOrderService.
        saveInnerOrder(this.orderListDetailTableModel,this.basicAndSealModel,this.componentListTableData, this.basicPartListTableData, this.otherComponentModel).subscribe((data) => (this.message.success('保存成功！', { nzDuration: 1000 })), error => this.error = error);
  }

  selectSingleItem (modelItem: AbdSingleSealMstSearchModel) {
    this.basicAndSealModel.ABD_SEAL_INFO = this.makeSealInfoStr("S", modelItem);
    this.isVisible =false;
  }

  selectDoubleItem (modelItem: AbdDoubleSealMstSearchModel) {
    this.basicAndSealModel.ABD_SEAL_INFO = this.makeSealInfoStr("D", modelItem);
    this.isVisible =false;
  }

  selectIntegrationItem (modelItem: AbdIntegrateSealMstSearchModel) {
    this.basicAndSealModel.ABD_SEAL_INFO = this.makeSealInfoStr("I", modelItem);
    this.isVisible =false;
  }

  makeSealInfoStr (type: string, modelItem: any) {
    if (type == "S" || type == "I") {
      return "动环材质：" + modelItem.MOVABLE_RING +" | "+ "静环材质：" + modelItem.STATIC_RING + " | " + "弹簧材质：" + modelItem.STATIC_RING + " | " + "金属基件材质：" + modelItem.METAL_BASE + " | " + "O型圈材质：" + modelItem.O_TYPE_RING;
    }
    if (type == "D") {
      return "介质端动环材质：" + modelItem.MEDIUM_END_MOVABLE_RING +" | " + "介质端静环材质：" + modelItem.MEDIUM_END_STATIC_RING +" | " + "大气端动环材质：" + modelItem.ATMOSPHERIC_END_MOVABLE_RING +" | " + "大气端静环材质：" + modelItem.ATMOSPHERIC_END_STATIC_RING + " | " + "弹簧材质：" + modelItem.SPRING + " | " + "金属基件材质" + modelItem.METAL_BASE +" | " + "O型圈材质：" + modelItem.O_TYPE_RING;
    }
  }
  // 画面加载时，从型号库中选择底座、联轴器罩、泵联、电联、柱销、卡簧
  getAbdStdInfo() {
    var modelLibrary = null;
    if (this.orderListDetailTableModel.BUMP_TYPE != null) {
      this.innerOrderService.getModelLibrary(this.orderListDetailTableModel.BUMP_TYPE.toString()).subscribe((data) => { if(data) { this.makeObj(data) }}, error => this.error = error);
    }
  }

  makeObj (modelLibrary) {
    this.otherComponentModel.BASE_SPEC = modelLibrary.BASE_TYPE;
    this.otherComponentModel.COUPLING_HOOD_SPEC = modelLibrary.COUPLING_HOOD_TYPE;
    this.otherComponentModel.COUPLING_BUMP_COUPLET = modelLibrary.COUPLING_BUMP_COUPLET;
    this.otherComponentModel.COUPLING_ELECTRIC_COUPLET = modelLibrary.COUPLING_ELECTRIC_COUPLET;
    this.otherComponentModel.COUPLING_PIN = modelLibrary.COUPLING_PIN;
    this.otherComponentModel.COUPLING_JUMP_RING = modelLibrary.COUPLING_JUMP_RING;
    // 选择项目，要把对应的项目选成ABD
    // 底座
    this.otherComponentModel.BASE_TYPE = "ABD_BASE";
    // 联轴器罩
    this.otherComponentModel.COUPLING_HOOD_TYPE = "ABD_HOOD_TYPE";
    // 联轴器
    this.otherComponentModel.COUPLING_TYPE = "ABD_ELASTIC_PIN_COUPLING_TYPE";

  }




   //2018-11-11新增
   // *ngIf="TestPressureShowSelect()"
  // *ngIf="DoublePressureShowSelect()"


  TestPressureShowSelect():any{
    if( this.orderListDetailTableModel.SEAL_FORM.includes("双端面"))
      return false;
    else
       return true;
    }
 
   DoublePressureShowSelect():any{

    if(this.orderListDetailTableModel.SEAL_FORM.includes("双端面"))
    return true
   }


 //BUMP_ID包含Mpv Mpe Mph,级数显示；电机接线盒描述显示
   MpvMpeMph():any{
     if(this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPV") ||   this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPE") ||  this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPH"))
     return true;
    }
   //BUMP_ID包含Vp Svp Bc Sbc,主轴形式显示
   VpSvpBcSbc():any{
    if(this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("VP") ||   this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("SVP") ||  this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("BC"))
    return true;
   }
   //BUMP_ID包含Hds，泵转向显示
   Hds():any{
    if(this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("HDS"))
    return true;
   }
   //BUMP_ID包含Mvp,装配出口图显示
   Mvp():any{
   if( this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MVP"))
   return true;
   }
   //BUMP_ID包含Mpe Mph,装配出口方向显示
   MpeMph():any{
    if(this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPE")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPH"))
    return true;
   }
   //BUMP_ID包含By Sby，液下深度显示
   BySby():any{
   if( this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("BY")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("SBY"))
   return true;
   }


  //BUMP_ID包含BS SBS HDS MPE MPH,显示底座,联轴器罩，联轴器
   BsSbsHdsMpeMph():any{
    if(this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("BS")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("HDS")
    ||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPE")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPH"))
    return true;
   }
   //BUMP_ID包含BS SBS HDS MPE MPH BC SBC显示地脚螺栓
 BsSbsHdsMpeMphBcSbc():any{
  if(this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("BS")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("HDS")
  ||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPE")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPH")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("BC"))
  return true;
 }

  //BUMP_ID包含BS SBS HDS MPE MPH BC SBC VP SVP BY SBY MPV显示电机 此方法没有使用，原因是 this.orderListDetailTableModel.BUMP_ID拿不到值
BsSbsHdsMpeMphBcSbcVpSvpBySbyMpv():any{
 if(this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("BS")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("HDS")
  ||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPE")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPH")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("BC")
  ||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("VP")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("BY")||this.orderListDetailTableModel.BUMP_ID.substring(0,4).includes("MPV"))
  return true;
}

  handleUpload(obj) {
    if (obj.type == "success") {
      // GET GRID HERE
      this.innerOrderService.getGridDataByUpload().subscribe((data) => { if (data) { this.makeGridData(data) }}, error => this.error = error);
    }
  }

  getDisplayGridData() {
    this.innerOrderService.getDisplayGridData(this.orderNo, this.bumpId).subscribe((data) => { if (data) { this.makeGridData(data) }}, error => this.error = error);
  }

  makeGridData(data) {
    this.bumpInfoInGrid = data.innerOrderGridBomItemStandard.shift();
    this.componentListTableData = data.innerOrderGridBomItemStandard;
    this.basicPartListTableData = data.innerOrderGridBomItemBase;
  }
}