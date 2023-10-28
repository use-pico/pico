import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
} from "@use-pico/schema";

export interface IRpcHandler<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
> {
    readonly requestSchema: TRequestSchema;
    readonly responseSchema: TResponseSchema;

    handle(request: PicoSchema.Output<TRequestSchema>): Promise<PicoSchema.Output<TResponseSchema>>;
}
