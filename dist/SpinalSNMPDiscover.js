"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalSNMPDiscover = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
const SpinalSNMPNetwork_1 = require("./SpinalSNMPNetwork");
class SpinalSNMPDiscover extends spinal_core_connectorjs_1.Model {
    constructor(graph, context, organ, networks) {
        super();
        if (!graph || !context || !networks || !organ)
            return;
        const networksFormatted = this._formatNetworks(networks);
        const choicesSet = new Set(Object.keys(constants_1.STATES));
        this.add_attr({
            id: (0, uuid_1.v4)(),
            graph: graph && new spinal_core_connectorjs_1.Pbr(graph),
            context: context && new spinal_core_connectorjs_1.Pbr(context),
            networks: networksFormatted,
            organ: organ && new spinal_core_connectorjs_1.Pbr(organ),
            creation: Date.now(),
            state: new spinal_core_connectorjs_1.Choice(0, Array.from(choicesSet)),
            treeDiscovered: new spinal_core_connectorjs_1.Ptr(),
            treeToCreate: new spinal_core_connectorjs_1.Ptr(),
            progress: new spinal_core_connectorjs_1.Model({ finished: 0, failed: 0, total: networks.length }),
        });
    }
    _formatNetworks(networks) {
        const networksLst = new spinal_core_connectorjs_1.Lst();
        for (const network of networks) {
            networksLst.push(new SpinalSNMPNetwork_1.SpinalSNMPNetwork(network));
        }
        return networksLst;
    }
    changeState(state) {
        const choicesSet = new Set(Object.keys(constants_1.STATES));
        this.state.set(Array.from(choicesSet).indexOf(state));
    }
    getOrgan() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return this.organ.load((organ) => {
                    resolve(organ);
                });
            });
        });
    }
    addToGraph() {
        return this.getOrgan().then((organNode) => __awaiter(this, void 0, void 0, function* () {
            const organ = yield organNode.getElement(true);
            return organ.addDiscoverModelToGraph(this);
        }));
    }
    remove() {
        return this.getOrgan().then((organNode) => __awaiter(this, void 0, void 0, function* () {
            const organ = yield organNode.getElement(true);
            return organ.removeDiscoverModelFromGraph(this);
        }));
    }
}
exports.SpinalSNMPDiscover = SpinalSNMPDiscover;
spinal_core_connectorjs_1.spinalCore.register_models([SpinalSNMPDiscover]);
exports.default = SpinalSNMPDiscover;
//# sourceMappingURL=SpinalSNMPDiscover.js.map