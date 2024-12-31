import type { ReactNode } from "@tanstack/react-router";
import { useState, type FC } from "react";
import { Modal } from "../modal/Modal";
import type { withRepository } from "../repository/withRepository";
import type { Table } from "../table/Table";
import { Tx } from "../tx/Tx";
import { PopupSelectCss } from "./PopupSelectCss";

export namespace PopupSelect {
	export interface Props extends PopupSelectCss.Props {
		icon?: string | ReactNode;
		titleText?: ReactNode;
		modalProps?: Modal.PropsEx;
		table: FC<Table.PropsEx<any>>;
		useListQuery: withRepository.Instance.useListQuery.Callback<any>;

		value: string;
		onChange(): void;
	}

	export type PropsEx = Omit<
		Props,
		"icon" | "titleText" | "table" | "useListQuery"
	>;
}

export const PopupSelect: FC<PopupSelect.Props> = ({
	icon,
	titleText,
	modalProps,
	table: Table,
	useListQuery,

	value,
	onChange,
	variant,
	tva = PopupSelectCss,
	css,
}) => {
	const tv = tva({
		...variant,
		css,
	}).slots;

	const result = useListQuery({
		query: {
			where: {},
		},
	});
	const [selection, setSelection] = useState<string[]>([]);

	console.log("Popup selection", selection);

	return (
		<Modal
			icon={icon}
			target={"styled input should be here :)"}
			title={titleText}
			variant={{
				loading: result.isLoading,
			}}
			{...modalProps}
		>
			<Table
				cursor={{
					cursor: {
						page: 0,
						size: 0,
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
					onPage() {
						//
					},
					onSize() {
						//
					},
				}}
				table={{
					data: result.data?.data ?? [],
					selection: {
						type: "single",
						value: selection,
						set(selection) {
							setSelection(selection);
						},
					},
				}}
			/>
		</Modal>
	);
};
