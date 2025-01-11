import { useParams } from "@tanstack/react-router";
import {
    Badge,
    Icon,
    LinkTo,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace Building_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		queueCount: number;
	}
}

const column = withColumn<Building_Table.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });

			return (
				<div className={"flex flex-row items-center gap-2 w-full"}>
					<div>
						<Badge
							css={{
								base: [
									"flex",
									"flex-row",
									"items-center",
									"gap-1",
									...[
										data.queueCount > 0 ?
											["bg-emerald-200", "border-emerald-400"]
										:	["bg-amber-200", "border-amber-400"],
									],
								],
							}}
						>
							<Icon
								icon={ResourceIcon}
								variant={{ size: "sm" }}
							/>
							{data.queueCount}
						</Badge>
					</div>

					<div>
						<LinkTo
							to={"/$locale/apps/derivean/game/building/$id/production/list"}
							params={{ locale, id: data.id }}
						>
							{value}
						</LinkTo>
					</div>
				</div>
			);
		},
		size: 24,
	}),
];

export namespace Building_Table {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const Building_Table: FC<Building_Table.Props> = ({
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
