import {
	WithEntity,
	WithIdentitySchema,
	cssOf,
	isOptional,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type ValuesSchema,
} from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { useController } from "react-hook-form";
import type { z } from "zod";
import { RequiredIcon } from "../../icon/RequiredIcon";
import type { IWithSourceQuery } from "../../query/IWithSourceQuery";
import { createSelectionStore } from "../../selection/createSelectionStore";
import type { IStore } from "../../store/IStore";
import { WithTable } from "../../table/WithTable";
import { Icon } from "../../ui/Icon";
import { Modal } from "../../ui/Modal";
import type { Input } from "../Input";
import { Popup } from "./PopupSelect/Popup";

export namespace PopupSelect {
	export interface Props<
		TValuesSchema extends ValuesSchema,
		TItemSchema extends WithIdentitySchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TMode extends "single" | "multi",
	> extends Input.Props<TValuesSchema> {
		selectionStore: IStore.Store<
			createSelectionStore.StoreProps<z.infer<TItemSchema>>
		>;
		withSourceQuery: IWithSourceQuery<TQuerySchema, TItemSchema>;
		mode: TMode;
		icon?: string;
		text: {
			title: ReactNode;
			label: ReactNode;
			select?: ReactNode;
			selected?: ReactNode;
		};
		modal?: Modal.PropsEx;
		table: FC<Omit<WithTable.PropsEx<any, any, any>, "render">>;
		tableProps?: Omit<WithTable.PropsEx<any, any, any>, "render">;
		render: FC<WithEntity.Schema<TItemSchema>>;
		defaultQuery?: QuerySchema.QueryType<TQuerySchema>;

		onSelect?(
			selection: TMode extends "single" ? z.infer<TItemSchema>
			:	z.infer<TItemSchema>[],
		): void;
	}

	export type PropsEx<
		TValuesSchema extends ValuesSchema,
		TItemSchema extends WithIdentitySchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TMode extends "single" | "multi",
	> = Omit<
		Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>,
		"selectionStore" | "withSourceQuery" | "render" | "text" | "table"
	> &
		Partial<
			Pick<Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>, "text">
		>;
}

export const PopupSelect = <
	TValuesSchema extends ValuesSchema,
	TItemSchema extends WithIdentitySchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TMode extends "single" | "multi",
>({
	selectionStore,
	withSourceQuery,
	mode,
	disabled = false,
	render,
	icon,
	text,
	modal,
	name,
	schema,
	table,
	tableProps,
	css,
	defaultQuery,
	onSelect,
}: PopupSelect.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>) => {
	const {
		fieldState: { error },
	} = useController({
		name,
	});

	return (
		<div className={cssOf("w-full", css?.root)}>
			<div className={cssOf("flex justify-between items-center")}>
				<label
					className={cssOf(
						"block text-sm font-medium text-slate-900",
						css?.label,
					)}
				>
					<span>{text.label}</span>
					<span className={cssOf("text-red-600 text-sm pl-2", css?.error)}>
						{error?.message}
					</span>
				</label>
				{!isOptional(schema, name) && (
					<Icon
						icon={RequiredIcon}
						size={"xs"}
						css={["text-red-600 opacity-50"]}
					/>
				)}
			</div>
			<Popup
				name={name}
				render={render}
				disabled={disabled}
				selectionStore={selectionStore}
				withSourceQuery={withSourceQuery}
				schema={schema}
				defaultQuery={defaultQuery}
				mode={mode}
				text={text}
				icon={icon}
				modal={modal}
				table={table}
				tableProps={tableProps}
				css={css}
				onSelect={onSelect}
			/>
		</div>
	);
};
