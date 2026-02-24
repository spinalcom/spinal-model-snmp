import { Model, spinalCore, Lst } from "spinal-core-connectorjs";
import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-model-graph";
import { ISnmpNetwork } from "./constants";
import { SpinalSNMPNetwork } from "./SpinalSNMPNetwork";
import { SpinalDiscover } from "spinal-connector-service";


class SpinalSNMPDiscover extends SpinalDiscover {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, networks?: ISnmpNetwork[]) {

        super(graph, context, organ);

        if (!graph || !context || !networks || !organ) return;

        const networksFormatted = this._formatNetworks(networks);

        this.add_attr({
            networks: networksFormatted,
            progress: new Model({ finished: 0, failed: 0, total: networks.length }),
        })
    }

    private _formatNetworks(networks: ISnmpNetwork[]) {
        const networksLst = new Lst<SpinalSNMPNetwork>();

        for (const network of networks) {
            networksLst.push(new SpinalSNMPNetwork(network));
        }

        return networksLst;
    }

}


spinalCore.register_models([SpinalSNMPDiscover]);

export { SpinalSNMPDiscover };
export default SpinalSNMPDiscover;