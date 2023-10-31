import {type IContainer}     from "@use-pico/container";
import {withMutation}        from "@use-pico/repository";
import {type ResponseSchema} from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {withHandler}         from "../rpc/withHandler";

export namespace withMutationHandler {
    export interface Props<
        TRequestSchema extends MutationSchema<any, any>,
        TResponseSchema extends ResponseSchema,
    > {
        table: string;
        container: IContainer.Type;
        handler: {
            key: ReadonlyArray<unknown>;
            schema: {
                request: TRequestSchema;
                response: TResponseSchema;
            };
        };
    }
}

export const withMutationHandler = <
    TRequestSchema extends MutationSchema<any, any>,
    TResponseSchema extends ResponseSchema,
>(
    {
        table,
        container,
        handler,
    }: withMutationHandler.Props<TRequestSchema, TResponseSchema>
) => withHandler({
    container,
    key:    handler.key,
    schema: handler.schema,
    handle: async props => withMutation({
        table,
        ...props,
    })
});
