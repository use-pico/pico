import {Translation}               from "@use-pico/i18n";
import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema,
    useQueryEx
}                                  from "@use-pico/query";
import {
    isPartial,
    type PicoSchema,
    type WithIdentitySchema
}                                  from "@use-pico/schema";
import {type IMultiSelectionStore} from "@use-pico/selection";
import {type IWithSourceQuery}     from "@use-pico/source";
import {StoreProvider}             from "@use-pico/store";
import {
    Alert,
    Divider,
    Group,
    Modal,
    ModalStoreProvider,
    Text
}                                  from "@use-pico/ui";
import {type FC}                   from "react";
import {useController}             from "react-hook-form";
import type {ValuesSchema}         from "../schema/ValuesSchema";
import {InputEx}                   from "./InputEx";
import {MultiCommitButton}         from "./MultiQueryInput/MultiCommitButton";
import {WithMultiItem}             from "./MultiQueryInput/WithMultiItem";
import {CancelButton}              from "./QueryInput/CancelButton";
import {ClearButton}               from "./QueryInput/ClearButton";

export namespace MultiQueryInput {
    export interface Props<
        TValuesSchema extends ValuesSchema,
        TResponseSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > extends InputEx.Props<TValuesSchema> {
        /**
         * Query used to fetch current entity.
         */
        withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
        /**
         * Store used to manage selection of current entity.
         */
        MultiSelectionStore: IMultiSelectionStore<PicoSchema.Output<TResponseSchema>>;
        /**
         * Component used to render a list of items to select from.
         */
        Selector: Selector<TResponseSchema>;
        /**
         * Render selected item.
         */
        Items: WithMultiItem.Items<TResponseSchema>;
        /**
         * Optional method used to generate filter to fetch an entity (if more complex filter is needed); defaults to an ID.
         */
        toFilter?: (values: string[]) => PicoSchema.Output<TQuerySchema["shape"]["filter"]> | undefined;
        toOrderBy?: () => PicoSchema.Output<TQuerySchema["shape"]["orderBy"]> | undefined;
        onCommit?: MultiCommitButton.Props<TValuesSchema, TResponseSchema>["onCommit"];
        limit?: number;
    }

    export type Selector<TResponseSchema extends WithIdentitySchema> = FC<SelectorProps<TResponseSchema>>;

    export interface SelectorProps<TResponseSchema extends WithIdentitySchema> {
        /**
         * Access to currently selected item
         */
        MultiSelectionStore: IMultiSelectionStore<PicoSchema.Output<TResponseSchema>>;
    }
}

export const MultiQueryInput = <
    TValuesSchema extends ValuesSchema,
    TResponseSchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withControl,
        schema,
        withSourceQuery,
        MultiSelectionStore,
        toFilter = idIn => ({idIn}),
        toOrderBy = () => undefined,
        Selector,
        Items,
        onCommit,
        limit = 3,
        ...props
    }: MultiQueryInput.Props<TValuesSchema, TResponseSchema, TQuerySchema>
) => {
    const {
        field: {
                   value,
               },
    } = useController(withControl);
    const result = useQueryEx({
        withQuery: withSourceQuery,
        request:   {
            filter:  value ? toFilter(value) : {idIn: []},
            orderBy: toOrderBy(),
        },
    });

    return result.isLoading ? <InputEx
        withControl={withControl}
        schema={schema}
        isLoading
        {...props}
    /> : <StoreProvider
        store={MultiSelectionStore}
        values={{
            /**
             * Two separate maps are necessary as the store would modify both maps unintentionally
             */
            items:     new Map(result.data?.map(item => [item.id, item])),
            selection: new Map(result.data?.map(item => [item.id, item])),
        }}
    >
        <ModalStoreProvider>
            <Modal
                modalId={"query-input"}
                modalProps={{
                    size: "75%",
                }}
                title={<>
                    <Text
                        fw={"500"}
                        span
                    >
                        <Translation withLabel={`${withControl.name}.selection.label`}/>
                    </Text>
                    {!isPartial(schema, withControl.name) && <Text
                        ml={4}
                        c={"red"}
                        span
                    >*</Text>}
                </>}
            >
                {result.data && ((result.data?.length || 0) > 0) && <>
                    <Alert
                        title={<Translation namespace={"common.selection"} withLabel={"selected-items.label"}/>}
                    >
                        <Items
                            limit={8}
                            items={result.data}
                        />
                    </Alert>
                    <Divider mt={"sm"}/>
                </>}
                <Selector
                    MultiSelectionStore={MultiSelectionStore}
                />
                <Divider my={"sm"}/>
                <Group gap={"md"} justify={"apart"} grow>
                    <Group gap={"sm"}>
                        <CancelButton
                            SelectionStore={MultiSelectionStore}
                        />
                        <ClearButton
                            SelectionStore={MultiSelectionStore}
                        />
                    </Group>
                    <MultiCommitButton
                        withControl={withControl}
                        MultiSelectionStore={MultiSelectionStore}
                        onCommit={onCommit}
                    />
                </Group>
            </Modal>
            <WithMultiItem
                isLoading={result.isFetching}
                withControl={withControl}
                schema={schema}
                Items={Items}
                MultiSelectionStore={MultiSelectionStore}
                limit={limit}
                {...props}
            />
        </ModalStoreProvider>
    </StoreProvider>;
};
