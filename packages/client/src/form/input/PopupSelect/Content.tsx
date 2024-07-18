import {
	WithIdentitySchema,
	cssOf,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type ValuesSchema,
} from "@use-pico/common";
import { z } from "zod";
import { t } from "../../../i18n/t";
import { Icon } from "../../../ui/Icon";
import { Modal } from "../../../ui/Modal";
import { Popup } from "./Popup";
import { Selection } from "./Selection";

export namespace Content {
	export interface Props<
		TValuesSchema extends ValuesSchema,
		TItemSchema extends WithIdentitySchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TMode extends "single" | "multi",
	> extends Pick<
			Popup.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>,
			| "schema"
			| "onSelect"
			| "defaultQuery"
			| "selectionStore"
			| "mode"
			| "table"
			| "tableProps"
			| "render"
			| "name"
			| "text"
			| "icon"
			| "modal"
			| "css"
		> {
		collection: z.infer<TItemSchema>[];
	}
}

export const Content = <
	TValuesSchema extends ValuesSchema,
	TItemSchema extends WithIdentitySchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TMode extends "single" | "multi",
>({
	name,
	schema,
	selectionStore,
	mode,
	table,
	tableProps,
	render: Render,
	text,
	icon,
	collection,
	modal,
	defaultQuery,
	css,
	onSelect,
}: Content.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>) => {
	return (
		<Modal
			title={text.title}
			icon={icon}
			css={{
				target: ["w-full"],
			}}
			target={
				<div
					className={cssOf(
						"overflow-x-auto overflow-y-hidden",
						"cursor-pointer",
						"bg-slate-50 text-sm border border-slate-300 rounded",
						"text-sky-500 hover:text-sky-700",
					)}
				>
					<div className={"relative flex items-center p-2.5 w-full"}>
						<Icon
							icon={"icon-[vaadin--area-select]"}
							size={"xl"}
						/>
						<div className={cssOf("absolute px-8 flex items-center gap-2")}>
							{collection.map((item) => (
								<div
									key={item.id}
									className={cssOf(
										collection.length > 1 &&
											"bg-sky-100 text-sky-600 border border-sky-200 shadow-md rounded-sm px-1 py-0.5 min-w-fit",
									)}
								>
									<Render entity={item} />
								</div>
							))}
							{!collection.length && (text.select || text.label)}
						</div>
					</div>
				</div>
			}
			{...modal}
		>
			{Boolean(collection.length) && (
				<div className={cssOf("p-2 border-b border-slate-200")}>
					<h2 className={cssOf("text-slate-400 text-sm font-semibold")}>
						{text?.selected ||
							(collection.length > 1 ?
								t()`Currently selected items`
							:	t()`Currently selected item`)}
					</h2>
					<div className={cssOf("flex flex-wrap items-center gap-2 text-sm")}>
						{collection.map((item) => (
							<div
								key={item.id}
								className={cssOf(
									"bg-sky-100 border border-sky-200 shadow-md rounded-sm px-2 py-1",
								)}
							>
								<Render entity={item} />
							</div>
						))}
					</div>
				</div>
			)}
			<Selection
				name={name}
				table={table}
				tableProps={tableProps}
				schema={schema}
				selectionStore={selectionStore}
				mode={mode}
				defaultQuery={defaultQuery}
				icon={icon}
				css={css}
				onSelect={onSelect}
			/>
		</Modal>
	);
};
