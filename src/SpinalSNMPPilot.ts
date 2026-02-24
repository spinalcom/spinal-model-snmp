import { spinalCore } from "spinal-core-connectorjs";
import { SpinalNode } from "spinal-model-graph";
import { IRequest } from "./constants";
import { SpinalPilot } from "spinal-connector-service";
class SpinalSNMPPilot extends SpinalPilot<IRequest> {

    constructor(organ?: SpinalNode, request?: IRequest) {
        super(organ, request);
        if (!organ || !request) return;
    }

}


spinalCore.register_models([SpinalSNMPPilot]);

export { SpinalSNMPPilot };
export default SpinalSNMPPilot;