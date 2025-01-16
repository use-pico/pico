import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { CloseIcon, Icon, LinkTo } from "@use-pico/client";
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
				<LinkTo
					icon={CloseIcon}
					iconProps={{ variant: { size: "4xl" } }}
					to={"/$locale/apps/derivean/game/map"}
					params={{ locale }}
				/>
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
				/>
				{query.isSuccess ?
					<>
						{query.data.length > 0 ?
							<div className={"border-t border-slate-300 shadow-md"} />
						:	null}
						<div className={"flex flex-col gap-4"}>
							{query.data.map((data) => (
								<div
									key={`building-production-${data.id}`}
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
												search={{
													blueprintId: data.id,
												}}
											>
												{data.name}
											</LinkTo>
										</div>
									</div>
									<BuildingItem
										userId={userId}
										inventory={inventory}
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
