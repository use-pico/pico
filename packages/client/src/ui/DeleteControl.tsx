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

export namespace DeleteControl {
	export interface Props<
		TFilterSchema extends FilterSchema,
		TOrderBySchema extends OrderBySchema,
	> {
		withMutation: IWithMutation<CollectionMutationSchema<ShapeSchema, QuerySchema<any, any>>, VoidSchema>;
		withQueryStore: IQueryStore.Store<QuerySchema<TFilterSchema, TOrderBySchema>>;
		text: {
			content: ReactNode;
			submit: ReactNode;
		};
	}
}

/**
 * Use this control to delete a collection of items.
 *
 * It's connected to a Query store, so it respects current filters.
 */
export const DeleteControl = <
	TFilterSchema extends FilterSchema,
	TOrderBySchema extends OrderBySchema,
>(
	{
		withMutation,
		withQueryStore,
		text,
	}: DeleteControl.Props<TFilterSchema, TOrderBySchema>,
) => {
	const close = useModalClose();
	const block = useStore(BlockStore, (
		{
			block,
			unblock,
		}) => ({
		block,
		unblock,
	}));
	const query = withQueryStore.useSelector((
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
					block.block();
					mutation.mutate({
						delete: query,
					}, {
						onSettled: () => {
							close();
							block.unblock();
						},
					});
				}}
			>
				{text.submit}
			</Button>
		</div>
	</div>;
};
