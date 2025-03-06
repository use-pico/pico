import { type UseQueryResult } from "@tanstack/react-query";
import type { IdentitySchema } from "@use-pico/common";
import { type FC } from "react";
import type { withListCount } from "../source/withListCount";
import type { Table } from "../table/Table";
import type { createLocalTableStore } from "../table/createLocalTableStore";
import { Tx } from "../tx/Tx";
import { PopupMultiSelectCss } from "./PopupMultiSelectCss";

export namespace PopupMultiContent {
	export interface Props extends PopupMultiSelectCss.Props {
		table: FC<Table.PropsEx<any>>;
		/**
		 * Stable reference to the table store.
		 */
		useLocalStore: createLocalTableStore.Store;
		result: UseQueryResult<withListCount.Result<IdentitySchema.Type>, Error>;
	}
}

export const PopupMultiContent: FC<PopupMultiContent.Props> = ({
	table: Table,
	useLocalStore,

	result,

	variant,
	tva = PopupMultiSelectCss,
	css,
}) => {
	const page = useLocalStore((state) => state.page);
	const setPage = useLocalStore((state) => state.setPage);
	const size = useLocalStore((state) => state.size);
	const setSize = useLocalStore((state) => state.setSize);
	const selection = useLocalStore((state) => state.selection);
	const setSelection = useLocalStore((state) => state.setSelection);
	const fulltext = useLocalStore((state) => state.fulltext);
	const setFulltext = useLocalStore((state) => state.setFulltext);

	const tv = tva({
		...variant,
		css,
	}).slots;

	return (
		<div className={tv.base()}>
			<div className={tv.content()}>
				<Table
					cursor={{
						cursor: {
							page,
							size,
						},
						count:
							result.data?.count ?
								result.data.count
							:	{
									filter: -1,
									total: -1,
									where: -1,
								},
						textTotal: <Tx label={"Total count of items (label)"} />,
						onPage(page) {
							setPage(page);
						},
						onSize(size) {
							setSize(size);
							setPage(0);
						},
					}}
					fulltext={{
						value: fulltext,
						set(value) {
							setFulltext(value);
							setPage(0);
						},
					}}
					data={result.data?.data}
					selection={{
						type: "multi",
						state: {
							value: selection,
							set(selection) {
								setSelection(selection);
							},
						},
					}}
					row={{
						onDoubleClick({ data }) {
							setSelection(
								selection.includes(data.id) ?
									selection.filter((item) => item !== data.id)
								:	[...selection, data.id],
							);
						},
					}}
				/>
			</div>
		</div>
	);
};
