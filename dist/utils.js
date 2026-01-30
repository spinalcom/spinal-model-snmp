"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToBase64 = convertToBase64;
exports.getPathData = getPathData;
exports.waitModelReady = waitModelReady;
const axios_1 = require("axios");
const axios_retry_1 = require("axios-retry");
function convertToBase64(tree) {
    return Buffer.from(JSON.stringify(tree)).toString("base64");
}
function getPathData(dynamicId, hubUrl = "") {
    const path = `${hubUrl}/sceen/_?u=${dynamicId}`;
    const client = axios_1.default.create({ baseURL: hubUrl });
    (0, axios_retry_1.default)(client, { retries: 3, retryDelay: axios_retry_1.default.exponentialDelay });
    return client.get(path, { responseType: 'arraybuffer' }).then((response) => {
        // return Buffer.from(response.data);
        return new Uint8Array(response.data);
    });
}
function waitModelReady(model) {
    return new Promise((resolve, reject) => {
        model.load((path) => {
            // if (!path) return resolve(true);
            const delay = 3000;
            const intervalTime = 300;
            let time = 0;
            const wait = () => {
                setTimeout(() => {
                    var _a;
                    const remaining = (_a = path === null || path === void 0 ? void 0 : path.remaining) === null || _a === void 0 ? void 0 : _a.get();
                    if (remaining == 0 || time >= delay) {
                        resolve(true);
                    }
                    else {
                        time += intervalTime;
                        wait();
                    }
                }, intervalTime);
            };
            wait();
        });
    });
}
//# sourceMappingURL=utils.js.map