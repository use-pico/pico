import {type Database}           from "@use-pico/orm";
import {
    FilterSchema,
    type QuerySchema
}                                from "@use-pico/query";
import {type PicoSchema}         from "@use-pico/schema";
import {type SelectQueryBuilder} from "kysely";
import {type IRepository}        from "./IRepository";

export interface IWithApply<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<any, any, QuerySchema<any, any>, any>,
    TTable extends keyof TDatabase & string,
> {
    readonly schema: TSchema;
    readonly table: TTable;
    readonly defaultOrderBy?: PicoSchema.Output<TSchema["query"]["shape"]["orderBy"]>;
    /**
     * Tuple of "where" field name mapping to database field
     */
    readonly matchOf?: Record<
        keyof Omit<
            NonNullable<PicoSchema.Output<TSchema["query"]["shape"]["where"]>>,
            keyof FilterSchema.Type
        >,
        string
    >;

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

    /**
     * Apply orderBy from a query or a default one
     */
    applyOrderBy<T>(
        query: PicoSchema.Output<TSchema["query"]>,
        select: SelectQueryBuilder<TDatabase, TTable, T>
    ): SelectQueryBuilder<TDatabase, TTable, T>;

    /**
     * Apply all available "stuff" on the given query: where, filter, order by, limits, ...
     */
    applyTo<T>(
        query: PicoSchema.Output<TSchema["query"]>,
        select: SelectQueryBuilder<TDatabase, TTable, T>
    ): SelectQueryBuilder<TDatabase, TTable, T>;
}
