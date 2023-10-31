import {
    type Client,
    type Database
}                         from "@use-pico/orm";
import {
    type CountSchema,
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                         from "@use-pico/query";
import {type IRepository} from "@use-pico/repository";
import {
    type PicoSchema,
    type WithIdentitySchema
}                         from "@use-pico/schema";
import {
    type MutationSchema,
    type ShapeSchema
}                         from "@use-pico/source";
import {generateId}       from "@use-pico/utils";

export abstract class AbstractRepository<
    TEntitySchema extends WithIdentitySchema,
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TMutationSchema extends MutationSchema<TShapeSchema, TQuerySchema>,
    TDatabase extends Database,
> implements IRepository<
    TEntitySchema,
    TShapeSchema,
    TQuerySchema,
    TMutationSchema,
    TDatabase
> {
    protected constructor(
        readonly entitySchema: TEntitySchema,
        readonly shapeSchema: TShapeSchema,
        readonly querySchema: TQuerySchema,
        readonly mutationSchema: TMutationSchema,
        readonly client: Client<any>,
        readonly table: keyof TDatabase & string,
    ) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async count(query: PicoSchema.Output<TQuerySchema>): Promise<CountSchema.Type> {
        return {
            total: parseInt(
                (
                    await this.client.selectFrom(this.table).select(({fn}) => [
                        fn.count<number>("id").as("total")
                    ]).executeTakeFirstOrThrow()
                ).total as unknown as string
            ),

            where: parseInt(
                (
                    await this.client.selectFrom(this.table).select(({fn}) => [
                        fn.count<number>("id").as("total")
                    ]).executeTakeFirstOrThrow()
                ).total as unknown as string
            ),

            count: parseInt(
                (
                    await this.client.selectFrom(this.table).select(({fn}) => [
                        fn.count<number>("id").as("total")
                    ]).executeTakeFirstOrThrow()
                ).total as unknown as string
            ),
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async query(query: PicoSchema.Output<TQuerySchema>): Promise<PicoSchema.Output<TEntitySchema>[]> {
        return await this.client.selectFrom(this.table).selectAll().execute() as unknown as Promise<PicoSchema.Output<TEntitySchema>[]>;
    }

    public async mutate(mutation: PicoSchema.Output<TMutationSchema>): Promise<PicoSchema.Output<TEntitySchema>> {
        if (mutation.create) {
            return this.create(mutation.create);
        }
        throw new Error("Nothing to do");
    }

    /**
     * Create small standalone functions handling individual actions which could be created by a factory:
     *
     * something like withCreate, withMutate, blablabla
     */




    public async create(create: PicoSchema.Output<TMutationSchema["shape"]["create"]>): Promise<PicoSchema.Output<TEntitySchema>> {
        return await this.client.insertInto(this.table).values({
            ...create,
            id: generateId(),
        }).returningAll().executeTakeFirstOrThrow() as unknown as Promise<PicoSchema.Output<TEntitySchema>>;
    }
}
