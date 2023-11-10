import {tx}             from "@use-pico/i18n";
import {
    type IQueryStore,
    type QuerySchema
}                       from "@use-pico/query";
import {
    type IWithSourceQuery,
    useCount
}                       from "@use-pico/source";
import {useStore}       from "@use-pico/store";
import {
    BlockStore,
    Divider,
    Grid,
    GridCol,
    Group,
    Loader,
    NativeBreadcrumbs,
    Pagination as CoolPagination,
    Select,
    Text
}                       from "@use-pico/ui";
import {type ReactNode} from "react";

export namespace Pagination {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
    > extends Partial<CoolPagination.Props> {
        text?: {
            total?: ReactNode;
        };
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, any>;
        hideOnSingle?: boolean;
        refresh?: number;
    }
}

export const Pagination = <
    TQuerySchema extends QuerySchema<any, any>,
>(
    {
        text,
        withQueryStore,
        withSourceQuery,
        hideOnSingle = true,
        refresh,
        ...props
    }: Pagination.Props<TQuerySchema>
) => {
    const {
        cursor,
        setCursor,
        setSize,
    } = useStore(withQueryStore, (
        {
            cursor,
            setCursor,
            setSize
        }) => ({
        cursor,
        setCursor,
        setSize
    }));
    const {isBlock} = useStore(BlockStore, ({isBlock}) => ({isBlock}));
    const result = useCount({
        store: withQueryStore,
        withSourceQuery: withSourceQuery,
        refetchInterval: refresh,
    });
    const pages = Math.ceil((result.data?.count || 0) / (cursor?.size || 30));

    return <Grid
        align={"center"}
        py={"sm"}
    >
        {hideOnSingle && pages === 1 ? null : result.isSuccess && result.data.count > 0 ? <GridCol span={"content"}>
            <CoolPagination
                disabled={isBlock}
                withControls={pages > 10}
                withEdges={pages > 10}
                size={"md"}
                radius={"sm"}
                total={pages}
                boundaries={2}
                siblings={2}
                value={(cursor?.page || 0) + 1}
                onChange={page => setCursor(page - 1)}
                {...props}
            />
        </GridCol> : null}
        {result.isLoading && <GridCol span={"auto"}>
            <Group gap={"xs"}>
                <Text c={"dimmed"}>
                    {text?.total || tx()`Total number of items`}
                </Text>
                <NativeBreadcrumbs>
                    <Text size={"lg"} fw={"500"}>
                        <Loader size={"sm"} type={"dots"}/>
                    </Text>
                </NativeBreadcrumbs>
            </Group>
        </GridCol>}
        {result.data && <GridCol span={"auto"}>
            {hideOnSingle ? (pages > 1) : (pages > 0) && <Divider orientation={"vertical"}/>}
            <Group gap={"xs"}>
                <Text c={"dimmed"}>
                    {text?.total || tx()`Total number of items`}
                </Text>
                <NativeBreadcrumbs>
                    <Text
                        size={"lg"}
                        fw={"500"}
                        c={result.isFetching ? "dimmed" : undefined}
                    >
                        {result.data.count}
                    </Text>
                    {result.data.count !== result.data.where && <Text
                        size={"lg"}
                        fw={"500"}
                        c={result.isFetching ? "dimmed" : undefined}
                    >
                        {result.data.where}
                    </Text>}
                </NativeBreadcrumbs>
            </Group>
        </GridCol>}
        <GridCol span={"content"}>
            <Select
                disabled={result.isLoading || result.isSuccess && result.data.count <= 0}
                defaultValue={`${(cursor?.size || 30)}`}
                onChange={value => value && setSize(parseInt(value))}
                data={[5, 10, 30, 50, 100, 250, 500, 1000].map(size => ({
                    value: `${size}`,
                    label: `${size}`,
                }))}
            />
        </GridCol>
    </Grid>;
};
