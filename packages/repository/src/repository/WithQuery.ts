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
import {type IRepository}    from "../api/IRepository";
import {type IWithApply}     from "../api/IWithApply";
import {type IWithQuery}     from "../api/IWithQuery";

export class WithQuery<
    TDatabase extends Database,
    TSchema extends IRepository.Schema<any, any, QuerySchema<any, any>, MutationSchema<any, any>>,
    TTable extends keyof TDatabase & string,
> implements IWithQuery<TDatabase, TSchema, TTable> {
    constructor(
        public client: Client<TDatabase>,
        public schema: TSchema,
        public table: TTable,
        public withApply: IWithApply<TDatabase, TSchema, any>,
    ) {
    }

    public async query(query: PicoSchema.Output<TSchema["query"]>): Promise<PicoSchema.Output<TSchema["entity"]>[]> {
        let select = this.withApply.applyFilter(
            query,
            this.withApply.applyWhere(
                query,
                this.client.selectFrom(this.table)
            )
        ).selectAll();

        query.cursor && (select = select.limit(query.cursor.size).offset(query.cursor.page * query.cursor.size));

        return await select.execute();
    }

    public async count(query: PicoSchema.Output<TSchema["query"]>): Promise<CountSchema.Type> {
        return {
            count: parseInt(
                (
                    await this.withApply.applyFilter(
                        query,
                        this.client
                            .selectFrom(this.table)
                            .select(({fn}) => [
                                fn.count("id").as("count")
                            ])
                    ).executeTakeFirst() as any
                ).count as string
            ),

            where: parseInt(
                (
                    await this.withApply.applyWhere(
                        query,
                        this.client
                            .selectFrom(this.table)
                            .select(({fn}) => [
                                fn.count("id").as("count")
                            ])
                    ).executeTakeFirst() as any
                ).count as string
            ),

            total: parseInt(
                (await this.client
                    .selectFrom(this.table)
                    .select(({fn}) => [
                        fn.count("id").as("count")
                    ])
                    .executeTakeFirst() as any).count as string
            ),
        };
    }
}
