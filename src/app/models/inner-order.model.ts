export class BasicAndSealModel {

    ORDER_NO: String;
    BUMP_ID: String;
    BUMP_SERIAL_NO: String;
    NUMBER: Number;
    WORKING_PRESSURE: Number;
    TEST_PRESSURE: Number;
    SUPPRESS_PRESSURE: Number;
    FLANGE_STANDARD: String;
    FLOW: Number;
    LIFT: Number;
    NPSH: Number;
    BUMP_SPEED: Number;
    STATION: String;
    MEDIA: String;
    TEMPERATURE: Number;
    VISCOSITY: Number;
    INLET_PRESSURE: Number;
    PARTICULATES: String;
    SEAL_TYPE: String;
    SEAL_MODEL: String;
    SEAL_MATERIAL: String;
    ABD_SEAL_INFO: String;
    OTHER_SEAL_PROVIDER: String;
    OTHER_SEAL_INFO: String;
    NEED_SEAL_COOLER_FLG: String;
    // 轴承品牌
    BEARING_BRAND: String;
    // 轴承其他信息
    BEARING_OTHER_INFO: String;

}

export class ComponentListTableModel {
    
    ORDER_NO: String;
    BUMP_ID: String;
    COMPONENT_NAME: String;
    COMPONENT_SPEC: String;
    COMPONENT_NUMBER: Number;
    COMPONENT_MATERIAL: String;
    
}

export class BasicPartListTableModel {
    
    ORDER_NO: String;
    BUMP_ID: String;
    BASIC_PART_NAME: String;
    BASIC_PART_SPEC: String;
    BASIC_PART_NUMBER: Number;
    BASIC_PART_MATERIAL: String;
    
}

export class OtherComponentModel {
    
    ORDER_NO: String;
    BUMP_ID: String;
    // 底座
    BASE_TYPE: String;
    BASE_SPEC: String;
    SPECIAL_BASE_DETAIL: String;
    // 联轴器罩
    COUPLING_HOOD_TYPE: String;
    COUPLING_HOOD_SPEC: String;
    SPECIAL_HOOD_TYPE_DETAIL: String;
    // 地脚螺栓
    ANCHOR_BOLT_TYPE: String;
    ANCHOR_BOLT_SPEC: String;
    ANCHOR_BOLT_MATERIAL: String;
    ANCHOR_BOLT_EXTRA_NUT_SPEC: String;
    ANCHOR_BOLT_EXTRA_PAD_SPEC: String;
    ANCHOR_BOLT_NUM: String;
    // 联轴器
    COUPLING_TYPE: String;
    COUPLING_BUMP_COUPLET: String;
    COUPLING_ELECTRIC_COUPLET: String;
    COUPLING_PIN: String;
    COUPLING_JUMP_RING: String;
    COUPLING_PROVIDER: String;
    COUPLING_SPEC: String;
    COUPLING_NUM: String;
    SPECIAL_COUPLING_TYPE_DETAIL: String;
    // 电机
    ELECTRIC_MOTER_TYPE: String;
    ELECTRIC_MOTER_PROVIDER: String;
    ELECTRIC_MOTER_POWER: String;
    ELECTRIC_MOTER_SPEED: String;
    ELECTRIC_MOTER_PFV: String;
    ELECTRIC_MOTER_EXTRA_INFO: String;
    // 油漆及外表颜色
    COLOR_TYPE: String;
    SPECIAL_COLOR_DETAIL: String;
    SURFACE_TREAT_TYPE: String;
    SURFACE_TREAT_EXTRA_INFO: String;
    // 包装及运输
    TRANSPORT_TYPE: String;
    TRANSPORT_PLACE: String;
    PACKAGEING_TYPE: String;
    SPECIAL_PACK_DETAIL: String;
    NEED_FUME_CERTIFICATE: String;
    ADDRESS_INFO: String;
    REMARK: String;

}