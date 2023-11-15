import {type withDullSchema} from "@use-pico/dull-stuff";
import {type Database}       from "@use-pico/orm";
import {type IWithApply}     from "./IWithApply";
import {type IWithMutation}  from "./IWithMutation";
import {type IWithQuery}     from "./IWithQuery";

export interface IRepository<
    TDatabase extends Database,
    TSchema extends withDullSchema.Schema<any, any, any, any>,
    TTable extends keyof TDatabase & string,
> extends IWithApply<
    TDatabase,
    TSchema,
    TTable
> {
    get withQuery(): IWithQuery<TDatabase, TSchema, TTable>;

    get withMutation(): IWithMutation<TDatabase, TSchema, TTable>;

    get(id: string): Promise<withDullSchema.Infer.Entity<TSchema> | undefined>;

    getOrThrow(id: string): Promise<withDullSchema.Infer.Entity<TSchema>>;

    toCreate(create: withDullSchema.Infer.Create<TSchema>): Promise<withDullSchema.Infer.EntityWithoutId<TSchema>>;

    onCreate(entity: withDullSchema.Infer.Entity<TSchema>): Promise<any>;

    toUpdate(update: withDullSchema.Infer.Update<TSchema>["update"]): Promise<Partial<withDullSchema.Infer.Entity<TSchema>>>;

    onUpdate(entity: withDullSchema.Infer.Entity<TSchema>): Promise<any>;
}
