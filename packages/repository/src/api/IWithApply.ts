import {type Database}           from "@use-pico/orm";
import {type PicoSchema}         from "@use-pico/schema";
import {type SelectQueryBuilder} from "kysely";
import {type IRepository}        from "./IRepository";

export interface IWithApply<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<any, any, any, any>,
    TTable extends keyof TDatabase & string,
> {
    readonly schema: TSchema;
    readonly table: TTable;

    /**
     * Apply mandatory filter which cannot be modified (like userId or so)
     */
    applyWhere<T>(
        query: PicoSchema.Output<TSchema["query"]>,
        select: SelectQueryBuilder<TDatabase, TTable, T>
    ): SelectQueryBuilder<TDatabase, TTable, T>;

    /**
     * Apply optional user-land filters
     */
    applyFilter<T>(
        query: PicoSchema.Output<TSchema["query"]>,
        select: SelectQueryBuilder<TDatabase, TTable, T>
    ): SelectQueryBuilder<TDatabase, TTable, T>;
}
