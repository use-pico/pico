import {withDullSchema}     from "@use-pico/dull-stuff";
import {
    type Client,
    type Database
}                           from "@use-pico/orm";
import {type IRepository}   from "../api/IRepository";
import {type IWithMutation} from "../api/IWithMutation";

export class WithMutation<
    TDatabase extends Database,
    TSchema extends withDullSchema.Schema<any, any, any, any>,
    TTable extends keyof TDatabase & string,
> implements IWithMutation<TDatabase, TSchema, TTable> {
    constructor(
        public client: Client<TDatabase>,
        public schema: TSchema,
        public table: TTable,
        public repository: IRepository<TDatabase, TSchema, any>,
    ) {
    }

    public async mutation(mutate: withDullSchema.Infer.Mutation<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema>> {
        if (mutate.create) {
            return this.create(mutate.create);
        } else if (mutate.update) {
            return this.update(mutate.update);
        } else if (mutate.delete) {
            return this.delete(mutate.delete);
        }
        throw new Error("Nothing to mutate.");
    }

    public async create(create: withDullSchema.Infer.Create<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema>> {
        const entity = await this.client
            .insertInto(this.table)
            .values(await this.repository.toCreate(create) as withDullSchema.Infer.Entity<TSchema>)
            .returningAll()
            .executeTakeFirstOrThrow();
        await this.repository.onCreate(entity);
        return entity;
    }

    public async update(
        {
            update,
            query,
        }: withDullSchema.Infer.Update<TSchema>
    ): Promise<withDullSchema.Infer.Entity<TSchema>> {
        let entity = await this.repository.withQuery.fetchOrThrow(query);
        if (!update) {
            return entity;
        }
        entity = await this.client
            .updateTable(this.table)
            .set(await this.repository.toUpdate(update))
            /**
             * Resolve an entity with a query to get an ID being updated
             */
            .where("id", "=", entity.id)
            .returningAll()
            .executeTakeFirstOrThrow() as withDullSchema.Infer.Entity<TSchema>;
        await this.repository.onUpdate(entity);
        return entity;
    }

    public async delete(query: withDullSchema.Infer.Delete<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema>> {
        const entity = await this.repository.withQuery.fetchOrThrow(query);
        await this.client.deleteFrom(this.table).where("id", "=", entity.id).execute();
        return entity;
    }
}
