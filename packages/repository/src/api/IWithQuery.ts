import {
    type Client,
    type Database
}                            from "@use-pico/orm";
import {
    type CountSchema,
    type QuerySchema
}                            from "@use-pico/query";
import {type PicoSchema}     from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {type IRepository}    from "./IRepository";
import {type IWithApply}     from "./IWithApply";

export interface IWithQuery<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<any, any, QuerySchema<any, any>, MutationSchema<any, any>>,
    TTable extends keyof TDatabase & string,
> {
    readonly client: Client<TDatabase>;
    readonly schema: TSchema;
    readonly table: TTable;
    readonly withApply: IWithApply<TDatabase, TSchema, TTable>;

    query(query: PicoSchema.Output<TSchema["query"]>): Promise<PicoSchema.Output<TSchema["entity"]>[]>;

    count(query: PicoSchema.Output<TSchema["query"]>): Promise<CountSchema.Type>;
}
