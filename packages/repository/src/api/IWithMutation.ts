import {type withDullSchema} from "@use-pico/dull-stuff";
import {
    type Client,
    type Database
}                            from "@use-pico/orm";
import {type IRepository}    from "./IRepository";

export interface IWithMutation<
    TDatabase extends Database,
    TSchema extends withDullSchema.Schema<any, any, any, any>,
    TTable extends keyof TDatabase & string,
> {
    readonly client: Client<TDatabase>;
    readonly schema: TSchema;
    readonly table: TTable;
    readonly repository: IRepository<TDatabase, TSchema, TTable>;

    mutation(mutate: withDullSchema.Infer.Mutation<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema>>;

    create(
        create: withDullSchema.Infer.Create<TSchema>
    ): Promise<withDullSchema.Infer.Entity<TSchema>>;

    update(
        update: withDullSchema.Infer.Update<TSchema>
    ): Promise<withDullSchema.Infer.Entity<TSchema>>;

    delete(
        query: withDullSchema.Infer.Delete<TSchema>
    ): Promise<withDullSchema.Infer.Entity<TSchema>>;
}
