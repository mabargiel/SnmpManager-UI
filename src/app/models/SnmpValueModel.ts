import { SnmpValueType } from "./SnmpValueType";

export interface SnmpValueModel {
    type: SnmpValueType,
    value: any
}