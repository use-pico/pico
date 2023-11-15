import {type withDullSchema} from "@use-pico/dull-stuff";
import {
    type Client,
    type Database
}                            from "@use-pico/orm";
import {type CountSchema}    from "@use-pico/query";
import {
    type SelectExpression,
    type Selection
}                            from "kysely";
import {type IRepository}    from "../api/IRepository";
import {type IWithQuery}     from "../api/IWithQuery";
import {type SelectOf}       from "../api/SelectOf";

export class WithQuery<
    TDatabase extends Database,
    TSchema extends withDullSchema.Schema<any, any, any, any>,
    TTable extends keyof TDatabase & string,
> implements IWithQuery<TDatabase, TSchema, TTable> {
    constructor(
        public client: Client<TDatabase>,
        public schema: TSchema,
        public table: TTable,
        public repository: IRepository<TDatabase, TSchema, any>,
    ) {
    }

    public async count(query: withDullSchema.Infer.Query<TSchema>): Promise<CountSchema.Type> {
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

    public async query(query: withDullSchema.Infer.Query<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema>[]> {
        return this.repository.applyTo(
            query,
            this.client
                .selectFrom(this.table)
                .selectAll()
        ).execute();
    }

    public async fetch(query: withDullSchema.Infer.Query<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema> | undefined> {
        return this.repository.applyTo(
            query,
            this.client.selectFrom(this.table).selectAll()
        ).executeTakeFirst();
    }

    public async fetchOrThrow(query: withDullSchema.Infer.Query<TSchema>): Promise<withDullSchema.Infer.Entity<TSchema>> {
        return this.repository.applyTo(
            query,
            this.client.selectFrom(this.table).selectAll()
        ).executeTakeFirstOrThrow();
    }

    public select<
        TExpression extends SelectExpression<TDatabase, TTable>
    >(
        selections?: ReadonlyArray<TExpression>
    ): SelectOf<
        TDatabase,
        TTable,
        Selection<TDatabase, TTable, TExpression>
    > {
        const query = this.client.selectFrom(this.table);
        return (selections ? query.select(selections as any) : query.selectAll()) as any;
    }
}
