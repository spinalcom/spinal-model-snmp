import { Buffer } from 'buffer';
import { SpinalNode } from 'spinal-model-graph';

export const SNMP_ORGAN_TYPE = "SNMP_ORGAN_TYPE";

export enum STATES {
    initial = "initial",
    readyToDiscover = "readyToDiscover",
    discovering = "discovering",
    discovered = "discovered",
    readyToCreate = "readyToCreate",
    creating = "creating",
    created = "created",
    error = "error",
    timeout = "timeout",
    cancelled = "cancelled",
    pending = "pending",
    stopped = "stopped"
}

export interface IDataNodes {
    graph: SpinalNode;
    organ: SpinalNode;
    context: SpinalNode;
    device: SpinalNode;
    network: SpinalNode;
    profile: SpinalNode;
}

export interface IRequest {
    value: string | number | boolean;
    nodeId: string;
}

export interface ISnmpNetwork {
    id?: string;
    name?: string;
    address: string;
    mibFile?: Buffer;
}