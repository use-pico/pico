import type {
	CursorSchema,
	EntitySchema,
	withQuerySchema,
} from "@use-pico/common/schema";
import { type FC, useContext, useState } from "react";
import { useSelection } from "../../hook/useSelection";
import type { Fulltext } from "../fulltext/Fulltext";
import { ModalContent } from "../modal/ModalContent";
import { ModalContext } from "../modal/ModalContext";
import { ModalFooter } from "../modal/ModalFooter";
import type { Table } from "../table/Table";

export namespace Content {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> {
		query: Omit<TQuery, "filter" | "cursor"> | undefined;
		table: FC<Table.PropsEx<TQuery, TItem>>;
		selection: useSelection.Selection<TItem>;
		allowEmpty: boolean;
	}
}

export const Content = <
	TQuery extends withQuerySchema.Query,
	TItem extends EntitySchema.Type,
>({
	query,
	table: Table,
	selection,
	allowEmpty,
}: Content.Props<TQuery, TItem>) => {
	const local = useSelection<TItem>({
		mode: selection.mode,
		initial: selection.selection,
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
					disabled={!local.hasAny && !allowEmpty}
					onConfirm={() => {
						selection.set(local.selection);
					}}
				/>
			}
		>
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
				selection={selection}
				rowDblClick={({ data }) => {
					if (selection.mode === "single") {
						selection.single(data);
						close();
					}
				}}
			/>
		</ModalContent>
	);
};
