import {Pagination}           from "@use-pico/pagination";
import {WithQuery}            from "@use-pico/query";
import {type WithSourceQuery} from "@use-pico/rpc";
import {
    type RequestSchema,
    type WithIdentitySchema
}                             from "@use-pico/schema";
import {
    BlockStore,
    Box,
    LoadingOverlay,
    ScrollArea,
    Status
}                             from "@use-pico/ui";
import {
    classNames,
    type z
}                             from "@use-pico/utils";
import {type FC}              from "react";
import classes                from "./List.module.css";

export namespace List {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends WithIdentitySchema,
    > {
        withSourceQuery: WithSourceQuery<TResponseSchema, any, any>;
        options?: WithQuery.QueryOptions<
            TRequestSchema,
            z.ZodArray<TResponseSchema>
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
        item: z.infer<TResponseSchema>;
    }
}

export const List = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        withSourceQuery,
        options,
        scrollWidth,
        Item,
        Prefix = () => null,
        Header = () => null,
        Footer = () => null,
        Suffix = () => null,
        Empty = () => <Status
            title={"empty.title"}
            message={"empty.message"}
        />,
        isLoading = false,
    }: List.Props<TRequestSchema, TResponseSchema>
) => {
    const {isBlock} = BlockStore.use(({isBlock}) => ({isBlock}));
    const result = withSourceQuery.useQuery(options);
    const countResult = withSourceQuery.useCount();
    const $isLoading = (result.isFetching && !result.isRefetching) || countResult.isLoading;
    return <>
        <Prefix/>
        <Pagination
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
            withSourceQuery={withSourceQuery}
        />
    </>;
};
