import { Model, Pbr, spinalCore, File as SpinalFile, Path as SpinalPath } from "spinal-core-connectorjs";
import { ISnmpNetwork } from "./constants";
import { getPathData, waitModelReady } from "./utils";
import { url } from "inspector";
import { v4 as uuidv4 } from "uuid";

class SpinalSNMPNetwork extends Model {
    constructor(network?: ISnmpNetwork) {
        if (!network) return;
        super();
        this.add_attr({
            id: network.id || uuidv4(),
            address: network.address,
            ...(network.mibFile && { mibFile: this._convertFileToSpinalFile(network.mibFile) })
        });
    }

    public async getMibData(hubUrl: string = ""): Promise<Uint8Array | void> {
        if (!this.mibFile) return undefined;

        await waitModelReady(this.mibFile);
        const pathData = await getPathData(this.mibFile, hubUrl);

        return pathData;
    }

    private _convertFileToSpinalFile(mibFile: Buffer) {
        const file = new SpinalPath(mibFile);
        return file;
    }
}


spinalCore.register_models([SpinalSNMPNetwork]);

export { SpinalSNMPNetwork };
export default SpinalSNMPNetwork;
