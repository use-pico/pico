import {tx}         from "@use-pico/i18n";
import {Pagination} from "@use-pico/pagination";
import {
    type IQueryStore,
    type IWithQuery,
    type QuerySchema,
}                   from "@use-pico/query";
import {
    type ArraySchema,
    type PicoSchema,
    type WithIdentitySchema
}                   from "@use-pico/schema";
import {
    type IWithSourceQuery,
    useCount,
    useQuery
}                   from "@use-pico/source";
import {useStore}   from "@use-pico/store";
import {
    BlockStore,
    Box,
    LoadingOverlay,
    ScrollArea,
    Status
}                   from "@use-pico/ui";
import {classNames} from "@use-pico/utils";
import {
    type FC,
    type ReactNode
}                   from "react";
import classes      from "./List.module.css";

export namespace List {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TResponseSchema extends WithIdentitySchema,
    > {
        text: {
            total: ReactNode;
        };
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
        options?: IWithQuery.QueryOptions<
            ArraySchema<TResponseSchema>
        >;
        scrollWidth?: number;
        Item: Item<TResponseSchema>;
        Prefix?: FC;
        Header?: FC;
        Footer?: FC;
        Empty?: FC;
        Suffix?: FC;
        isLoading?: boolean;
    }

    export type Classes = typeof classes;

    export type Item<TResponseSchema extends WithIdentitySchema> = FC<ItemProps<TResponseSchema>>;

    export interface ItemProps<TResponseSchema extends WithIdentitySchema> {
        item: PicoSchema.Output<TResponseSchema>;
    }
}

export const List = <
    TQuerySchema extends QuerySchema<any, any>,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        text,
        withQueryStore,
        withSourceQuery,
        options,
        scrollWidth,
        Item,
        Prefix = () => null,
        Header = () => null,
        Footer = () => null,
        Suffix = () => null,
        Empty = () => <Status
            text={{
                title:   tx()`Nothing here`,
                message: tx()`This listing is empty`,
            }}
        />,
        isLoading = false,
    }: List.Props<TQuerySchema, TResponseSchema>
) => {
    const {isBlock} = useStore(BlockStore, ({isBlock}) => ({isBlock}));
    const result = useQuery({
        store:           withQueryStore,
        withSourceQuery: withSourceQuery,
        ...options,
    });
    const countResult = useCount({
        store: withQueryStore,
        withSourceQuery
    });
    const $isLoading = (result.isFetching && !result.isRefetching) || countResult.isLoading;

    return <>
        <Prefix/>
        <Pagination
            text={text}
            withQueryStore={withQueryStore}
            withSourceQuery={withSourceQuery}
        />
        <ScrollArea
            w={"100%"}
        >
            <Box
                pos={"relative"}
                w={countResult.isSuccess && countResult.data.count > 0 ? scrollWidth : undefined}
            >
                <LoadingOverlay
                    transitionProps={{
                        duration: 500,
                    }}
                    visible={isBlock || $isLoading || isLoading}
                />
                <Header/>
                <Box
                    my={"md"}
                    className={classNames(
                        (countResult.data?.count || 0) > 0 ? classes.ListBorder : undefined
                    )}
                >
                    {result.data?.map(item => <Box
                        key={item.id}
                        className={classes.Item}
                        py={"xs"}
                    >
                        <Item item={item}/>
                    </Box>)}
                </Box>
                {countResult.data && !countResult.data.where && <Empty/>}
                <Footer/>
            </Box>
        </ScrollArea>
        <Suffix/>
        <Pagination
            text={text}
            withQueryStore={withQueryStore}
            withSourceQuery={withSourceQuery}
        />
    </>;
};
