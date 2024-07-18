import {
	WithIdentitySchema,
	cssOf,
	isOptional,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type ValuesSchema,
} from "@use-pico/common";
import { useController } from "react-hook-form";
import { t } from "../../../i18n/t";
import { BackIcon } from "../../../icon/BackIcon";
import { CloseIcon } from "../../../icon/CloseIcon";
import { Button } from "../../../ui/Button";
import { useModalClose } from "../../../ui/Modal/useModalClose";
import { Content } from "./Content";

export namespace Selection {
	export interface Props<
		TValuesSchema extends ValuesSchema,
		TItemSchema extends WithIdentitySchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TMode extends "single" | "multi",
	> extends Pick<
			Content.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>,
			| "schema"
			| "onSelect"
			| "name"
			| "table"
			| "tableProps"
			| "selectionStore"
			| "mode"
			| "defaultQuery"
			| "icon"
			| "css"
		> {}
}

export const Selection = <
	TValuesSchema extends ValuesSchema,
	TItemSchema extends WithIdentitySchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TMode extends "single" | "multi",
>({
	name,
	schema,
	table,
	tableProps,
	selectionStore,
	mode,
	defaultQuery,
	icon,
	css,
	onSelect,
}: Selection.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>) => {
	const Table = table;
	const close = useModalClose();
	const {
		field: { onChange },
	} = useController({ name });
	const $selection = selectionStore.useSelector(
		({ selection, commit, item, clear }) => ({
			selection,
			commit,
			item,
			clear,
		}),
	);

	return (
		<>
			<Table
				focus
				selectionStore={selectionStore}
				selection={mode}
				defaultQuery={{
					...defaultQuery,
					cursor: {
						size: 15,
						page: 0,
					},
				}}
				onDoubleClick={(item) => {
					if (mode === "single") {
						$selection.clear();
						onChange(item.id);
						onSelect?.(item as any);
						close();
					}
				}}
				{...tableProps}
			/>
			<div
				className={cssOf(
					"flex justify-between gap-6 border-t border-t-slate-200 py-4",
					css?.input,
				)}
			>
				<div className={cssOf("flex items-center gap-4")}>
					<Button
						variant={"subtle"}
						icon={{
							enabled: BackIcon,
						}}
						onClick={close}
					>
						{t()`Back`}
					</Button>
					{isOptional(schema, name) && (
						<Button
							onClick={() => {
								$selection.clear();
								onChange(mode === "single" ? "" : []);
								close();
							}}
							css={{
								button: [
									"bg-inherit text-slate-500 hover:text-slate-700 hover:bg-orange-50",
								],
							}}
							icon={{
								enabled: CloseIcon,
							}}
						>
							{t()`Clear selection`}
						</Button>
					)}
				</div>
				<div className={cssOf("flex gap-4 justify-end")}>
					<Button
						icon={{
							enabled: icon,
							disabled: icon,
						}}
						onClick={() => {
							const selection =
								mode === "single" ?
									$selection.item()?.id || ""
								:	[...$selection.selection.values()].map((item) => item.id);
							onChange(selection);
							onSelect?.(selection as any);
							$selection.commit();
							close();
						}}
					>
						{t()`Confirm selection`}
					</Button>
				</div>
			</div>
		</>
	);
};
