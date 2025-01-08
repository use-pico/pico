import { useParams } from "@tanstack/react-router";
import {
    Button,
    LinkTo,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber, tvc, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { useBuildingCount } from "~/app/derivean/building/base/useBuildingCount";
import { useConstructMutation } from "~/app/derivean/building/useConstructMutation";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";

interface Data extends IdentitySchema.Type {
	name: string;
	cycles: number;
}

interface Context {
	userId: string;
	inventory: InventorySchema["~output-array"];
}

const column = withColumn<Data, Context>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value, context: { inventory, userId } }) {
			const { locale } = useParams({ from: "/$locale" });
			const mutation = useConstructMutation({ userId });
			const count = useBuildingCount({
				baseBuildingId: data.id,
				userId,
			});
			// const { check } = inventoryCheck({
			// 	inventory,
			// 	requirements: data.requirements,
			// });

			const available = false;

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
		size: 16,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Construction cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
	}),
	// column({
	// 	name: "requirements",
	// 	header() {
	// 		return <Tx label={"Required resources (label)"} />;
	// 	},
	// 	render({ value, context: { inventory } }) {
	// 		const { missing } = inventoryCheck({ inventory, requirements: value });

	// 		return (
	// 			<ResourceInline
	// 				textTitle={<Tx label={"Building requirements (title)"} />}
	// 				resources={value}
	// 				diff={missing}
	// 				limit={5}
	// 			/>
	// 		);
	// 	},
	// 	size: 72,
	// }),
];

export namespace BuildingBaseTable {
	export interface Props extends Table.PropsEx<Data, Context> {
		userId: string;
		inventory: InventorySchema["~entity-array"];
	}
}

export const BuildingBaseTable: FC<BuildingBaseTable.Props> = ({
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
