"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalSNMPPilot = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalSNMPPilot extends spinal_connector_service_1.SpinalPilot {
    constructor(organ, request) {
        super(organ, request);
        if (!organ || !request)
            return;
    }
}
exports.SpinalSNMPPilot = SpinalSNMPPilot;
spinal_core_connectorjs_1.spinalCore.register_models([SpinalSNMPPilot]);
exports.default = SpinalSNMPPilot;
//# sourceMappingURL=SpinalSNMPPilot.js.map