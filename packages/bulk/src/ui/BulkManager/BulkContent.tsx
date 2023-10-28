import {WithTranslationProvider} from "@use-pico/i18n";
import {
    type WithMutation,
    type WithQuery
}                                from "@use-pico/query";
import {
    resultOf,
    type WithSourceQuery
}                                from "@use-pico/rpc";
import {type WithIdentitySchema} from "@use-pico/schema";
import {List}                    from "@use-pico/source";
import {
    Box,
    Status,
    Tabs
}                                from "@use-pico/ui";
import {BulkItemStatus}          from "../../api/BulkItemStatus";
import {BulkItemMutationSchema}  from "../../schema/BulkItemMutationSchema";
import {BulkItemQuerySchema}     from "../../schema/BulkItemQuerySchema";
import {BulkItemSchema}          from "../../schema/BulkItemSchema";
import {BulkStatsSchema}         from "../../schema/BulkStatsSchema";
import {BulkManager}             from "../BulkManager";
import {StatusList}              from "./StatusList";

export namespace BulkContent {
    export interface Props<
        TSchema extends WithIdentitySchema,
    > {
        schema: TSchema;
        bulkId: string;
        service: string;
        withBulkStats: WithQuery<WithIdentitySchema, BulkStatsSchema>;
        withSourceQuery: WithSourceQuery<BulkItemSchema, BulkItemQuerySchema>;
        withBulkItemMutation: WithMutation<BulkItemMutationSchema, BulkItemSchema>;
        Item: BulkManager.Props<TSchema>["Item"];
        listProps?: BulkManager.Props<TSchema>["listProps"];
        /**
         * When bulk has a result, and it matches the given schema, this component would render.
         */
        WithResult?: BulkManager.Props<TSchema>["WithResult"];
    }
}

export const BulkContent = <
    TSchema extends WithIdentitySchema,
>(
    {
        schema,
        bulkId,
        service,
        withBulkStats,
        withSourceQuery,
        withBulkItemMutation,
        Item,
        listProps,
        WithResult = () => null,
    }: BulkContent.Props<TSchema>
) => {
    return <>
        {StatusList.map(item => <Tabs.Panel
            key={`bulk-tab-panel-${item.label}`}
            value={item.label}
        >
            <withSourceQuery.store.Provider
                defaults={{
                    where:  {
                        bulkId,
                        status: item.status,
                    },
                    cursor: {
                        page: 0,
                        size: 10,
                    }
                }}
            >
                <List
                    Empty={() => <WithTranslationProvider
                        withTranslation={{
                            namespace: "common.bulk.item",
                        }}
                    >
                        <Status
                            title={"empty.title"}
                            message={"empty.message"}
                        />
                    </WithTranslationProvider>}
                    withSourceQuery={withSourceQuery}
                    Item={props => {
                        const bulkItemMutation = withBulkItemMutation.useMutation();

                        const result = resultOf({
                            schema,
                            response: props.item.response,
                        });

                        return <>
                            <Item
                                withBulkStats={withBulkStats}
                                bulkId={bulkId}
                                service={service}
                                defaultValues={props.item.values}
                                withMutationOverride={({form}) => ({
                                    mutator:  async values => {
                                        return bulkItemMutation.mutateAsync({
                                            update: {
                                                update: {
                                                    bulkId,
                                                    service,
                                                    status:  BulkItemStatus.PENDING,
                                                    values:  form.getValues(),
                                                    request: values,
                                                },
                                                query:  {
                                                    where: {
                                                        id: props.item.id,
                                                    },
                                                },
                                            },
                                        });
                                    },
                                    response: BulkItemSchema,
                                })}
                                {...props}
                            />
                            {result && <Box
                                mt={"xs"}
                            >
                                <WithResult item={result}/>
                            </Box>}
                        </>;
                    }}
                    {...listProps}
                />
            </withSourceQuery.store.Provider>
        </Tabs.Panel>)}
    </>;
};
