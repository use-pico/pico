import type {
	CursorSchema,
	cls,
	EntitySchema,
	withQuerySchema,
} from "@use-pico/common";
import { type FC, useState } from "react";
import { ModalContent } from "../modal/ModalContent";
import { ModalFooter } from "../modal/ModalFooter";
import type { Table } from "../table/Table";
import type { PopupSelect } from "./PopupSelect";
import type { PopupSelectCls } from "./PopupSelectCls";

export namespace Content {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> {
		mode: "single" | "multi";
		query?: TQuery;
		table: FC<Table.PropsEx<TQuery, TItem>>;
		state: PopupSelect.State;
		slots: cls.Slots<PopupSelectCls>;
		allowEmpty: boolean;
	}
}

export const Content = <
	TQuery extends withQuerySchema.Query,
	TItem extends EntitySchema.Type,
>({
	mode,
	query,
	table: Table,
	state,
	slots,
	allowEmpty,
}: Content.Props<TQuery, TItem>) => {
	const [selection, setSelection] = useState<string[]>(state.value);
	const [fulltext, setFulltext] = useState<string | undefined | null>(
		undefined,
	);
	const [sort, setSort] = useState<any>([]);
	const [cursor, setCursor] = useState<CursorSchema.Type>({
		page: 0,
		size: 15,
	});

	return (
		<ModalContent
			footer={
				<ModalFooter
					disabled={!selection.length && !allowEmpty}
					onConfirm={() => {
						state.set(selection);
					}}
				/>
			}
		>
			<div className={slots.base()}>
				<div className={slots.content()}>
					<Table
						query={
							{
								filter: {
									fulltext,
								},
								where: query?.where,
								cursor,
								sort,
							} as TQuery
						}
						controlsHidden={[
							"actions",
						]}
						cursor={{
							value: cursor,
							set: setCursor,
						}}
						sort={{
							value: sort,
							set: setSort,
						}}
						fulltext={{
							value: fulltext,
							set(value) {
								setFulltext(value);
								setCursor({
									...cursor,
									page: 0,
								});
							},
						}}
						selectionMode={mode}
						selection={{
							value: selection,
							set(selection) {
								setSelection(selection);
							},
						}}
						// row={{
						// 	onDoubleClick({ data }) {
						// 		setSelection(
						// 			selection.includes(data.id)
						// 				? selection.filter(
						// 						(item) => item !== data.id,
						// 					)
						// 				: [
						// 						...selection,
						// 						data.id,
						// 					],
						// 		);
						// 	},
						// }}
					/>
				</div>
			</div>
		</ModalContent>
	);
};
