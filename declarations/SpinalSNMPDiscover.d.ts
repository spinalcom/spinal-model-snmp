import { Model } from "spinal-core-connectorjs";
import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-model-graph";
import { ISnmpNetwork } from "./constants";
declare class SpinalSNMPDiscover extends Model {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, networks?: ISnmpNetwork[]);
    private _formatNetworks;
    setDiscoveringMode(): void;
    setDiscoveredMode(): void;
    setInitialMode(): void;
    setTimeoutMode(): void;
    setCreatingMode(): void;
    setCreatedMode(): void;
    setErrorMode(): void;
    getOrgan(): Promise<SpinalNode>;
    addToGraph(): Promise<number>;
    remove(): Promise<boolean>;
}
export { SpinalSNMPDiscover };
export default SpinalSNMPDiscover;
