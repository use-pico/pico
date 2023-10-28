import {type IRpcHandler} from "@use-pico/rpc";
import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                         from "@use-pico/schema";

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
