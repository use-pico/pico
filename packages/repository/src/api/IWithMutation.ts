import {
    type Client,
    type Database
}                            from "@use-pico/orm";
import {type QuerySchema}    from "@use-pico/query";
import {type PicoSchema}     from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {type IRepository}    from "./IRepository";
import {type IWithApply}     from "./IWithApply";

export interface IWithMutation<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<any, any, QuerySchema<any, any>, MutationSchema<any, any>>,
    TTable extends keyof TDatabase & string,
> {
    readonly client: Client<TDatabase>;
    readonly schema: TSchema;
    readonly table: TTable;
    readonly query: IWithApply<TDatabase, TSchema, TTable>;

    mutation(mutate: PicoSchema.Output<TSchema["mutation"]>): Promise<TSchema["entity"]>;

    create(create: PicoSchema.Output<TSchema["mutation"]["shape"]["create"]>): Promise<TSchema["entity"]>;
}
