import { spinalCore } from "spinal-core-connectorjs";
import { SNMP_ORGAN_TYPE } from "./constants";
import { SpinalOrganModel } from "spinal-connector-service";

import SpinalSNMPDiscover from "./SpinalSNMPDiscover";
import SpinalSNMPPilot from "./SpinalSNMPPilot";
import SpinalSNMPListener from "./SpinalSNMPListener";

class SpinalOrganSNMP extends SpinalOrganModel<SpinalSNMPDiscover, SpinalSNMPPilot, SpinalSNMPListener> {

    static TYPE: string = SNMP_ORGAN_TYPE;
    static CONTEXT_TO_ORGAN_RELATION: string = "hasBmsNetworkOrgan";

    references: any;

    constructor(name?: string, type: string = SNMP_ORGAN_TYPE) {
        super(name, type);
        if (!name) return;
    }
}


spinalCore.register_models([SpinalOrganSNMP]);
export default SpinalOrganSNMP;
export { SpinalOrganSNMP };