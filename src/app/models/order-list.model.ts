export class OrderListSearchModel {

    ORDER_NO: String;
    CONTRACT_NO: String;
    PROJECT_NM: String;
    DEPARTURE_DATE_ST: Date;
    DEPARTURE_DATE_ST_STR: String;
    DEPARTURE_DATE_ED: Date;
    DEPARTURE_DATE_ED_STR: String;
    ORDER_UNIT: String;
    DELIVERY_DATE_ST: Date;
    DELIVERY_DATE_ST_STR: String;
    DELIVERY_DATE_ED: Date;
    DELIVERY_DATE_ED_STR: String;
    SALES_PERSON: String;
}

export interface OrderListTableModel {
    // DB
    ORDER_NO: String;
    CONTRACT_NO: String;
    PROJECT_NM: String;
    ORDER_UNIT: String;
    SALES_PERSON: String;
    DELIVERY_DATE: String;
    DEPARTURE_DATE: Date;
    // GRID
    checked: Boolean;
    disabled: Boolean;
}

export interface OrderDetailListTableModel {
    // DB
    ORDER_NO: String;
    BUMP_ID: String;
    BUMP_NM:String;
    STATION: String;
    BUMP_TYPE: String;
    NUMBER: number;
    FLOW: number;
    LIFT: number;
    MATERIAL: String;
    SEAL: String;
    STATUS: String;
    REMARK: String;
    // GRID
    checked: Boolean;
    disabled: Boolean;
}