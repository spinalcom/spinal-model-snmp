import { Lst, Model, Ptr, spinalCore } from "spinal-core-connectorjs";
import { SpinalNode } from "spinal-model-graph";
import { SNMP_ORGAN_TYPE } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { restart } from "pm2";
import ModelsInfo from "./modelsToBind";
import SpinalSNMPDiscover from "./SpinalSNMPDiscover";
import SpinalSNMPPilot from "./SpinalSNMPPilot";
import SpinalSNMPListener from "./SpinalSNMPListener";


class SpinalOrganSNMP extends Model {
    static TYPE: string = SNMP_ORGAN_TYPE;
    static CONTEXT_TO_ORGAN_RELATION: string = "hasBmsNetworkOrgan";

    references: any;

    constructor(name?: string, type: string = SNMP_ORGAN_TYPE) {
        super();
        if (!name) return;
        this.add_attr({
            id: uuidv4(),
            name,
            type,
            references: {},
            restart: false,
            discover: new ModelsInfo<SpinalSNMPDiscover>(),
            pilot: new ModelsInfo<SpinalSNMPPilot>(),
            listener: new ModelsInfo<SpinalSNMPListener>(),
        })
    }

    private _initializeModelsList() {
        if (!this.discover) this.add_attr({ discover: new ModelsInfo<SpinalSNMPDiscover>() });
        if (!this.pilot) this.add_attr({ pilot: new ModelsInfo<SpinalSNMPPilot>() });
        if (!this.listener) this.add_attr({ listener: new ModelsInfo<SpinalSNMPListener>() });
    }

    public getModels(): { discover: ModelsInfo<SpinalSNMPDiscover>, pilot: ModelsInfo<SpinalSNMPPilot>, listener: ModelsInfo<SpinalSNMPListener> } {
        this._initializeModelsList();
        return { discover: this.discover, pilot: this.pilot, listener: this.listener };
    }

    public addReference(contextId: string, spinalNode: SpinalNode<any>): Promise<SpinalNode<any>> {
        if (this.references[contextId]) {
            return new Promise((resolve, reject) => {
                this.references[contextId].load((e) => {
                    if (typeof e !== "undefined") return reject("The organ is already linked to this context");
                    this.references.mod_attr(contextId, new Ptr(spinalNode));
                    resolve(spinalNode);
                });
            });
        }

        this.references.add_attr({ [contextId]: new Ptr(spinalNode) });
        return Promise.resolve(spinalNode);
    }

    public isReferencedInContext(contextId: string): Promise<boolean> {
        if (typeof this.references[contextId] === "undefined") return Promise.resolve(false);

        return new Promise((resolve, reject) => {
            this.references[contextId].load((e) => {
                if (typeof e === "undefined") return resolve(false);
                resolve(true);
            });
        });
    }

    public removeReference(contextId: string): Promise<SpinalNode> | void {
        if (this.references[contextId]) {
            return new Promise((resolve, reject) => {
                this.references[contextId].load((node) => {
                    this.references.rem_attr(contextId);
                    resolve(node);
                });
            });
        }
    }

    //// ADD MODELS

    public addDiscoverModelToGraph(discoverModel: SpinalSNMPDiscover): Promise<number> {
        this._initializeModelsList();
        return this.discover.addModel(discoverModel);
    }

    public addPilotModelToGraph(discoverModel: SpinalSNMPPilot): Promise<number> {
        this._initializeModelsList();
        return this.pilot.addModel(discoverModel);
    }

    public addListenerModelToGraph(discoverModel: SpinalSNMPListener): Promise<number> {
        this._initializeModelsList();
        return this.listener.addModel(discoverModel);
    }


    //// REMOVE MODELS

    public removeDiscoverModelFromGraph(discoverModel: SpinalSNMPDiscover): Promise<boolean> {
        if (this.discover) return this.discover.removeModel(discoverModel);
    }

    public removePilotModelFromGraph(discoverModel: SpinalSNMPPilot): Promise<boolean> {
        if (this.pilot) return this.pilot.removeModel(discoverModel);
    }

    public removeListenerModelFromGraph(discoverModel: SpinalSNMPListener): Promise<boolean> {
        this._initializeModelsList();
        if (this.listener) return this.listener.removeModel(discoverModel);
    }

    //// GET MODELS

    public getDiscoverModelFromGraph(): Promise<Lst<SpinalSNMPDiscover>> {
        this._initializeModelsList();
        return this.discover.getModels();
    }

    public getPilotModelFromGraph(): Promise<Lst<SpinalSNMPPilot>> {
        this._initializeModelsList();
        return this.pilot.getModels();
    }

    public getListenerModelFromGraph(): Promise<Lst<SpinalSNMPListener>> {
        this._initializeModelsList();
        return this.listener.getModels();
    }

    ///// CONSUME MODELS

    public consumeDiscoverModelFromGraph(): Promise<SpinalSNMPDiscover[]> {
        this._initializeModelsList();
        return this.discover.consumeModels();
    }

    public consumePilotModelFromGraph(): Promise<SpinalSNMPPilot[]> {
        this._initializeModelsList();
        return this.pilot.consumeModels();
    }

    public consumeListenerModelFromGraph(): Promise<SpinalSNMPListener[]> {
        this._initializeModelsList();
        return this.listener.consumeModels();
    }

};


spinalCore.register_models([SpinalOrganSNMP]);
export default SpinalOrganSNMP;
export { SpinalOrganSNMP };