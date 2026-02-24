import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-model-graph";
import { ISnmpNetwork } from "./constants";
import { SpinalDiscover } from "spinal-connector-service";
declare class SpinalSNMPDiscover extends SpinalDiscover {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, networks?: ISnmpNetwork[]);
    private _formatNetworks;
}
export { SpinalSNMPDiscover };
export default SpinalSNMPDiscover;
