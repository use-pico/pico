import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Action, Icon, LinkTo, LoaderIcon, Modal, Tx } from "@use-pico/client";
import {
    Handle,
    NodeProps,
    Position,
    useReactFlow,
    type Node,
} from "@xyflow/react";
import { type FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { BuildingItem } from "~/app/derivean/game/GameMap/BuildingItem";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export namespace BuildingNode {
	export type Data = MapSchema.Type;

	export interface Props extends NodeProps<Node<Data, "building">> {
		showId?: string;
		userId: string;
		inventory: InventorySchema["~entity-array"];
	}
}

export const BuildingNode: FC<BuildingNode.Props> = ({
	showId,
	userId,
	inventory,
	data,
	isConnectable,
}) => {
	return (
		<div className={"min-w-[14rem]"}>
			<Handle
				type={"target"}
				position={Position.Left}
				className={"w-4 h-4"}
			/>
			<div className={"flex flex-col gap-2 items-start"}>
				<div className={"flex flex-row items-center gap-2"}>
					<Icon
						icon={BuildingIcon}
						css={{ base: ["text-slate-400"] }}
					/>
					<div className={"font-bold"}>{data.name}</div>
				</div>
				<div
					className={
						"flex flex-row items-center justify-between gap-2 border bg-slate-50 border-slate-200 rounded w-full p-1"
					}
					onClick={(e) => e.stopPropagation()}
					onDoubleClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
				>
					<Modal
						icon={BuildingIcon}
						defaultOpen={showId === data.id}
						textTitle={data.name}
						target={<Action iconEnabled={ResourceIcon} />}
						outside={true}
					>
						{() => {
							const { locale } = useParams({ from: "/$locale" });
							const { getNode } = useReactFlow();

							const query = useQuery({
								queryKey: ["Management", "producers", data.id],
								async queryFn() {
									return (
										await kysely.transaction().execute((tx) => {
											return tx
												.selectFrom("Blueprint as bl")
												.innerJoin("Building as bg", "bl.id", "bg.blueprintId")
												.innerJoin(
													"Blueprint_Production as bp",
													"bl.id",
													"bp.blueprintId",
												)
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
														.where("bl2.id", "=", data.id),
												)
												.execute();
										})
									)
										.map(({ id }) => getNode(id))
										.filter(Boolean)
										.map(({ data }: any) => data as MapSchema.Type);
								},
							});

							return (
								<div className={"flex flex-col gap-4"}>
									<div className={"flex gap-2 items-center"}>
										<Icon
											icon={ProductionIcon}
											css={{ base: ["text-slate-400"] }}
										/>
										<Tx label={"Building production (label)"} />
									</div>
									<BuildingItem
										userId={userId}
										inventory={inventory}
										entity={data}
									/>
									{query.isSuccess ?
										<>
											{query.data.length > 0 ?
												<div className={"border-t border-slate-400"} />
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
																		showResourcesOf: data.id,
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
							);
						}}
					</Modal>

					{data.productionCount > 0 ?
						<Icon icon={LoaderIcon} />
					:	null}
				</div>
			</div>
			<Handle
				type={"source"}
				position={Position.Right}
				isConnectable={isConnectable}
				className={"w-4 h-4"}
			/>
		</div>
	);
};
