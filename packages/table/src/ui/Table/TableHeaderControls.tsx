import {IconRefresh}             from "@tabler/icons-react";
import {
    type IQueryStore,
    type QuerySchema,
    useInvalidator
}                                from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {type IWithSourceQuery}   from "@use-pico/source";
import {Fulltext}                from "@use-pico/source-ui";
import {
    ActionIcon,
    Grid,
    GridCol,
    Loader
}                                from "@use-pico/ui";
import {type FC}                 from "react";

export namespace TableHeaderControls {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TSchema extends WithIdentitySchema,
    > {
        text?: Fulltext.Props<TQuerySchema>["text"];
        isFetching: boolean;
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
        Filter?: FC<FilterProps<TQuerySchema, TSchema>>;
        Postfix?: FC;
    }

    export interface FilterProps<
        TQuerySchema extends QuerySchema<any, any>,
        TSchema extends WithIdentitySchema,
    > {
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
    }
}

export const TableHeaderControls = <
    TQuerySchema extends QuerySchema<any, any>,
    TSchema extends WithIdentitySchema,
>(
    {
        text,
        isFetching,
        withQueryStore,
        withSourceQuery,
        Filter,
        Postfix,
    }: TableHeaderControls.Props<TQuerySchema, TSchema>
) => {
    const invalidator = useInvalidator({
        invalidator: withSourceQuery,
    });
    return <Grid
        align={"center"}
        mb={"xs"}
        gutter={"xs"}
    >
        <GridCol span={"auto"}>
            <Fulltext
                text={text}
                withQueryStore={withQueryStore}
            />
        </GridCol>
        <GridCol span={"content"}>
            <ActionIcon
                disabled={isFetching}
                size={"xl"}
                variant={"subtle"}
                color={"blue.5"}
                onClick={() => invalidator()}
            >
                {isFetching ? <Loader size={"xs"}/> : <IconRefresh/>}
            </ActionIcon>
        </GridCol>
        {Filter && <GridCol span={"content"}>
            <Filter
                withQueryStore={withQueryStore}
                withSourceQuery={withSourceQuery}
            />
        </GridCol>}
        {Postfix && <GridCol span={"content"}>
            <Postfix/>
        </GridCol>}
    </Grid>;
};
