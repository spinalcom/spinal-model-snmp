"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATES = exports.SNMP_ORGAN_TYPE = void 0;
exports.SNMP_ORGAN_TYPE = "SNMP_ORGAN_TYPE";
var STATES;
(function (STATES) {
    STATES["initial"] = "initial";
    STATES["readyToDiscover"] = "readyToDiscover";
    STATES["discovering"] = "discovering";
    STATES["discovered"] = "discovered";
    STATES["readyToCreate"] = "readyToCreate";
    STATES["creating"] = "creating";
    STATES["created"] = "created";
    STATES["error"] = "error";
    STATES["timeout"] = "timeout";
    STATES["cancelled"] = "cancelled";
    STATES["pending"] = "pending";
    STATES["stopped"] = "stopped";
})(STATES || (exports.STATES = STATES = {}));
//# sourceMappingURL=constants.js.map