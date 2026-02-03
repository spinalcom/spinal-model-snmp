import { Model } from "spinal-core-connectorjs";
import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-model-graph";
import { ISnmpNetwork, STATES } from "./constants";
declare class SpinalSNMPDiscover extends Model {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, networks?: ISnmpNetwork[]);
    getGraph(): Promise<SpinalGraph>;
    getOrgan(): Promise<SpinalNode>;
    getContext(): Promise<SpinalContext>;
    private _formatNetworks;
    changeState(state: STATES): void;
    addToGraph(): Promise<number>;
    remove(): Promise<boolean>;
    setTreeDiscovered(json: any): Promise<void>;
    setTreeToCreate(json: any): Promise<void>;
    getTreeDiscovered(hubUrl?: string): Promise<any>;
    getTreeToCreate(hubUrl?: string): Promise<any>;
}
export { SpinalSNMPDiscover };
export default SpinalSNMPDiscover;
