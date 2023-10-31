import {type PicoSchema}  from "@use-pico/schema";
import {useStore}         from "@use-pico/store";
import {type IQueryStore} from "../api/IQueryStore";
import {type QuerySchema} from "../schema/QuerySchema";

export namespace useFilter {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
    > {
        store: IQueryStore.Store<TQuerySchema>;
    }

    export type Result<
        TQuerySchema extends QuerySchema<any, any>,
    > = (filter: PicoSchema.Output<TQuerySchema["shape"]["filter"]>) => void;
}

export const useFilter = <
    TQuerySchema extends QuerySchema<any, any>,
>(
    {
        store,
    }: useFilter.Props<TQuerySchema>
): useFilter.Result<TQuerySchema> => {
    const setFilter = useStore(store, ({setFilter}) => setFilter);
    return filter => setFilter(filter);
};
