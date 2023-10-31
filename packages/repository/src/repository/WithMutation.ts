import {
    type Client,
    type Database
}                            from "@use-pico/orm";
import {type QuerySchema}    from "@use-pico/query";
import {type PicoSchema}     from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {generateId}          from "@use-pico/utils";
import {type IRepository}    from "../api/IRepository";
import {type IWithApply}     from "../api/IWithApply";
import {type IWithMutation}  from "../api/IWithMutation";

export class WithMutation<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<any, any, QuerySchema<any, any>, MutationSchema<any, any>>,
    TTable extends keyof TDatabase & string,
> implements IWithMutation<TDatabase, TSchema, TTable> {
    constructor(
        public client: Client<TDatabase>,
        public schema: TSchema,
        public table: TTable,
        public query: IWithApply<TDatabase, TSchema, any>,
    ) {
    }

    public async create(create: PicoSchema.Output<TSchema["mutation"]["shape"]["create"]>): Promise<TSchema["entity"]> {
        return await this.client
            .insertInto(this.table)
            .values({
                ...create,
                id: generateId(),
            })
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    public async mutation(mutate: PicoSchema.Output<TSchema["mutation"]>): Promise<TSchema["entity"]> {
        if (mutate.create) {
            return this.create(mutate.create);
        }
        throw new Error("Nothing to mutate.");
    }
}
