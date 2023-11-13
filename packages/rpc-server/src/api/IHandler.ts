import {type IContainer} from "@use-pico/container";
import {
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                        from "@use-pico/schema";

export interface IHandler<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
> {
    schema: {
        request: TRequestSchema;
        response: TResponseSchema;
    };
    cache?: {
        bypass?: boolean;
    };

    handle(props: IHandler.HandlerProps<TRequestSchema>): Promise<PicoSchema.Output<TResponseSchema>>;
}

export namespace IHandler {
    export interface HandlerProps<
        TRequestSchema extends RequestSchema,
    > {
        container: IContainer.Type;
        request: PicoSchema.Output<TRequestSchema>;
    }
}
