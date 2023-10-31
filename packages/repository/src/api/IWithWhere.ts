import {type QuerySchema}        from "@use-pico/query";
import {PicoSchema}              from "@use-pico/schema";
import {type SelectQueryBuilder} from "kysely";

export type IWithWhere<
    TQuerySchema extends QuerySchema<any, any>,
    TSelect extends SelectQueryBuilder<any, any, any>,
> = (props: IWithWhere.Props<TQuerySchema, TSelect>) => TSelect;

export namespace IWithWhere {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TSelect extends SelectQueryBuilder<any, any, any>,
    > {
        query: PicoSchema.Output<TQuerySchema>;
        select: TSelect;
    }
}
