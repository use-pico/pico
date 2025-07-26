import type { FC } from "react";
import { Icon } from "../icon/Icon";
import { SelectionAnyIcon } from "../icon/SelectionAnyIcon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import type { TableCls } from "./TableCls";
import type { ActionType } from "./type/ActionType";
import type { DataType } from "./type/DataType";
import type { SelectionType } from "./type/SelectionType";

export namespace TableActionWrapper {
	export interface Props {
		data: DataType.Data[];
		actionTable: ActionType.Table.Component<any> | undefined;
		selection: SelectionType.Selection | undefined;
		context: any | undefined;
		slots: TableCls.Slots;
	}
}

export const TableActionWrapper: FC<TableActionWrapper.Props> = ({
	data,
	actionTable: TableAction,
	selection,
	context,
	slots,
}) => {
	return (
		<div className={"flex flex-row items-center justify-between gap-2"}>
			{selection ? (
				<Icon
					icon={
						selection.isAll()
							? SelectionOnIcon
							: selection.isAny()
								? SelectionAnyIcon
								: SelectionOffIcon
					}
					variant={{
						disabled: selection.type === "single",
						size: "2xl",
					}}
					cls={{
						base: slots.select({
							selected: selection.isAny(),
						}),
					}}
					onClick={() => {
						selection.event.onSelectAll();
					}}
				/>
			) : null}
			{TableAction ? (
				<TableAction
					data={data}
					selection={selection}
					context={context}
				/>
			) : null}
		</div>
	);
};
