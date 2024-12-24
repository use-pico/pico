import { useParams } from "@tanstack/react-router";
import {
    ActionMenu,
    ActionModal,
    LinkTo,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { SlotIcon } from "~/app/derivean/icon/SlotIcon";
import { KindInline } from "~/app/derivean/item/KindInline";
import type { SlotSchema } from "~/app/derivean/slot/schema/SlotSchema";

const column = withColumn<SlotSchema.Type>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Slot name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/root/slot/$id/view"}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 16,
	}),
	column({
		name: "kind",
		header() {
			return <Tx label={"Slot kind (label)"} />;
		},
		render({ value }) {
			return <KindInline kind={value} />;
		},
		size: 18,
	}),
	column({
		name: "size",
		header() {
			return <Tx label={"Slot size (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
];

export namespace SlotTable {
	export interface Props extends Table.PropsEx<SlotSchema.Type> {
		//
	}
}

export const SlotTable: FC<SlotTable.Props> = ({ table, ...props }) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			action={{
				table() {
					const { locale } = useParams({ from: "/$locale" });

					return (
						<ActionMenu>
							<ActionModal
								label={<Tx label={"Create slot (menu)"} />}
                                textTitle={<Tx label={"Create slot (modal)"} />}
								icon={SlotIcon}
							>
								hovno, pico
							</ActionModal>
						</ActionMenu>
					);
				},
			}}
			{...props}
		/>
	);
};
