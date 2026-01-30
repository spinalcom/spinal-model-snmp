import { Model } from "spinal-core-connectorjs";
import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-model-graph";
import { ISnmpNetwork, STATES } from "./constants";
declare class SpinalSNMPDiscover extends Model {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, networks?: ISnmpNetwork[]);
    private _formatNetworks;
    changeState(state: STATES): void;
    getOrgan(): Promise<SpinalNode>;
    addToGraph(): Promise<number>;
    remove(): Promise<boolean>;
}
export { SpinalSNMPDiscover };
export default SpinalSNMPDiscover;
