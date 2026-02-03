import { Model, Pbr, spinalCore, File as SpinalFile, Path as SpinalPath, Choice, Ptr, Lst } from "spinal-core-connectorjs";
import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-model-graph";
import SpinalOrganSNMP from "./SpinalOrganSNMP";
import { v4 as uuidv4 } from "uuid";
import { ISnmpNetwork, STATES } from "./constants";
import { Buffer } from "buffer";
import { SpinalSNMPNetwork } from "./SpinalSNMPNetwork";
import * as gzip from "node-gzip"
import { getPathData } from "./utils";


class SpinalSNMPDiscover extends Model {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, networks?: ISnmpNetwork[]) {
        super();
        if (!graph || !context || !networks || !organ) return;

        const networksFormatted = this._formatNetworks(networks);
        const choicesSet = new Set(Object.keys(STATES));

        this.add_attr({
            id: uuidv4(),
            graph: graph && new Pbr(graph),
            context: context && new Pbr(context),
            networks: networksFormatted,
            organ: organ && new Pbr(organ),
            creation: Date.now(),
            state: new Choice(0, Array.from(choicesSet)),
            treeDiscovered: new Ptr(),
            treeToCreate: new Ptr(),
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


    public changeState(state: STATES) {
        const choicesSet = new Set(Object.keys(STATES));

        this.state.set(Array.from(choicesSet).indexOf(state));
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








    public async setTreeDiscovered(json: any) {
        const compressed = await gzip.gzip(JSON.stringify(json));
        const path = new SpinalPath(compressed);
        if (this.treeDiscovered) this.rem_attr("treeDiscovered");

        this.add_attr({ treeDiscovered: new Ptr(path) });
    }

    public async setTreeToCreate(json: any) {
        const compressed = await gzip.gzip(JSON.stringify(json));
        const path = new SpinalPath(compressed);
        if (this.treeToCreate) this.rem_attr("treeToCreate");

        this.add_attr({ treeToCreate: new Ptr(path) });
    }

    public async getTreeDiscovered(hubUrl?: string) {
        // await waitModelReady(this.treeDiscovered);

        const pathData = await getPathData(this.treeDiscovered.data.value, hubUrl);
        const decompressed = await gzip.ungzip(pathData);
        return JSON.parse(decompressed.toString());
    }


    public async getTreeToCreate(hubUrl?: string) {
        // await waitModelReady(this.treeToCreate);

        const pathData = await getPathData(this.treeToCreate.data.value, hubUrl);
        const decompressed = await gzip.ungzip(pathData);
        return JSON.parse(decompressed.toString());

    }



}


spinalCore.register_models([SpinalSNMPDiscover]);

export { SpinalSNMPDiscover };
export default SpinalSNMPDiscover;