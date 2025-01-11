import { useMutation } from "@tanstack/react-query";
import {
    Button,
    Table,
    toast,
    Tx,
    useInvalidator,
    useTable,
    withColumn,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { withProductionQueue } from "~/app/derivean/building/withProductionQueue";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { RequirementsInline } from "~/app/derivean/resource/ResourceInline";
import type { Building_Base_Production_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Production_Requirement_Schema";
import type { Inventory_Schema } from "~/app/derivean/schema/inventory/Inventory_Schema";

export namespace Building_Base_Production_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		buildingId: string;
		productionLimit: number;
		amount: number;
		limit: number;
		cycles: number;
		queueCount: number;
		withAvailableResources: boolean;
		requirements: (Building_Base_Production_Requirement_Schema["~entity"] & {
			name: string;
		})[];
	}

	export interface Context {
		userId: string;
		inventory: Inventory_Schema["~entity-array"];
	}
}

const column = withColumn<
	Building_Base_Production_Table.Data,
	Building_Base_Production_Table.Context
>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ data, value, context: { userId } }) {
			const invalidator = useInvalidator([["Building_Base_Production"]]);

			const available =
				data.withAvailableResources && data.queueCount < data.productionLimit;

			const production = useMutation({
				mutationKey: ["Building_Base_Production"],
				mutationFn: async () => {
					return toast.promise(
						withProductionQueue({
							userId,
							buildingBaseProductionId: data.id,
							buildingId: data.buildingId,
						}),
						withToastPromiseTx("Resource production queue"),
					);
				},
				async onSuccess() {
					await invalidator();
				},
			});

			return (
				<Button
					iconEnabled={ProductionIcon}
					iconDisabled={ProductionIcon}
					disabled={!available}
					css={{
						base: ["w-full"],
					}}
					variant={{ variant: available ? "primary" : "subtle" }}
					loading={production.isPending}
					onClick={() => production.mutate()}
				>
					{value}
				</Button>
			);
		},
		size: 14,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ data, value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "limit",
		header() {
			return <Tx label={"Production limit (label)"} />;
		},
		render({ value }) {
			return value === 0 ?
					<Tx label={"Unlimited (label)"} />
				:	toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Production cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 10,
	}),
	column({
		name: "requirements",
		header() {
			return <Tx label={"Required resources (label)"} />;
		},
		render({ value, context: { inventory } }) {
			return (
				<RequirementsInline
					textTitle={<Tx label={"Resource requirements (title)"} />}
					textEmpty={<Tx label={"No requirements (label)"} />}
					requirements={value}
					diff={inventory}
					limit={5}
				/>
			);
		},
		size: 32,
	}),
];

export namespace Building_Base_Production_Table {
	export interface Props
		extends Table.PropsEx<Data, Building_Base_Production_Table.Context> {
		userId: string;
		inventory: Inventory_Schema["~entity-array"];
	}
}

export const Building_Base_Production_Table: FC<
	Building_Base_Production_Table.Props
> = ({ userId, inventory, table, ...props }) => {
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
