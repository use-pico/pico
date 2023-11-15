import {type withDullSchema} from "@use-pico/dull-stuff";
import {
    type Client,
    type Database
}                            from "@use-pico/orm";
import {type IRepository}    from "../api/IRepository";
import {type IWithMutation}  from "../api/IWithMutation";
import {type IWithQuery}     from "../api/IWithQuery";
import {AbstractWithApply}   from "./AbstractWithApply";
import {WithMutation}        from "./WithMutation";
import {WithQuery}           from "./WithQuery";

export class AbstractRepository<
    TDatabase extends Database,
    TSchema extends withDullSchema.Schema<any, any, any, any>,
    TTable extends keyof TDatabase & string,
> extends AbstractWithApply<
    TDatabase,
    TSchema,
    TTable
> implements IRepository<
    TDatabase,
    TSchema,
    TTable
> {
    protected constructor(
        protected client: Client<TDatabase>,
        schema: TSchema,
        table: TTable,
    ) {
        super(
            schema,
            table,
        );
    }

    protected $withQuery: IWithQuery<TDatabase, TSchema, TTable> | undefined;
    protected $withMutation: IWithMutation<TDatabase, TSchema, TTable> | undefined;

    public get withQuery(): IWithQuery<TDatabase, TSchema, TTable> {
        return this.$withQuery ?? (this.$withQuery = new WithQuery(
            this.client,
            this.schema,
            this.table,
            this,
        ));
    }

    public get withMutation(): IWithMutation<TDatabase, TSchema, TTable> {
        return this.$withMutation ?? (this.$withMutation = new WithMutation(
            this.client,
            this.schema,
            this.table,
            this,
        ));
    }

    public async get(id: string): Promise<withDullSchema.Infer.Entity<TSchema> | undefined> {
        return this.withQuery.fetch({
            where: {id},
        });
    }

    public async getOrThrow(id: string): Promise<withDullSchema.Infer.Entity<TSchema>> {
        return this.withQuery.fetchOrThrow({
            where: {id},
        });
    }

    public async toCreate(create: withDullSchema.Infer.Create<TSchema>): Promise<withDullSchema.Infer.EntityWithoutId<TSchema>> {
        return create;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async onCreate(entity: withDullSchema.Infer.Entity<TSchema>): Promise<any> {
    }

    public async toUpdate(update: withDullSchema.Infer.Update<TSchema>["update"]): Promise<withDullSchema.Infer.Entity$<TSchema>> {
        return update;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async onUpdate(entity: withDullSchema.Infer.Entity<TSchema>): Promise<any> {
    }
}
