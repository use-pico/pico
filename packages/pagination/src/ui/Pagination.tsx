import {Translation} from "@use-pico/i18n";
import {
    type IQueryStore,
    type QuerySchema
}                    from "@use-pico/query";
import {
    type IWithSourceQuery,
    useCount
}                    from "@use-pico/source";
import {useStore}    from "@use-pico/store";
import {
    BlockStore,
    Divider,
    Grid,
    GridCol,
    Group,
    NativeBreadcrumbs,
    Pagination as CoolPagination,
    Select,
    Text
}                    from "@use-pico/ui";

export namespace Pagination {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
    > extends Partial<CoolPagination.Props> {
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
        setSize
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
    const pages = Math.ceil((result.data?.count || 0) / cursor.size);

    return <Grid
        align={"center"}
        py={"sm"}
    >
        {hideOnSingle && pages === 1 ? null : <GridCol span={"content"}>
            <CoolPagination
                disabled={isBlock}
                withEdges
                size={"md"}
                radius={"sm"}
                total={pages}
                boundaries={2}
                siblings={2}
                value={cursor.page + 1}
                onChange={page => setCursor(page - 1)}
                {...props}
            />
        </GridCol>}
        {result.data && result.data.where > 0 && <GridCol span={"auto"}>
            {hideOnSingle ? (pages > 1) : (pages > 0) && <Divider orientation={"vertical"}/>}
            <Group gap={"xs"}>
                <Text c={"dimmed"}>
                    <Translation withLabel={"total.label"}/>
                </Text>
                <NativeBreadcrumbs>
                    <Text size={"lg"} fw={"500"}>
                        {result.data.count}
                    </Text>
                    {result.data.count !== result.data.where && <Text size={"lg"} fw={"500"}>
                        {result.data.where}
                    </Text>}
                </NativeBreadcrumbs>
            </Group>
        </GridCol>}
        {pages > 0 && <GridCol span={"content"}>
            <Select
                defaultValue={`${cursor.size}`}
                onChange={value => value && setSize(parseInt(value))}
                data={[5, 10, 30, 50, 100, 250, 500, 1000].map(size => ({
                    value: `${size}`,
                    label: `${size}`,
                }))}
            />
        </GridCol>}
    </Grid>;
};
