import { useParams } from "@tanstack/react-router";
import {
    Button,
    LinkTo,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { useBuildingCount } from "~/app/derivean/building/base/useBuildingCount";
import { useConstructMutation } from "~/app/derivean/building/useConstructMutation";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { inventoryCheck } from "~/app/derivean/inventory/inventoryCheck";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import { ResourceInline } from "~/app/derivean/resource/ResourceInline";

interface Context {
	userId: string;
	inventory: InventorySchema["~output-array"];
}

const column = withColumn<BaseBuildingSchema["~output"], Context>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Base building name (label)"} />;
		},
		render({ data, value, context: { inventory, userId } }) {
			const { locale } = useParams({ from: "/$locale" });
			const mutation = useConstructMutation({ userId });
			const count = useBuildingCount({
				baseBuildingId: data.id,
				userId,
			});
			const { check } = inventoryCheck({
				inventory,
				requirements: data.requirements,
			});

			const available = check;

			return (
				<div className={tvc(["w-full", "flex", "gap-2", "items-center"])}>
					<Button
						iconEnabled={BuildingIcon}
						iconDisabled={BuildingIcon}
						variant={{
							variant: !available || count.isLoading ? "subtle" : "primary",
						}}
						onClick={() => {
							mutation.mutate({
								baseBuildingId: data.id,
							});
						}}
						disabled={!available}
						loading={mutation.isPending || count.isLoading}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/game/building/base/$id/view"}
						params={{ locale, id: data.id }}
					>
						{value}
					</LinkTo>
				</div>
			);
		},
		size: 10,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Base building cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
	}),
	column({
		name: "requirements",
		header() {
			return <Tx label={"Required resources (label)"} />;
		},
		render({ value, context: { inventory } }) {
			const { missing } = inventoryCheck({ inventory, requirements: value });

			return (
				<ResourceInline
					textTitle={<Tx label={"Building requirements (title)"} />}
					resources={value}
					diff={missing}
					limit={5}
				/>
			);
		},
		size: 72,
	}),
];

export namespace BaseBuildingTable {
	export interface Props
		extends Table.PropsEx<BaseBuildingSchema["~output"], Context> {
		userId: string;
		inventory: InventorySchema["~output-array"];
	}
}

export const BaseBuildingTable: FC<BaseBuildingTable.Props> = ({
	userId,
	inventory,
	table,
	...props
}) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
				context: {
					userId,
					inventory,
				},
			})}
			{...props}
		/>
	);
};
