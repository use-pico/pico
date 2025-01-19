import { useParams } from "@tanstack/react-router";
import {
    LinkTo,
    More,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber, tvc, type IdentitySchema } from "@use-pico/common";
import { type FC } from "react";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import type { BlueprintProductionDependencySchema } from "~/app/derivean/schema/BlueprintProductionDependencySchema";
import type { BlueprintProductionRequirementSchema } from "~/app/derivean/schema/BlueprintProductionRequirementSchema";
import type { BlueprintProductionResourceSchema } from "~/app/derivean/schema/BlueprintProductionResourceSchema";
import { RequirementsInline } from "~/app/derivean/ui/RequirementsInline";

export namespace BlueprintProductionTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		blueprintId: string;
		amount: number;
		limit: number;
		cycles: number;
		requirements: (BlueprintProductionRequirementSchema["~entity"] & {
			name: string;
		})[];
		resources: (BlueprintProductionResourceSchema["~entity"] & {
			name: string;
		})[];
		dependencies: (BlueprintProductionDependencySchema["~entity"] & {
			name: string;
		})[];
	}
}

const column = withColumn<BlueprintProductionTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					icon={ProductionIcon}
					to={
						"/$locale/apps/derivean/game/blueprint/production/$id/requirements"
					}
					params={{ locale, id: data.id }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 18,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Amount (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 8,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Production cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 8,
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
		size: 8,
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
				/>
			);
		},
		size: 32,
	}),
	column({
		name: "resources",
		header() {
			return <Tx label={"Required production resources (label)"} />;
		},
		render({ value }) {
			return (
				<More<BlueprintProductionTable.Data["resources"][number]>
					items={value}
					render={({ entity }) => {
						return (
							<div
								className={tvc([
									"flex",
									"flex-row",
									"gap-2",
									"items-center",
									"bg-sky-100",
									"border",
									"rounded",
									"border-sky-300",
									"py-1",
									"px-2",
								])}
							>
								<div>{entity.name}</div>
								<div className={"text-md font-bold text-slate-500"}>
									x{toHumanNumber({ number: entity.amount })}
								</div>
							</div>
						);
					}}
				/>
			);
		},
		size: 32,
	}),
	column({
		name: "dependencies",
		header() {
			return <Tx label={"Required production dependencies (label)"} />;
		},
		render({ value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<More<BlueprintProductionTable.Data["dependencies"][number]>
					items={value}
					render={({ entity }) => {
						return (
							<div
								className={tvc([
									"flex",
									"flex-row",
									"gap-2",
									"items-center",
									"bg-sky-100",
									"border",
									"rounded",
									"border-sky-300",
									"py-1",
									"px-2",
								])}
							>
								<LinkTo
									to={"/$locale/apps/derivean/game/blueprint/$id/requirements"}
									params={{ locale, id: entity.blueprintId }}
								>
									{entity.name}
								</LinkTo>
							</div>
						);
					}}
				/>
			);
		},
		size: 32,
	}),
];

export namespace BlueprintProductionTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const BlueprintProductionTable: FC<BlueprintProductionTable.Props> = ({
	table,
	...props
}) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			{...props}
		/>
	);
};
