import {
    cn,
    type CollectionMutationSchema,
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema,
    type ShapeSchema,
    type VoidSchema
}                           from "@use-pico/common";
import type {ReactNode}     from "react";
import {z}                  from "zod";
import {t}                  from "../i18n/t";
import {BackIcon}           from "../icon/BackIcon";
import {TrashIcon}          from "../icon/TrashIcon";
import {BlockStore}         from "../provider/BlockStore";
import type {IQueryStore}   from "../query/IQueryStore";
import type {IWithMutation} from "../query/IWithMutation";
import {useMutation}        from "../query/useMutation";
import {useStore}           from "../store/useStore";
import {Button}             from "./Button";
import {useModalClose}      from "./Modal/useModalClose";

/**
 * Use this control to delete a collection of items.
 *
 * It's connected to a Query store, so it respects current filters.
 *
 * @group ui
 */
export namespace DeleteControl {
    /**
     * Props for `DeleteControl`.
     */
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TCollectionMutationSchema extends CollectionMutationSchema<ShapeSchema, TQuerySchema>,
    > {
        /**
         * Mutation used to delete collection items.
         */
        withMutation: IWithMutation<TCollectionMutationSchema, VoidSchema>;
        /**
         * Query store used to fetch query used to delete collection items.
         */
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        /**
         * Text used in the control.
         */
        text: {
            /**
             * Content text.
             */
            content: ReactNode;
            /**
             * Submit text.
             */
            submit: ReactNode;
        };
    }
}

export const DeleteControl = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TCollectionMutationSchema extends CollectionMutationSchema<ShapeSchema, TQuerySchema>,
>(
    {
        withMutation,
        withQueryStore,
        text,
    }: DeleteControl.Props<TQuerySchema, TCollectionMutationSchema>,
) => {
    const close = useModalClose();
    const blockStore = useStore(BlockStore, (
        {
            block,
            unblock,
        }) => ({
        block,
        unblock,
    }));
    const queryStore = withQueryStore.useSelector((
        {
            where,
            filter,
        }) => ({
        where,
        filter,
    }));
    const mutation = useMutation({
        withMutation,
    });

    return <div>
        <div>
            {text.content}
        </div>
        <div
            className={cn(
                "flex flex-row items-center justify-between",
            )}
        >
            <Button
                icon={{
                    enabled: BackIcon,
                }}
                variant={"subtle"}
                onClick={() => close()}
            >
                {t()`Back`}
            </Button>
            <Button
                icon={{
                    enabled: TrashIcon,
                }}
                variant={"danger"}
                loading={mutation.isPending}
                onClick={() => {
                    blockStore.block();
                    mutation.mutate({
                        delete: queryStore,
                    } as z.infer<TCollectionMutationSchema>, {
                        onSettled: () => {
                            close();
                            blockStore.unblock();
                        },
                    });
                }}
            >
                {text.submit}
            </Button>
        </div>
    </div>;
};
