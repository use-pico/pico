import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                         from "@use-pico/schema";
import {type IRpcHandler} from "../api/IRpcHandler";

export abstract class AbstractRpcHandler<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
> implements IRpcHandler<TRequestSchema, TResponseSchema> {
    protected constructor(
        public requestSchema: TRequestSchema,
        public responseSchema: TResponseSchema,
    ) {
    }

    abstract handle(request: PicoSchema.Output<TRequestSchema>): Promise<PicoSchema.Output<TResponseSchema>>;
}
