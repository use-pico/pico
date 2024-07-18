import {
	WithIdentitySchema,
	cssOf,
	isEmpty,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type ValuesSchema,
} from "@use-pico/common";
import { useController } from "react-hook-form";
import { LoaderIcon } from "../../../icon/LoaderIcon";
import { CollectionResult } from "../../../query/CollectionResult";
import { useQueryEx } from "../../../query/useQueryEx";
import { Icon } from "../../../ui/Icon";
import type { PopupSelect } from "../PopupSelect";
import { Content } from "./Content";

export namespace Popup {
	export type Props<
		TValuesSchema extends ValuesSchema,
		TItemSchema extends WithIdentitySchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TMode extends "single" | "multi",
	> = Pick<
		PopupSelect.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>,
		| "name"
		| "onSelect"
		| "disabled"
		| "render"
		| "schema"
		| "selectionStore"
		| "withSourceQuery"
		| "mode"
		| "defaultQuery"
		| "text"
		| "icon"
		| "modal"
		| "table"
		| "tableProps"
		| "css"
	>;
}

export const Popup = <
	TValuesSchema extends ValuesSchema,
	TItemSchema extends WithIdentitySchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TMode extends "single" | "multi",
>({
	name,
	disabled,
	render,
	selectionStore,
	withSourceQuery,
	schema,
	mode,
	defaultQuery,
	text,
	icon,
	modal,
	table,
	tableProps,
	css,
	onSelect,
}: Popup.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>) => {
	const {
		field: { value },
		formState: { isLoading },
	} = useController({
		name,
	});

	const result = useQueryEx({
		withQuery: withSourceQuery,
		request: {
			filter:
				mode === "single" ?
					{
						id: value,
					}
				:	{
						idIn: value,
					},
			cursor:
				isEmpty(value) ?
					{
						page: 0,
						size: 1,
					}
				:	undefined,
		},
		options: {
			enabled: !disabled,
		},
	});

	if (isLoading) {
		return (
			<div
				className={cssOf(
					"flex items-center gap-2",
					"text-slate-400",
					"bg-blue-50 text-sm border border-slate-300 rounded w-full p-2.5",
					"cursor-not-allowed",
				)}
			>
				<Icon
					icon={LoaderIcon}
					size={"xl"}
				/>
				{text.select || text.label}
			</div>
		);
	} else if (disabled) {
		return (
			<div
				className={cssOf(
					"flex items-center gap-2",
					"text-slate-400",
					"bg-orange-50 text-sm border border-slate-300 rounded w-full p-2.5",
					"cursor-not-allowed",
				)}
			>
				{icon && (
					<Icon
						icon={icon}
						size={"xl"}
					/>
				)}
				{text.select || text.label}
			</div>
		);
	}

	return (
		<CollectionResult<TItemSchema>
			result={result}
			loader={() => {
				return (
					<div
						className={cssOf(
							"flex items-center gap-2",
							"text-slate-400",
							"bg-blue-50 text-sm border border-slate-300 rounded w-full p-2.5",
							"cursor-not-allowed",
						)}
					>
						<Icon
							icon={LoaderIcon}
							size={"xl"}
						/>
						{text.select || text.label}
					</div>
				);
			}}
			success={({ collection }) => {
				return (
					<selectionStore.Provider
						values={{
							items: new Map(collection.map((item) => [item.id, item])),
							selection: new Map(collection.map((item) => [item.id, item])),
						}}
					>
						<Content
							defaultQuery={defaultQuery}
							name={name}
							schema={schema}
							selectionStore={selectionStore}
							mode={mode}
							table={table}
							tableProps={tableProps}
							render={render}
							text={text}
							icon={icon}
							collection={collection}
							modal={modal}
							css={css}
							onSelect={onSelect}
						/>
					</selectionStore.Provider>
				);
			}}
		/>
	);
};
