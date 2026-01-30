import { Model, Pbr, spinalCore, File as SpinalFile, Path as SpinalPath } from "spinal-core-connectorjs";
import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-model-graph";
import SpinalOrganSNMP from "./SpinalOrganSNMP";
import { v4 as uuidv4 } from "uuid";
import { ISnmpNetwork, STATES } from "./constants";
import { Buffer } from "buffer";
import SpinalSNMPNetwork from "./SpinalSNMPNetwork";

class SpinalSNMPDiscover extends Model {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, networks?: ISnmpNetwork[]) {
        super();
        if (!graph || !context || !networks || !organ) return;

        const networksFormatted = this._formatNetworks(networks);

        this.add_attr({
            id: uuidv4(),
            graph: graph && new Pbr(graph),
            context: context && new Pbr(context),
            networks: new Pbr(networksFormatted),
            organ: organ && new Pbr(organ),
            creation: Date.now(),
            state: STATES.initial
        })

    }

    private _formatNetworks(networks: ISnmpNetwork[]) {
        return networks.map((network) => new SpinalSNMPNetwork(network));
    }



    public setDiscoveringMode(): void {
        this.state.set(STATES.discovering);
    }

    public setDiscoveredMode(): void {
        this.state.set(STATES.discovered);
    }

    public setInitialMode(): void {
        this.state.set(STATES.initial);
    }

    public setTimeoutMode(): void {
        this.state.set(STATES.timeout);
    }

    public setCreatingMode(): void {
        this.state.set(STATES.creating);
    }

    public setCreatedMode(): void {
        this.state.set(STATES.created);
    }

    public setErrorMode(): void {
        this.state.set(STATES.error);
    }

    public async getOrgan(): Promise<SpinalNode> {
        return new Promise((resolve, reject) => {
            return this.organ.load((organ: SpinalNode) => {
                resolve(organ);
            })
        });
    }

    public addToGraph(): Promise<number> {
        return this.getOrgan().then(async (organNode: SpinalNode) => {
            const organ: SpinalOrganSNMP = await organNode.getElement(true);
            return organ.addDiscoverModelToGraph(this);
        });
    }

    public remove(): Promise<boolean> {
        return this.getOrgan().then(async (organNode: SpinalNode) => {
            const organ: SpinalOrganSNMP = await organNode.getElement(true);

            return organ.removeDiscoverModelFromGraph(this);
        });
    }
}


spinalCore.register_models([SpinalSNMPDiscover]);

export { SpinalSNMPDiscover };
export default SpinalSNMPDiscover;