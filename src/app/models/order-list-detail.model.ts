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