import {
	cssOf,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema
}                         from "@use-pico/common";
import {
	type HTMLAttributes,
	useTransition
}                         from "react";
import {z}                from "zod";
import {FilterApplyIcon}  from "../icon/FilterApplyIcon";
import {GteIcon}          from "../icon/GteIcon";
import {LteIcon}          from "../icon/LteIcon";
import type {IQueryStore} from "../query/IQueryStore";
import {useStore}         from "../store/useStore";
import {Icon}             from "../ui/Icon";
import {Table}            from "./Table";

export namespace Cell {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends HTMLAttributes<HTMLTableCellElement> {
		withQueryStore: IQueryStore.Store<TQuerySchema>;
		render?: Table.Render<TSchema, TQuerySchema>;
		item: z.infer<TSchema>;
	}
}

export const Cell = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>(
	{
		withQueryStore,
		render,
		item,
		...props
	}: Cell.Props<TQuerySchema, TSchema>
) => {
	const Render = render?.render;
	const queryStore = useStore(withQueryStore, (
		{
			filter,
			shallowFilter,
			setCursor,
		}) => ({
		filter,
		shallowFilter,
		setCursor,
	}));
	const [, startTransition] = useTransition();

	if (!Render) {
		return null;
	}

	return <td
		className={cssOf(
			"px-4 py-2 group",
		)}
		{...props}
	>
		<div
			className={cssOf(
				"flex flex-row items-center justify-between",
			)}
		>
			<Render
				entity={item}
			/>
			<div
				className={cssOf(
					"flex flex-row items-center gap-2",
				)}
			>
				{render.filters && render?.filters.equal && !render.filters.equal.isFilter(queryStore.filter) && <Icon
					icon={FilterApplyIcon}
					css={[
						"group-hover:visible",
						"invisible",
						"opacity-50 hover:opacity-100",
						"cursor-pointer",
					]}
					size={"xl"}
					onClick={() => {
						startTransition(() => {
							render.filters?.equal?.filter({
								item,
								shallowFilter: queryStore.shallowFilter,
							});
							queryStore.setCursor(0);
							window.scrollTo({
								top:      0,
								behavior: "smooth"
							});
						});
					}}
				/>}
				{render?.filters && render.filters.compare?.lte && <Icon
					icon={LteIcon}
					css={[
						"group-hover:visible",
						"invisible",
						"opacity-50 hover:opacity-100",
						"cursor-pointer",
					]}
					size={"xl"}
					onClick={() => {
						startTransition(() => {
							render?.filters?.compare?.lte.filter({
								item,
								shallowFilter: queryStore.shallowFilter,
							});
							queryStore.setCursor(0);
							window.scrollTo({
								top:      0,
								behavior: "smooth"
							});
						});
					}}
				/>}
				{render.filters && render?.filters.compare?.gte && <Icon
					data-tooltip-target="tooltip-default"
					icon={GteIcon}
					css={[
						"group-hover:visible",
						"invisible",
						"opacity-50 hover:opacity-100",
						"cursor-pointer",
					]}
					size={"xl"}
					onClick={() => {
						startTransition(() => {
							render?.filters?.compare?.gte.filter({
								item,
								shallowFilter: queryStore.shallowFilter,
							});
							queryStore.setCursor(0);
							window.scrollTo({
								top:      0,
								behavior: "smooth"
							});
						});
					}}
				/>}
			</div>
		</div>
	</td>;
};
