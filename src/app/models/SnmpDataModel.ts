import { SnmpValueModel } from './SnmpValueModel';
export interface SnmpDataModel {
    id: string,
    data: {[variables: string]: SnmpValueModel}
}