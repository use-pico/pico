import {
    type Client,
    type Database
}                            from "@use-pico/orm";
import {type QuerySchema}    from "@use-pico/query";
import {type PicoSchema}     from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {type IRepository}    from "../api/IRepository";
import {type IWithMutation}  from "../api/IWithMutation";

export class WithMutation<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<any, any, QuerySchema<any, any>, MutationSchema<any, QuerySchema<any, any>>>,
    TTable extends keyof TDatabase & string,
> implements IWithMutation<TDatabase, TSchema, TTable> {
    constructor(
        public client: Client<TDatabase>,
        public schema: TSchema,
        public table: TTable,
        public repository: IRepository<TDatabase, TSchema, any>,
    ) {
    }

    public async mutation(mutate: PicoSchema.Output<TSchema["mutation"]>): Promise<PicoSchema.Output<TSchema["entity"]>> {
        if (mutate.create) {
            return this.create(mutate.create);
        } else if (mutate.update) {
            return this.update(mutate.update);
        } else if (mutate.delete) {
            return this.delete(mutate.delete);
        }
        throw new Error("Nothing to mutate.");
    }

    public async create(create: NonNullable<PicoSchema.Output<TSchema["mutation"]["shape"]["create"]>>): Promise<PicoSchema.Output<TSchema["entity"]>> {
        return await this.client
            .insertInto(this.table)
            .values(await this.repository.toCreate(create) as PicoSchema.Output<TSchema["entity"]>)
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    public async update(
        {
            update,
            query,
        }: NonNullable<PicoSchema.Output<TSchema["mutation"]["shape"]["update"]>>
    ): Promise<PicoSchema.Output<TSchema["entity"]>> {
        const entity = await this.repository.withQuery.fetchOrThrow(query);
        if (!update) {
            return entity;
        }
        return await this.client
            .updateTable(this.table)
            .set(await this.repository.toUpdate(update))
            /**
             * Resolve an entity with a query to get an ID being updated
             */
            .where("id", "=", entity.id)
            .returningAll()
            .executeTakeFirst();
    }

    public async delete(query: NonNullable<PicoSchema.Output<TSchema["mutation"]["shape"]["delete"]>>): Promise<PicoSchema.Output<TSchema["entity"]>> {
        const entity = await this.repository.withQuery.fetchOrThrow(query);
        await this.client.deleteFrom(this.table).where("id", "=", entity.id).execute();
        return entity;
    }
}
