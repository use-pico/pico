import {type IContainer}     from "@use-pico/container";
import {
    type CountSchema,
    type QuerySchema
}                            from "@use-pico/query";
import {type ArraySchema}    from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {withCountHandler}    from "./withCountHandler";
import {withMutationHandler} from "./withMutationHandler";
import {withQueryHandler}    from "./withQueryHandler";

export namespace withRepositoryHandler {
    export interface Props<
        TQueryHandler extends withQueryHandler.Props<QuerySchema<any, any>, ArraySchema<any>>["handler"],
        TCountHandler extends withQueryHandler.Props<QuerySchema<any, any>, CountSchema>["handler"],
        TMutationHandler extends withMutationHandler.Props<MutationSchema<any, any>, any>["handler"],
    > {
        container: IContainer.Type;
        table: string;
        query: TQueryHandler;
        count: TCountHandler;
        mutation: TMutationHandler;
    }
}

export const withRepositoryHandler = <
    TQueryHandler extends withQueryHandler.Props<QuerySchema<any, any>, ArraySchema<any>>["handler"],
    TCountHandler extends withQueryHandler.Props<QuerySchema<any, any>, CountSchema>["handler"],
    TMutationHandler extends withMutationHandler.Props<MutationSchema<any, any>, any>["handler"],
>(
    {
        container,
        table,
        query,
        count,
        mutation,
    }: withRepositoryHandler.Props<
        TQueryHandler,
        TCountHandler,
        TMutationHandler
    >
) => {
    withQueryHandler({
        container,
        table,
        handler: query,
    });
    withCountHandler({
        container,
        table,
        handler: count,
    });
    withMutationHandler({
        container,
        table,
        handler: mutation,
    });
};
