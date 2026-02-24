import { SpinalNode } from "spinal-model-graph";
import { IRequest } from "./constants";
import { SpinalPilot } from "spinal-connector-service";
declare class SpinalSNMPPilot extends SpinalPilot<IRequest> {
    constructor(organ?: SpinalNode, request?: IRequest);
}
export { SpinalSNMPPilot };
export default SpinalSNMPPilot;
