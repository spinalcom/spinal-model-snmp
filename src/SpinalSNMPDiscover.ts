import { Model, Pbr, spinalCore } from "spinal-core-connectorjs";
import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-model-graph";
import SpinalOrganSNMP from "./SpinalOrganSNMP";
import { v4 as uuidv4 } from "uuid";
import { STATES } from "./constants";

class SpinalSNMPDiscover extends Model {
    constructor(graph?: SpinalGraph, context?: SpinalContext, network?: SpinalNode, organ?: SpinalNode) {
        super();
        if (!graph || !context || !network || !organ) return;

        this.add_attr({
            id: uuidv4(),
            graph: graph && new Pbr(graph),
            context: context && new Pbr(context),
            network: network && new Pbr(network),
            organ: organ && new Pbr(organ),
            creation: Date.now(),
            state: STATES.reseted
        })

    }

    public setDiscoveringMode(): void {
        this.state.set(STATES.discovering);
    }

    public setDiscoveredMode(): void {
        this.state.set(STATES.discovered);
    }

    public setResetedMode(): void {
        this.state.set(STATES.reseted);
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