"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalSNMPListener = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalSNMPListener extends spinal_connector_service_1.SpinalListener {
    constructor(graph, context, organ, network, bmsDevice, profile) {
        super(graph, context, organ, network, bmsDevice, profile);
        if (!graph || !context || !organ || !network || !bmsDevice || !profile)
            return;
    }
    getAllData() {
        const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork(), this.getProfile()];
        return Promise.all(promises)
            .then(([graph, organ, context, device, network, profile]) => {
            return { graph, organ, context, device, network, profile };
        });
    }
}
exports.SpinalSNMPListener = SpinalSNMPListener;
spinal_core_connectorjs_1.spinalCore.register_models([SpinalSNMPListener]);
exports.default = SpinalSNMPListener;
//# sourceMappingURL=SpinalSNMPListener.js.map