import {type IContainer} from "@use-pico/container";
import {withClient}      from "@use-pico/orm";
import {
    type CountSchema,
    type QuerySchema
}                        from "@use-pico/query";
import {type PicoSchema} from "@use-pico/schema";
import {type IWithWhere} from "../api/IWithWhere";

export namespace withCount {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
    > {
        container: IContainer.Type;
        request: PicoSchema.Output<TQuerySchema>;
        table: string;
        withWhere?: IWithWhere<TQuerySchema, any>;
        withFilter?: IWithWhere<TQuerySchema, any>;
    }
}

export const withCount = async <
    TQuerySchema extends QuerySchema<any, any>,
>(
    {
        request,
        container,
        table,
        withWhere = ({query}) => query,
        withFilter = ({query}) => query,
    }: withCount.Props<TQuerySchema>
): Promise<CountSchema.Type> => {
    const client = withClient.use(container);

    return {
        count: parseInt(
            (
                await withFilter({
                    query:  request,
                    select: client
                                .selectFrom(table as any)
                                .select(({fn}) => [
                                    fn.count("id").as("count")
                                ]),
                })
                    .executeTakeFirst() as any
            ).count as string
        ),

        where: parseInt(
            (
                await withWhere({
                    query:  request,
                    select: client
                                .selectFrom(table as any)
                                .select(({fn}) => [
                                    fn.count("id").as("count")
                                ]),
                })
                    .executeTakeFirst() as any
            ).count as string
        ),

        total: parseInt(
            (await client
                .selectFrom(table as any)
                .select(({fn}) => [
                    fn.count("id").as("count")
                ])
                .executeTakeFirst() as any).count as string
        ),
    };
};
