import {type ResponseSchema}   from "@use-pico/schema";
import {type RpcRequestSchema} from "../schema/RpcRequestSchema";

export interface IBulkRef {
    schema?: ResponseSchema;
    request: RpcRequestSchema.Type;

    resolve(value: any): void;

    reject(error: any): void;
}
