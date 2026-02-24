import { spinalCore } from "spinal-core-connectorjs";
import { SpinalNode, SpinalGraph, SpinalContext } from "spinal-model-graph";
import { IDataNodes } from "./constants";
import { SpinalListener } from "spinal-connector-service";

class SpinalSNMPListener extends SpinalListener {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: SpinalNode, bmsDevice?: SpinalNode, profile?: SpinalNode) {
        super(graph, context, organ, network, bmsDevice, profile);

        if (!graph || !context || !organ || !network || !bmsDevice || !profile) return;
    }

    public getAllData(): Promise<IDataNodes> {

        const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork(), this.getProfile()];
        return Promise.all(promises)
            .then(([graph, organ, context, device, network, profile]) => {
                return { graph, organ, context, device, network, profile }
            })
    }

}


spinalCore.register_models([SpinalSNMPListener]);

export { SpinalSNMPListener };
export default SpinalSNMPListener;