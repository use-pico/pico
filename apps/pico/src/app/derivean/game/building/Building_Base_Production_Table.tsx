import { Button, Table, Tx, useTable, withColumn } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { RequirementsInline } from "~/app/derivean/resource/ResourceInline";
import type { Building_Base_Production_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Production_Requirement_Schema";

export namespace Building_Base_Production_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		amount: number;
		limit: number;
		cycles: number;
		requirements: (Building_Base_Production_Requirement_Schema["~entity"] & {
			name: string;
		})[];
	}

	export interface Context {
		queueCount: number;
		productionLimit: number;
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
		render({ value, context: { productionLimit, queueCount } }) {
			const available = queueCount < productionLimit;

			return (
				<Button
					iconEnabled={ProductionIcon}
					iconDisabled={ProductionIcon}
					css={{
						base: ["w-full"],
					}}
					variant={{ variant: available ? "primary" : "subtle" }}
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
		render({ value }) {
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
		render({ value }) {
			return (
				<RequirementsInline
					textTitle={<Tx label={"Resource requirements (title)"} />}
					textEmpty={<Tx label={"No requirements (label)"} />}
					requirements={value}
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
		queueCount: number;
		productionLimit: number;
	}
}

export const Building_Base_Production_Table: FC<
	Building_Base_Production_Table.Props
> = ({ queueCount, productionLimit, table, ...props }) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
				context: {
					productionLimit,
					queueCount,
				},
			})}
			{...props}
		/>
	);
};
