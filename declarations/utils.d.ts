import { Path as SpinalPath } from "spinal-core-connectorjs_type";
export declare function convertToBase64(tree: any): string;
export declare function getPathData(dynamicId: number, hubUrl?: string): Promise<Uint8Array<any>>;
export declare function waitModelReady(path: SpinalPath): Promise<unknown>;
