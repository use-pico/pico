import {IconRefresh}          from "@tabler/icons-react";
import {
    type FilterSchema,
    type OrderBySchema
}                             from "@use-pico/query";
import {type WithSourceQuery} from "@use-pico/rpc";
import {type PicoSchema}      from "@use-pico/schema";
import {Fulltext}             from "@use-pico/source";
import {
    ActionIcon,
    Grid
}                             from "@use-pico/ui";
import {type FC}              from "react";

export namespace TableHeaderControls {
    export interface Props<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withSourceQuery: WithSourceQuery<TSchema, TFilterSchema, TOrderBySchema>;
        Filter?: FC<FilterProps<TSchema, TFilterSchema, TOrderBySchema>>;
    }

    export interface FilterProps<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withSourceQuery: WithSourceQuery<TSchema, TFilterSchema, TOrderBySchema>;
    }
}

export const TableHeaderControls = <
    TSchema extends PicoSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        withSourceQuery,
        Filter,
    }: TableHeaderControls.Props<TSchema, TFilterSchema, TOrderBySchema>
) => {
    const invalidator = withSourceQuery.useInvalidator();
    return <Grid
        align={"center"}
        mb={"xs"}
        gutter={"xs"}
    >
        <Grid.Col span={"auto"}>
            <Fulltext
                withSourceQuery={withSourceQuery}
            />
        </Grid.Col>
        <Grid.Col span={"content"}>
            <ActionIcon
                size={"xl"}
                variant={"subtle"}
                color={"blue.5"}
                onClick={() => invalidator()}
            >
                <IconRefresh/>
            </ActionIcon>
        </Grid.Col>
        {Filter && <Grid.Col span={"content"}>
            <Filter withSourceQuery={withSourceQuery}/>
        </Grid.Col>}
    </Grid>;
};
