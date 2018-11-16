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
    DEBUG: String;
    TOTAL_QTY: number;
    TEX_RATE: String;
    GUARANTEE_DATE: Date;
    TOTAL_AMT: number;
    PAYMENT: String;
    TARGET_PRICE: number;
    DISCOUNT: number;
    CHANGE_HIS1: String;
    CHANGE_HIS2: String;
    // GRID
    checked: Boolean;
    disabled: Boolean;
}

export interface OrderDetailListTableModel {
    // DB
    ORDER_NO: String;
    BUMP_ID: String;
    BUMP_NM: String;
    BUMP_TYPE: String;
    NUMBER: number;
    UNIT: String;
    PRICE: number;
    AMOUNT: number;
    BUMP_SERIAL_NO: String;
    FLOW: number;
    LIFT: number;
    MATERIAL_BUMP: String;
    MATERIAL_FAN: String;
    MATERIAL_ROLLER: String;
    MOTOR_BRAND: String;
    MOTOR_DEMAND: String;
    SEAL_FORM: String;
    SEAL_BRAND: String;
    ROLLER_BRAND: String;
    COUPLING: String;
    SEAL_COOLER: String;
    CAVITATION_ALLOWANCE: number;
    ACTUAL_BUMP_SPEED: number;
    STATION: String;
    TEMPERATURE: number;
    DENSITY: String;
    IN_PRESSURE: number;
    MEDIUM: String;
    VISCOSITY: number;
    PARTICULATES: String;
    WORKING_PRESSURE: number;
    FLANGES_STANDARD: String;
    FLANGES_LEVEL: String;
    BASE: String;
    COUPLING_HOOD: String;
    ANCHOR_BOLT: String;
    PAINT: String;
    SURFACE_TREATMENT: String;
    PACKAGE: String;
    TRANSPORT: String;

    MOTOR_BRAND_NAME: String;
    SEAL_FORM_NAME: String;
    SEAL_BRAND_NAME: String;
    ROLLER_BRAND_NAME: String;
    COUPLING_NAME: String;
    SEAL_COOLER_NAME: String;
    FLANGES_STANDARD_NAME: String;
    FLANGES_LEVEL_NAME: String;
    COUPLING_HOOD_NAME: String;
    BASE_NAME: String;
    ANCHOR_BOLT_NAME: String;
    PAINT_NAME: String;
    SURFACE_TREATMENT_NAME: String;
    PACKAGE_NAME: String;
    TRANSPORT_NAME: String;

    SEAL_BRAND_MANUAL: String;
    SEAL_BRAND_SHOW: String;
    // GRID
    checked: Boolean;
    disabled: Boolean;
}