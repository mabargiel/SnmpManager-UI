import { SnmpMethod } from './SnmpMethod';
export interface WatcherModel {
    id: string
    ipAddress: string,
    mib: string,
    method: SnmpMethod,
    updatesEvery: number
}