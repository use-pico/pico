import {type IContainer} from "@use-pico/container";
import {
    type RequestSchema,
    type ResponseSchema
}                        from "@use-pico/schema";
import {type IHandler}   from "../api/IHandler";

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
