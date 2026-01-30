import { Model } from "spinal-core-connectorjs";
import { ISnmpNetwork } from "./constants";
declare class SpinalSNMPNetwork extends Model {
    constructor(network: ISnmpNetwork);
    getMibData(hubUrl?: string): Promise<Uint8Array>;
    private _convertFileToSpinalFile;
}
export { SpinalSNMPNetwork };
export default SpinalSNMPNetwork;
