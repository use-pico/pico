import {type ResponseSchema}   from "@pico/types";
import {type RpcRequestSchema} from "../schema/RpcRequestSchema";

export interface IBulkRef {
    schema?: ResponseSchema;
    request: RpcRequestSchema.Type<any>;

    resolve(value: any): void;

    reject(error: any): void;
}
