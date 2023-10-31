import {
    type Client,
    type Database
} from "@use-pico/orm";
import {
    type CountSchema,
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
} from "@use-pico/query";
import {
    type PicoSchema,
    type WithIdentitySchema
} from "@use-pico/schema";
import {
    type MutationSchema,
    type ShapeSchema
} from "@use-pico/source";

export interface IRepository<
    TEntitySchema extends WithIdentitySchema,
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TMutationSchema extends MutationSchema<TShapeSchema, TQuerySchema>,
    TDatabase extends Database,
> {
    readonly entitySchema: TEntitySchema;
    readonly shapeSchema: TShapeSchema;
    readonly querySchema: TQuerySchema;
    readonly mutationSchema: TMutationSchema;
    readonly client: Client<TDatabase>;

    count(query: PicoSchema.Output<TQuerySchema>): Promise<CountSchema.Type>;

    query(query: PicoSchema.Output<TQuerySchema>): Promise<PicoSchema.Output<TEntitySchema>[]>;

    mutate(mutation: PicoSchema.Output<TMutationSchema>): Promise<PicoSchema.Output<TEntitySchema>>;

    create(create: PicoSchema.Output<TMutationSchema["shape"]["create"]>): Promise<PicoSchema.Output<TEntitySchema>>;
}
