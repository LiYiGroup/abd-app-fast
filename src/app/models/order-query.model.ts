export class OrderQueryResultSearchModel {

    SALES_PERSON: String;
    ORDER_UNIT: String;
    PROJECT_NM: String;
    DEPARTURE_DATE_ST: Date;
    DEPARTURE_DATE_ST_STR: String;
    DEPARTURE_DATE_ED: Date;
    DEPARTURE_DATE_ED_STR: String;
    DELIVERY_DATE_ST: Date;
    DELIVERY_DATE_ST_STR: String;
    DELIVERY_DATE_ED: Date;
    DELIVERY_DATE_ED_STR: String;
    ORDER_NO: String;
}

export class OrderQueryResultTableModel {

    SALES_PERSON: String;
    ORDER_UNIT: String;
    PROJECT_NM: String;
    DEPARTURE_DATE: Date;
    DELIVERY_DATE: Date;
    ORDER_NO: String;
    QTY: number;
    TOTAL_AMT: number;
    DISCOUNT: number;
    DELIVERY_QTY: number;
    DOC_AMT: number;
    ARRIVAL_AMT: number;
    REMAIN_AMT: number
}
