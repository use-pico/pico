import {IconRefresh}             from "@tabler/icons-react";
import {
    type IQueryStore,
    type QuerySchema
}                                from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {
    Fulltext,
    type IWithSourceQuery,
    useInvalidator
}                                from "@use-pico/source";
import {
    ActionIcon,
    Grid,
    GridCol
}                                from "@use-pico/ui";
import {type FC}                 from "react";

export namespace TableHeaderControls {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TSchema extends WithIdentitySchema,
    > {
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
        withQueryStore,
        withSourceQuery,
        Filter,
        Postfix,
    }: TableHeaderControls.Props<TQuerySchema, TSchema>
) => {
    const invalidator = useInvalidator({
        withSourceQuery,
    });
    return <Grid
        align={"center"}
        mb={"xs"}
        gutter={"xs"}
    >
        <GridCol span={"auto"}>
            <Fulltext
                withQueryStore={withQueryStore}
            />
        </GridCol>
        <GridCol span={"content"}>
            <ActionIcon
                size={"xl"}
                variant={"subtle"}
                color={"blue.5"}
                onClick={() => invalidator()}
            >
                <IconRefresh/>
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
