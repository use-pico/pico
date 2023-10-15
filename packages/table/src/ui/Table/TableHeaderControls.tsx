import {
    type FilterSchema,
    type OrderBySchema
}                             from "@pico/query";
import {type WithSourceQuery} from "@pico/rpc";
import {Fulltext}             from "@pico/source";
import {
    ActionIcon,
    Grid
}                             from "@pico/ui";
import {type z}               from "@pico/utils";
import {IconRefresh}          from "@tabler/icons-react";
import {type FC}              from "react";

export namespace TableHeaderControls {
    export interface Props<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withSourceQuery: WithSourceQuery<TSchema, TFilterSchema, TOrderBySchema>;
        Filter?: FC<FilterProps<TSchema, TFilterSchema, TOrderBySchema>>;
    }

    export interface FilterProps<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withSourceQuery: WithSourceQuery<TSchema, TFilterSchema, TOrderBySchema>;
    }
}

export const TableHeaderControls = <
    TSchema extends z.ZodSchema,
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
