import type { ClsSlots } from "@use-pico/cls";
import type {
	CursorSchema,
	EntitySchema,
	withQuerySchema,
} from "@use-pico/common";
import { type FC, useContext, useState } from "react";
import type { Fulltext } from "../fulltext/Fulltext";
import { ModalContent } from "../modal/ModalContent";
import { ModalContext } from "../modal/ModalContext";
import { ModalFooter } from "../modal/ModalFooter";
import { useSelection } from "../selection/useSelection";
import type { Table } from "../table/Table";
import type { PopupSelect } from "./PopupSelect";
import type { PopupSelectCls } from "./PopupSelectCls";

export namespace Content {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> {
		mode: "single" | "multi";
		query: Omit<TQuery, "filter" | "cursor"> | undefined;
		table: FC<Table.PropsEx<TQuery, TItem>>;
		state: PopupSelect.State;
		slots: ClsSlots<PopupSelectCls>;
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
	const selection = useSelection({
		initial: state.value,
	});
	const useModal = useContext(ModalContext);
	const close = useModal((state) => state.close);
	const [fulltext, setFulltext] = useState<Fulltext.Value>(undefined);
	const [sort, setSort] = useState<any>([]);
	const [cursor, setCursor] = useState<CursorSchema.Type>({
		page: 0,
		size: 15,
	});

	return (
		<ModalContent
			footer={
				<ModalFooter
					disabled={!selection.value.length && !allowEmpty}
					onConfirm={() => {
						state.set(selection.value);
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
						selection={selection}
						rowDblClick={({ data }) => {
							if (mode === "single") {
								state.set([
									data.id,
								]);
								close();
							}
						}}
					/>
				</div>
			</div>
		</ModalContent>
	);
};
