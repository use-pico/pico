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
import {
    type SelectExpression,
    type Selection,
    type SelectQueryBuilder
}                            from "kysely";
import {type IRepository}    from "../api/IRepository";
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
        public repository: IRepository<TDatabase, TSchema, any>,
    ) {
    }

    public async count(query: PicoSchema.Output<TSchema["query"]>): Promise<CountSchema.Type> {
        return {
            count: parseInt(
                (
                    await this.repository.applyFilter(
                        query,
                        this.repository.applyWhere(
                            query,
                            this.client
                                .selectFrom(this.table)
                                .select(({fn}) => [
                                    fn.count("id").as("count")
                                ])
                        )
                    ).executeTakeFirst() as any
                ).count as string
            ),

            where: parseInt(
                (
                    await this.repository.applyWhere(
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

    public async query(query: PicoSchema.Output<TSchema["query"]>): Promise<PicoSchema.Output<TSchema["entity"]>[]> {
        return this.repository.applyTo(
            query,
            this.client
                .selectFrom(this.table)
                .selectAll()
        ).execute();
    }

    public async fetch(query: PicoSchema.Output<TSchema["query"]>): Promise<PicoSchema.Output<TSchema["entity"]> | undefined> {
        return this.repository.applyTo(
            query,
            this.client.selectFrom(this.table).selectAll()
        ).executeTakeFirst();
    }

    public async fetchOrThrow(query: PicoSchema.Output<TSchema["query"]>): Promise<PicoSchema.Output<TSchema["entity"]>> {
        return this.repository.applyTo(
            query,
            this.client.selectFrom(this.table).selectAll()
        ).executeTakeFirstOrThrow();
    }

    public select<
        TExpression extends SelectExpression<TDatabase, TTable>
    >(
        selections: ReadonlyArray<TExpression>
    ): SelectQueryBuilder<
        TDatabase,
        TTable,
        Selection<TDatabase, TTable, TExpression>
    > {
        return this.client.selectFrom(this.table).select(selections as any) as any;
    }
}
