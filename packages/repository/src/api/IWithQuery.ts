import {type withDullSchema} from "@use-pico/dull-stuff";
import {
    type Client,
    type Database
}                            from "@use-pico/orm";
import {type CountSchema}    from "@use-pico/query";
import {
    type SelectExpression,
    type Selection
}                            from "kysely";
import {type IRepository}    from "./IRepository";
import {type SelectOf}       from "./SelectOf";

export interface IWithQuery<
    TDatabase extends Database,
    TSchema extends withDullSchema.Schema<any, any, any, any>,
    TTable extends keyof TDatabase & string,
> {
    readonly client: Client<TDatabase>;
    readonly schema: TSchema;
    readonly table: TTable;
    readonly repository: IRepository<TDatabase, TSchema, TTable>;

    count(query: withDullSchema.Infer.Query<TSchema>): Promise<CountSchema.Type>;

    /**
     * Query collection of items
     */
    query(query: withDullSchema.Infer.Query<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema>[]>;

    /**
     * Fetch an (optional) item
     */
    fetch(query: withDullSchema.Infer.Query<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema> | undefined>;

    /**
     * Fetch an item, throw if not found
     */
    fetchOrThrow(query: withDullSchema.Infer.Query<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema>>;

    select<
        TExpression extends SelectExpression<TDatabase, TTable>
    >(
        selections?: ReadonlyArray<TExpression>
    ): SelectOf<
        TDatabase,
        TTable,
        Selection<TDatabase, TTable, TExpression>
    >;
}
