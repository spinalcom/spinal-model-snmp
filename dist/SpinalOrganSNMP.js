"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOrganSNMP = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
const constants_1 = require("./constants");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalOrganSNMP extends spinal_connector_service_1.SpinalOrganModel {
    constructor(name, type = constants_1.SNMP_ORGAN_TYPE) {
        super(name, type);
        if (!name)
            return;
    }
}
exports.SpinalOrganSNMP = SpinalOrganSNMP;
SpinalOrganSNMP.TYPE = constants_1.SNMP_ORGAN_TYPE;
SpinalOrganSNMP.CONTEXT_TO_ORGAN_RELATION = "hasBmsNetworkOrgan";
spinal_core_connectorjs_1.spinalCore.register_models([SpinalOrganSNMP]);
exports.default = SpinalOrganSNMP;
//# sourceMappingURL=SpinalOrganSNMP.js.map