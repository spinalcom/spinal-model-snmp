import { Ptr, Str } from "spinal-core-connectorjs_type";
import axios from "axios";
import axiosRetry from 'axios-retry';

export function convertToBase64(tree: any): string {
    return Buffer.from(JSON.stringify(tree)).toString("base64");
}


export function getPathData(dynamicId: number, hubUrl: string = "") {
    const path = `${hubUrl}/sceen/_?u=${dynamicId}`;
    const client = axios.create({ baseURL: hubUrl });
    axiosRetry(client, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
    return client.get(path, { responseType: 'arraybuffer' }).then((response) => {
        // return Buffer.from(response.data);
        return new Uint8Array(response.data);
    });
}

export function waitModelReady(model: Ptr) {
    return new Promise((resolve, reject) => {
        model.load((path) => {
            // if (!path) return resolve(true);

            const delay = 3000;
            const intervalTime = 300;
            let time = 0;

            const wait = () => {
                setTimeout(() => {
                    const remaining = path?.remaining?.get();

                    if (remaining == 0 || time >= delay) {
                        resolve(true);
                    } else {
                        time += intervalTime;
                        wait();
                    }
                }, intervalTime);
            };

            wait();
        });
    });
}