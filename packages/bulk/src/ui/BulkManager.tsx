import {Form}                    from "@pico/form";
import {
    type IWithTranslation,
    WithTranslationProvider
}                                from "@pico/i18n";
import {
    type WithIdentitySchema,
    type WithMutation,
    type WithQuery
}                                from "@pico/query";
import {type WithSourceQuery}    from "@pico/rpc";
import {List}                    from "@pico/source";
import {WithItem}                from "@pico/types";
import {
    BlockProvider,
    Tabs
}                                from "@pico/ui";
import {type FC}                 from "react";
import {type IUseBulkJobManager} from "../api/IUseBulkJobManager";
import {BulkItemFilterSchema}    from "../schema/BulkItemFilterSchema";
import {BulkItemMutationSchema}  from "../schema/BulkItemMutationSchema";
import {BulkItemOrderBySchema}   from "../schema/BulkItemOrderBySchema";
import {BulkItemQuerySchema}     from "../schema/BulkItemQuerySchema";
import {BulkItemSchema}          from "../schema/BulkItemSchema";
import {type BulkStatsSchema}    from "../schema/BulkStatsSchema";
import {BulkContent}             from "./BulkManager/BulkContent";
import {BulkTabs}                from "./BulkManager/BulkTabs";
import {CreateTab}               from "./BulkManager/CreateTab";

export namespace BulkManager {
    export interface Props<
        TSchema extends WithIdentitySchema,
    > {
        schema: TSchema;
        withTranslation?: IWithTranslation;
        bulkId: string;
        service: string;
        useJobManager: IUseBulkJobManager;
        withBulkStats: WithQuery<WithIdentitySchema, BulkStatsSchema>;
        withBulkItemMutation: WithMutation<BulkItemMutationSchema, BulkItemSchema>;
        withSourceQuery: WithSourceQuery<BulkItemSchema, BulkItemFilterSchema, BulkItemOrderBySchema>;
        WithCreate: WithCreate;
        Item: FC<List.ItemProps<BulkItemSchema> & {
            withBulkStats: WithQuery<WithIdentitySchema, BulkStatsSchema>;
            bulkId: string;
            service: string;
            withMutationOverride: Form.Props<any, any, any, any>["withMutationOverride"];
            defaultValues?: any;
        }>;
        listProps?: Partial<List.Props<BulkItemQuerySchema, BulkItemSchema>>;
        /**
         * When bulk has a result, and it matches the given schema, this component would render.
         */
        WithResult?: FC<WithItem.Schema<TSchema>>;
    }

    export type WithCreate = FC<WithCreate.Props>;

    export namespace WithCreate {
        export interface Props {
            bulkId: string;
            service: string;
            withMutationOverride: Form.Props<any, any, any, any>["withMutationOverride"];
        }
    }
}

export const BulkManager = <
    TSchema extends WithIdentitySchema,
>(
    {
        schema,
        withTranslation,
        bulkId,
        service,
        useJobManager,
        withBulkStats,
        withBulkItemMutation,
        withSourceQuery,
        WithCreate,
        Item,
        listProps,
        WithResult,
    }: BulkManager.Props<TSchema>
) => {
    return <WithTranslationProvider
        withTranslation={withTranslation}
    >
        <BlockProvider>
            <Tabs
                defaultValue={"add"}
            >
                <BulkTabs
                    withBulkStats={withBulkStats}
                    withSourceQuery={withSourceQuery}
                    useJobManager={useJobManager}
                    bulkId={bulkId}
                />

                <Tabs.Panel value={"add"}>
                    <CreateTab
                        WithCreate={WithCreate}
                        bulkId={bulkId}
                        service={service}
                        withBulkItemMutation={withBulkItemMutation}
                    />
                </Tabs.Panel>

                <BulkContent
                    schema={schema}
                    bulkId={bulkId}
                    service={service}
                    withSourceQuery={withSourceQuery}
                    withBulkStats={withBulkStats}
                    withBulkItemMutation={withBulkItemMutation}
                    Item={Item}
                    listProps={listProps}
                    WithResult={WithResult}
                />
            </Tabs>
        </BlockProvider>
    </WithTranslationProvider>;
};
