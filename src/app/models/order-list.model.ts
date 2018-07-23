export class OrderListSearchModel {

    orderNo: String;
    contractNo: String;
    projectNm: String;
    departureDateSt: Date;
    departureDateStStr: String;
    departureDateEd: Date;
    departureDateEdStr: String;
    orderCompany: String;
    deliveryDateSt: Date;
    deliveryDateStStr: String;
    deliveryDateEd: Date;
    deliveryDateEdStr: String;
    salesPerson: String;
}

export interface OrderListTableModel {

    orderNo: String;
    contractNo: String;
    projectNm: String;
    departureDateSt: Date;
    departureDateStStr: String;
    departureDateEd: Date;
    departureDateEdStr: String;
    orderCompany: String;
    deliveryDateSt: Date;
    deliveryDateStStr: String;
    deliveryDateEd: Date;
    deliveryDateEdStr: String;
    salesPerson: String;
    checked: Boolean;
    disabled: Boolean;
}