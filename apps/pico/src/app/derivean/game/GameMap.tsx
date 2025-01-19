import { useNavigate, useParams } from "@tanstack/react-router";
import { Icon, LinkTo, Tx } from "@use-pico/client";
import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow,
} from "@xyflow/react";
import { useMemo, type FC } from "react";
import { BlueprintAvailableNode } from "~/app/derivean/game/GameMap/BlueprintAvailableNode";
import { BlueprintMissingBuildingsNode } from "~/app/derivean/game/GameMap/BlueprintMissingBuildingsNode";
import { BlueprintMissingResourcesNode } from "~/app/derivean/game/GameMap/BlueprintMissingResourcesNode";
import { BuildingDetail } from "~/app/derivean/game/GameMap/BuildingDetail";
import { BuildingNode } from "~/app/derivean/game/GameMap/BuildingNode";
import { ConstructionNode } from "~/app/derivean/game/GameMap/ConstructionNode";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
import { RequirementsInline } from "~/app/derivean/ui/RequirementsInline";
import { ZoomToNode } from "~/app/derivean/ui/ZoomToNode";

export namespace GameMap {
	export interface Graph {
		nodes: any[];
		edges: any[];
	}

	export interface Props {
		graph: Graph;
		userId: string;
		blueprintId?: string;
		requirementsOf?: string;
		inventory: InventorySchema["~entity-array"];
	}
}

export const GameMap: FC<GameMap.Props> = ({
	userId,
	blueprintId,
	requirementsOf,
	inventory,
	graph,
}) => {
	const { locale } = useParams({ from: "/$locale" });
	const navigate = useNavigate();
	const detail: MapSchema.Type | undefined = useMemo(() => {
		return graph.nodes.find(({ id }) => id === blueprintId)?.data;
	}, [graph, blueprintId]);
	const requirements: MapSchema.Type | undefined = useMemo(() => {
		return graph.nodes.find(({ id }) => id === requirementsOf)?.data;
	}, [graph, requirementsOf]);
	const data = useMemo(() => graph.nodes.map(({ data }) => data), [graph]);

	return (
		<div className={"flex flex-row gap-2"}>
			<div className="flex-grow h-[calc(100vh-6rem)] border border-slate-300 rounded-md shadow-md">
				<ReactFlow
					className={"w-full h-full relative"}
					nodes={graph.nodes}
					edges={graph.edges}
					onPaneClick={() => {
						navigate({
							to: "/$locale/apps/derivean/game/map",
							params: { locale },
						});
					}}
					fitView
					snapGrid={[16, 16]}
					elementsSelectable={false}
					nodeTypes={useMemo(
						() => ({
							"building"(props) {
								return <BuildingNode {...props} />;
							},
							"construction"(props) {
								return <ConstructionNode {...props} />;
							},
							"blueprint-available"(props) {
								return (
									<BlueprintAvailableNode
										userId={userId}
										{...props}
									/>
								);
							},
							"blueprint-missing-resources"(props) {
								return <BlueprintMissingResourcesNode {...props} />;
							},
							"blueprint-missing-buildings"(props) {
								return <BlueprintMissingBuildingsNode {...props} />;
							},
							"blueprint-unavailable"(props) {
								return <BlueprintMissingBuildingsNode {...props} />;
							},
						}),
						[userId],
					)}
				>
					<ZoomToNode nodeId={detail?.id} />
					<Controls
						orientation={"horizontal"}
						showInteractive={false}
						showZoom={true}
					/>
					<MiniMap />
					<Background
						variant={BackgroundVariant.Dots}
						gap={12}
						size={1}
					/>
					{requirements ?
						<div
							className={
								"react-flow__panel w-4/10 border bg-white border-slate-300 rounded-md shadow-md p-4 absolute left-1 top-1"
							}
						>
							<div className={"flex flex-row items-center gap-2"}>
								<Icon
									icon={requirements.building ? BuildingIcon : BlueprintIcon}
									css={{ base: ["text-slate-400"] }}
								/>
								<div className={"font-bold"}>{requirements.name}</div>
							</div>
							{requirements.construction.length > 0 ?
								<Tx label={"Construction in progress (label)"} />
							: requirements.building ?
								<LinkTo
									to={"/$locale/apps/derivean/game/map"}
									params={{ locale }}
									search={{ blueprintId: requirements.id }}
								>
									<Tx label={"Construction complete (label)"} />
								</LinkTo>
							:	<RequirementsInline
									requirements={requirements.requirements}
									diff={inventory}
								/>
							}
						</div>
					:	null}
				</ReactFlow>
			</div>
			{detail ?
				<div
					className={
						"w-4/12 border bg-white border-slate-300 rounded-md shadow-md p-4"
					}
				>
					<BuildingDetail
						detail={detail}
						data={data}
						userId={userId}
						inventory={inventory}
					/>
				</div>
			:	null}
		</div>
	);
};
