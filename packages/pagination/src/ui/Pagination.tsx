import {Translation}          from "@use-pico/i18n";
import {type WithSourceQuery} from "@use-pico/rpc";
import {
    BlockStore,
    Divider,
    Grid,
    Group,
    NativeBreadcrumbs,
    Pagination as CoolPagination,
    Select,
    Text
}                             from "@use-pico/ui";
import {type FC}              from "react";

export namespace Pagination {
    export interface Props extends Partial<CoolPagination.Props> {
        withSourceQuery: WithSourceQuery<any, any, any>;
        hideOnSingle?: boolean;
        refresh?: number;
    }
}

export const Pagination: FC<Pagination.Props> = (
    {
        withSourceQuery,
        hideOnSingle = true,
        refresh,
        ...props
    }) => {
    const {
        cursor,
        setCursor,
        setSize
    } = withSourceQuery.query.use((
        {
            cursor,
            setCursor,
            setSize
        }) => ({
        cursor,
        setCursor,
        setSize
    }));
    const {isBlock} = BlockStore.use(({isBlock}) => ({isBlock}));
    const result = withSourceQuery.useCount({
        refetchInterval: refresh,
    });
    const pages = Math.ceil((result.data?.count || 0) / cursor.size);
    return <Grid
        align={"center"}
        py={"sm"}
    >
        {hideOnSingle && pages === 1 ? null : <Grid.Col span={"content"}>
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
        </Grid.Col>}
        {result.data && result.data.where > 0 && <Grid.Col span={"auto"}>
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
        </Grid.Col>}
        {pages > 0 && <Grid.Col span={"content"}>
            <Select
                defaultValue={`${cursor.size}`}
                onChange={value => value && setSize(parseInt(value))}
                data={[5, 10, 30, 50, 100, 250, 500, 1000].map(size => ({
                    value: `${size}`,
                    label: `${size}`,
                }))}
            />
        </Grid.Col>}
    </Grid>;
};
