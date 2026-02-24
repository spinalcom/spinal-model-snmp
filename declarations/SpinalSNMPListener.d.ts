import { SpinalNode, SpinalGraph, SpinalContext } from "spinal-model-graph";
import { IDataNodes } from "./constants";
import { SpinalListener } from "spinal-connector-service";
declare class SpinalSNMPListener extends SpinalListener {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: SpinalNode, bmsDevice?: SpinalNode, profile?: SpinalNode);
    getAllData(): Promise<IDataNodes>;
}
export { SpinalSNMPListener };
export default SpinalSNMPListener;
