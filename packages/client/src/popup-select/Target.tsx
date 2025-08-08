import type { EntitySchema, withQuerySchema } from "@use-pico/common";
import type { ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import type { withQuery } from "../source/withQuery";
import { Tx } from "../tx/Tx";
import type { PopupSelect } from "./PopupSelect";
import type { PopupSelectCls } from "./PopupSelectCls";

export namespace Target {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> {
		mode: "single" | "multi";
		modalId: string;
		slots: PopupSelectCls.Slots;
		//
		withQuery: withQuery.Api<TQuery, TItem[]>;
		//
		renderSingle: PopupSelect.Render.Single.Render<TItem>;
		renderMulti: PopupSelect.Render.Multi.Render<TItem>;
		//
		textSelect: ReactNode;
		//
		state: PopupSelect.State;
	}
}

export const Target = <
	TQuery extends withQuerySchema.Query,
	TItem extends EntitySchema.Type,
>({
	mode,
	modalId,
	slots,
	//
	withQuery,
	renderSingle,
	renderMulti,
	textSelect,
	//
	state,
}: Target.Props<TQuery, TItem>) => {
	const selected = withQuery.useQuery(
		{
			filter: {
				idIn: state.value,
			},
		} as TQuery,
		{
			enabled: Boolean(state.value?.length),
		},
	);

	// TODO Revisit item rendering and distinguish between states (empty - not found, loading and so on)

	return (
		<label
			htmlFor={modalId}
			className={slots.input({
				loading: selected.isFetching,
				selected: Boolean(selected.data?.length),
			})}
		>
			<Icon
				icon={
					selected.isFetching
						? LoaderIcon
						: selected.isEnabled && selected.data?.[0]
							? SelectionOnIcon
							: SelectionOffIcon
				}
			/>
			{selected.isEnabled && selected.data && selected.data.length
				? mode === "single"
					? selected.data[0]
						? renderSingle({
								entity: selected.data[0],
							})
						: null
					: renderMulti({
							entities: selected.data,
						})
				: textSelect || <Tx label={"Select item (label)"} />}
		</label>
	);
};
