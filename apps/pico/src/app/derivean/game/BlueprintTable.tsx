import { useParams } from "@tanstack/react-router";
import {
    Icon,
    LinkTo,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber, tvc, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";

export namespace BlueprintTable {
	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
	}
}

const column = withColumn<BlueprintTable.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<div className={"flex flex-row gap-2 items-center"}>
					<LinkTo
						icon={"icon-[ph--graph-light]"}
						to={"/$locale/apps/derivean/game"}
						params={{ locale }}
						search={{ blueprintId: data.id }}
					/>

					<LinkTo
						icon={
							<div
								className={tvc([
									"border-2",
									"border-purple-400",
									"rounded-md",
									"w-[64px]",
									"h-[64px]",
									"bg-contain",
									`bg-${data.id}`,
								])}
							/>
						}
						to={"/$locale/apps/derivean/game/blueprint/$id/view"}
						params={{ locale, id: data.id }}
					>
						{value}
					</LinkTo>
				</div>
			);
		},
		size: 18,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Construction cycles (label)"} />;
		},
		render({ value }) {
			return (
				<div className={"flex flex-row items-center gap-2"}>
					<Icon icon={CycleIcon} />
					{toHumanNumber({ number: value })}
				</div>
			);
		},
		size: 8,
	}),
];

export namespace BlueprintTable {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const BlueprintTable: FC<BlueprintTable.Props> = ({
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
