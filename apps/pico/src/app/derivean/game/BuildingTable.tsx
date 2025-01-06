import { useParams } from "@tanstack/react-router";
import {
    Badge,
    Button,
    LinkTo,
    Table,
    Tx,
    useCountQuery,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { BuildingProductionQueueSource } from "~/app/derivean/building/production/BuildingProductionQueueSource";
import { BuildingResourceSource } from "~/app/derivean/building/resource/BuildingResourceSource";
import { useResourcePickupMutation } from "~/app/derivean/building/useResourcePickupMutation";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

const column = withColumn<BuildingSchema["~output"]>();

const columns = [
	column({
		name: "baseBuilding.name",
		header() {
			return <Tx label={"Base building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });
			const resourceCount = useCountQuery({
				source: BuildingResourceSource,
				filter: {
					buildingId: data.id,
				},
			});
			const queueCount = useCountQuery({
				source: BuildingProductionQueueSource,
				filter: {
					buildingId: data.id,
				},
			});
			const mutation = useResourcePickupMutation();

			return (
				<div className={"flex flex-row items-center gap-2"}>
					<div>
						<Badge
							css={{
								base:
									queueCount.data?.filter ?
										["bg-emerald-200", "border-emerald-400"]
									:	["bg-amber-200", "border-amber-400"],
							}}
						>
							{queueCount.data?.filter || 0}
						</Badge>
					</div>
					<Button
						iconEnabled={ResourceIcon}
						iconDisabled={ResourceIcon}
						disabled={!resourceCount.data?.filter}
						loading={mutation.isPending}
						onClick={() => {
							mutation.mutate({
								buildingId: data.id,
							});
						}}
						variant={{ variant: "subtle" }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/game/building/$id/production"}
						params={{ locale, id: data.id }}
					>
						{value}
					</LinkTo>
				</div>
			);
		},
	}),
];

export namespace BuildingTable {
	export interface Props extends Table.PropsEx<BuildingSchema["~output"]> {
		//
	}
}

export const BuildingTable: FC<BuildingTable.Props> = ({ table, ...props }) => {
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
