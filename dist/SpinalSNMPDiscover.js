"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalSNMPDiscover = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
const SpinalSNMPNetwork_1 = require("./SpinalSNMPNetwork");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalSNMPDiscover extends spinal_connector_service_1.SpinalDiscover {
    constructor(graph, context, organ, networks) {
        super(graph, context, organ);
        if (!graph || !context || !networks || !organ)
            return;
        const networksFormatted = this._formatNetworks(networks);
        this.add_attr({
            networks: networksFormatted,
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
}
exports.SpinalSNMPDiscover = SpinalSNMPDiscover;
spinal_core_connectorjs_1.spinalCore.register_models([SpinalSNMPDiscover]);
exports.default = SpinalSNMPDiscover;
//# sourceMappingURL=SpinalSNMPDiscover.js.map