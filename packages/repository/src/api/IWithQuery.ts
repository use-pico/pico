import {
    type Client,
    type Database
}                            from "@use-pico/orm";
import {
    type CountSchema,
    type QuerySchema
}                            from "@use-pico/query";
import {type PicoSchema}     from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {
    type SelectExpression,
    type Selection,
    type SelectQueryBuilder
}                            from "kysely";
import {type IRepository}    from "./IRepository";

export interface IWithQuery<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<any, any, QuerySchema<any, any>, MutationSchema<any, any>>,
    TTable extends keyof TDatabase & string,
> {
    readonly client: Client<TDatabase>;
    readonly schema: TSchema;
    readonly table: TTable;
    readonly repository: IRepository<TDatabase, TSchema, TTable>;

    count(query: PicoSchema.Output<TSchema["query"]>): Promise<CountSchema.Type>;

    /**
     * Query collection of items
     */
    query(query: PicoSchema.Output<TSchema["query"]>): Promise<PicoSchema.Output<TSchema["entity"]>[]>;

    /**
     * Fetch an (optional) item
     */
    fetch(query: PicoSchema.Output<TSchema["query"]>): Promise<PicoSchema.Output<TSchema["entity"]> | undefined>;

    /**
     * Fetch an item, throw if not found
     */
    fetchOrThrow(query: PicoSchema.Output<TSchema["query"]>): Promise<PicoSchema.Output<TSchema["entity"]>>;

    select<
        TExpression extends SelectExpression<TDatabase, TTable>
    >(
        selections: ReadonlyArray<TExpression>
    ): SelectQueryBuilder<
        TDatabase,
        TTable,
        Selection<TDatabase, TTable, TExpression>
    >;
}
