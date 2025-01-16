import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Icon, LinkTo } from "@use-pico/client";
import { genId } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { BuildingItem } from "~/app/derivean/game/GameMap/BuildingItem";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export namespace BuildingDetail {
	export interface Props {
		detail: MapSchema.Type;
		data: MapSchema.Type[];
		userId: string;
		inventory: InventorySchema["~entity-array"];
	}
}

export const BuildingDetail: FC<BuildingDetail.Props> = ({
	detail,
	data,
	userId,
	inventory,
}) => {
	const { locale } = useParams({ from: "/$locale" });

	const query = useQuery({
		queryKey: ["Management", "producers", detail.id, data],
		async queryFn(): Promise<MapSchema.Type[]> {
			return (
				await kysely.transaction().execute((tx) => {
					return tx
						.selectFrom("Blueprint as bl")
						.distinct()
						.innerJoin("Building as bg", "bl.id", "bg.blueprintId")
						.innerJoin("Blueprint_Production as bp", "bl.id", "bp.blueprintId")
						.select(["bl.id"])
						.where("bg.userId", "=", userId)
						.where(
							"bp.resourceId",
							"in",
							tx
								.selectFrom("Blueprint as bl2")
								.innerJoin(
									"Blueprint_Production as bp",
									"bl2.id",
									"bp.blueprintId",
								)
								.innerJoin(
									"Blueprint_Production_Requirement as bpr",
									"bp.id",
									"bpr.blueprintProductionId",
								)
								.select(["bpr.resourceId"])
								.where("bl2.id", "=", detail.id),
						)
						.where("bl.id", "!=", detail.id)
						.execute();
				})
			)
				.map(({ id }) => data.find((d) => d.id === id))
				.filter(Boolean) as MapSchema.Type[];
		},
	});

	const requiredResourceIds = [
		...new Set(
			detail.production.flatMap(({ requirements }) =>
				requirements.map((requirement) => requirement.resourceId),
			),
		),
	];

	const waitingResourceIds = [
		...new Set(
			data
				.filter(
					({
						withAvailableBuildings,
						withAvailableResources,
						building,
						construction,
					}) => {
						if (construction.length > 0) {
							return false;
						}
						if (withAvailableBuildings && withAvailableResources) {
							return false;
						}
						return withAvailableBuildings && !building;
					},
				)
				.flatMap(({ requirements }) => {
					return requirements
						.filter((requirement) => {
							const item = inventory.find(
								({ resourceId }) => resourceId === requirement.resourceId,
							);
							if (!item) {
								return true;
							}
							return item.amount < requirement.amount;
						})
						.map(({ resourceId }) => resourceId);
				}),
		),
	];
	const currentProductionRequirementIds = [
		...new Set(
			data
				.filter(({ building }) => building)
				.flatMap(({ production }) => {
					return production.flatMap(({ requirements }) => {
						return requirements.map((requirement) => requirement.resourceId);
					});
				}),
		),
	];

	const availableResourceIds = waitingResourceIds.concat(
		currentProductionRequirementIds,
	);

	return (
		<div className={"flex flex-col gap-2"}>
			<div className={"flex gap-2 items-center justify-between shadow-md p-4"}>
				<div className={"flex items-center gap-2 font-bold"}>
					<Icon
						icon={ProductionIcon}
						css={{ base: ["text-slate-400"] }}
					/>
					{detail.name}
				</div>
			</div>
			<div
				className={
					"max-h-[calc(100vh-20rem)] overflow-auto p-4 flex flex-col gap-4"
				}
			>
				<BuildingItem
					userId={userId}
					inventory={inventory}
					entity={detail}
					availableResourceIds={availableResourceIds}
				/>
				{query.isSuccess ?
					<>
						{query.data.length > 0 ?
							<div className={"border-t border-slate-300 shadow-md"} />
						:	null}
						<div className={"flex flex-col gap-4"}>
							{query.data.map((data) => (
								<div
									key={genId()}
									className={"flex flex-col gap-1"}
								>
									<div className={"flex flex-row items-center gap-2"}>
										<Icon
											icon={ResourceIcon}
											css={{ base: ["text-slate-400"] }}
										/>
										<div className={"font-light"}>
											<LinkTo
												to={"/$locale/apps/derivean/game/map"}
												params={{ locale }}
												search={({ requirementsOf }) => ({
													blueprintId: data.id,
													requirementsOf,
												})}
											>
												{data.name}
											</LinkTo>
										</div>
									</div>
									<BuildingItem
										userId={userId}
										inventory={inventory}
										productionOf={requiredResourceIds}
										entity={data}
									/>
								</div>
							))}
						</div>
					</>
				:	null}
			</div>
		</div>
	);
};
