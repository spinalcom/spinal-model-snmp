import { SpinalOrganModel } from "spinal-connector-service";
import SpinalSNMPDiscover from "./SpinalSNMPDiscover";
import SpinalSNMPPilot from "./SpinalSNMPPilot";
import SpinalSNMPListener from "./SpinalSNMPListener";
declare class SpinalOrganSNMP extends SpinalOrganModel<SpinalSNMPDiscover, SpinalSNMPPilot, SpinalSNMPListener> {
    static TYPE: string;
    static CONTEXT_TO_ORGAN_RELATION: string;
    references: any;
    constructor(name?: string, type?: string);
}
export default SpinalOrganSNMP;
export { SpinalOrganSNMP };
