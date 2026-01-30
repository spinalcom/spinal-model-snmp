"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalSNMPNetwork = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
const utils_1 = require("./utils");
const crypto_1 = require("crypto");
class SpinalSNMPNetwork extends spinal_core_connectorjs_1.Model {
    constructor(network) {
        if (!network)
            return;
        super();
        this.add_attr(Object.assign({ id: network.id || (0, crypto_1.randomUUID)(), address: network.address }, (network.mibFile && { mibFile: this._convertFileToSpinalFile(network.mibFile) })));
    }
    getMibData() {
        return __awaiter(this, arguments, void 0, function* (hubUrl = "") {
            if (!this.mibFile)
                return undefined;
            yield (0, utils_1.waitModelReady)(this.mibFile);
            const pathData = yield (0, utils_1.getPathData)(this.mibFile, hubUrl);
            return pathData;
        });
    }
    _convertFileToSpinalFile(mibFile) {
        const file = new spinal_core_connectorjs_1.Path(mibFile);
        return file;
    }
}
exports.SpinalSNMPNetwork = SpinalSNMPNetwork;
spinal_core_connectorjs_1.spinalCore.register_models([SpinalSNMPNetwork]);
exports.default = SpinalSNMPNetwork;
//# sourceMappingURL=SpinalSNMPNetwork.js.map