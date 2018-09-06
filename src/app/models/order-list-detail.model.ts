export class OrderListDetailFormModel {

    ORDER_NO: String;
    CONTRACT_NO: String;
    PROJECT_NM: String;
    DEPARTURE_DATE: Date;
    DELIVERY_DATE: Date;
    ORDER_UNIT: String;
    SALES_PERSON: String;
    APPLICATION_ENGINEER: String;
    REMARK: String;
}

export class OrderListDetailTableModel {
    // DB
    ORDER_NO: String;
    BUMP_ID: String;
    BUMP_NM: String;
    STATION: String;
    BUMP_TYPE: String;
    NUMBER: number;
    FLOW: number;
    LIFT: number;
    MATERIAL: String;
    SEAL: String;
    STATUS: String;
    REMARK: String;
    BUMP_SERIAL_NO: String;
    // GRID
    checked: Boolean;
    disabled: Boolean;
}