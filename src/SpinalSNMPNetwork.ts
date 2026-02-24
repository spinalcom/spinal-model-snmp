import { Model, spinalCore, Path as SpinalPath } from "spinal-core-connectorjs";
import { ISnmpNetwork } from "./constants";
import { getPathData, waitModelReady } from "./utils";
import { v4 as uuidv4 } from "uuid";


class SpinalSNMPNetwork extends Model {
    constructor(network?: ISnmpNetwork) {
        super();

        if (!network) return;
        this.add_attr({
            id: network.id || uuidv4(),
            address: network.address,
            name: network.name || network.address,
            ...(network.mibFile && { mibFile: this._convertFileToSpinalFile(network.mibFile) })
        });
    }

    public async getMibData(hubUrl: string = ""): Promise<Uint8Array | void> {
        if (!this.mibFile) return undefined;

        await waitModelReady(this.mibFile);
        const pathData = await getPathData(this.mibFile._server_id, hubUrl);

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
