import {
    type Client,
    type Database
}                           from "@use-pico/orm";
import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                           from "@use-pico/query";
import {PicoSchema}         from "@use-pico/schema";
import {
    type MutationSchema,
    type ShapeSchema
}                           from "@use-pico/source";
import {type IRepository}   from "../api/IRepository";
import {type IWithMutation} from "../api/IWithMutation";
import {type IWithQuery}    from "../api/IWithQuery";
import {AbstractWithApply}  from "./AbstractWithApply";
import {WithMutation}       from "./WithMutation";
import {WithQuery}          from "./WithQuery";

export class AbstractRepository<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<
        any,
        any,
        QuerySchema<FilterSchema, OrderBySchema>,
        MutationSchema<ShapeSchema, QuerySchema<FilterSchema, OrderBySchema>>
    >,
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
        public client: Client<TDatabase>,
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

    public async toCreate(create: NonNullable<PicoSchema.Output<TSchema["mutation"]["shape"]["create"]>>): Promise<Omit<PicoSchema.Output<TSchema["entity"]>, "id">> {
        return create;
    }

    public async toUpdate(update: NonNullable<PicoSchema.Output<TSchema["mutation"]["shape"]["update"]>>["update"]): Promise<Partial<PicoSchema.Output<TSchema["entity"]>>> {
        return update;
    }
}
