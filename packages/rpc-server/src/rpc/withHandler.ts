import {type IContainer} from "@use-pico/container";
import {type IHandler}   from "@use-pico/rpc";
import {
    type RequestSchema,
    type ResponseSchema
}                        from "@use-pico/schema";

export namespace withHandler {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > extends IHandler<TRequestSchema, TResponseSchema> {
        container: IContainer.Type;
        key: ReadonlyArray<unknown>;
    }
}

export const withHandler = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        container,
        schema,
        key,
        handle,
    }: withHandler.Props<TRequestSchema, TResponseSchema>
) => {
    container.useValue<IHandler<TRequestSchema, TResponseSchema>>(
        key.join("."),
        {
            schema,
            handle,
        }
    );
};
