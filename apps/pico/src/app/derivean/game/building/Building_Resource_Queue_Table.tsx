import { useParams } from "@tanstack/react-router";
import {
    Badge,
    LinkTo,
    Progress,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

export namespace Building_Resource_Queue_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		resource: string;
		buildingId: string;
		amount: number;
		cycle: number;
		from: number;
		to: number;
		progress?: any;
	}
}

const column = withColumn<Building_Resource_Queue_Table.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<LinkTo
					to={"/$locale/apps/derivean/game/building/$id/production/list"}
					params={{ locale, id: data.buildingId }}
				>
					{value}
				</LinkTo>
			);
		},
		size: 12,
	}),
	column({
		name: "resource",
		header() {
			return <Tx label={"Resource name (label)"} />;
		},
		render({ value }) {
			return value;
		},
		size: 12,
	}),
	column({
		name: "amount",
		header() {
			return <Tx label={"Resource amount (label)"} />;
		},
		render({ value }) {
			return <Badge>x{toHumanNumber({ number: value })}</Badge>;
		},
		size: 12,
	}),
	column({
		name: "cycle",
		header() {
			return <Tx label={"Building cycle (label)"} />;
		},
		render({ data }) {
			const diff = data.to - data.from;

			return (
				<div className={"flex flex-row gap-2 items-center"}>
					<div className={"font-bold"}>{data.cycle}</div>
					<div className={"text-slate-500"}>/</div>
					<div className={"text-sm"}>{diff}</div>
				</div>
			);
		},
		size: 8,
	}),
	column({
		name: "progress",
		header() {
			return <Tx label={"Resource progress (label)"} />;
		},
		render({ data }) {
			const diff = data.to - data.from;

			return (
				<Progress
					css={{
						progress: diff === data.cycle ? ["bg-emerald-500"] : undefined,
					}}
					value={(100 * data.cycle) / diff}
				/>
			);
		},
		size: 30,
	}),
];

export namespace Building_Resource_Queue_Table {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const Building_Resource_Queue_Table: FC<
	Building_Resource_Queue_Table.Props
> = ({ table, ...props }) => {
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
