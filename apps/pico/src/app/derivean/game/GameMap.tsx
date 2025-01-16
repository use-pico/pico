import { useNavigate, useParams } from "@tanstack/react-router";
import { Icon } from "@use-pico/client";
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
import { RequirementsInline } from "~/app/derivean/root/RequirementsInline";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";
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
		requirementsOf: string;
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
	const detail: MapSchema.Type | undefined = graph.nodes.find(
		({ id }) => id === blueprintId,
	)?.data;
	const requirements: MapSchema.Type | undefined = graph.nodes.find(
		({ id }) => id === requirementsOf,
	)?.data;

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

					{detail ?
						<div
							className={
								"react-flow__panel w-4/10 h-100 border bg-white border-slate-300 rounded-md shadow-md p-4 absolute top-4 right-4"
							}
						>
							<BuildingDetail
								detail={detail}
								data={graph.nodes.map(({ data }) => data)}
								userId={userId}
								inventory={inventory}
							/>
						</div>
					:	null}
					{requirements ?
						<div
							className={
								"react-flow__panel w-4/10 h-100 border bg-white border-slate-300 rounded-md shadow-md p-4 absolute top-4 right-4"
							}
						>
							<div className={"flex flex-row items-center gap-2"}>
								<Icon
									icon={BlueprintIcon}
									css={{ base: ["text-slate-400"] }}
								/>
								<div className={"font-bold"}>{requirements.name}</div>
							</div>
							<RequirementsInline
								requirements={requirements.requirements}
								diff={inventory}
							/>
						</div>
					:	null}
				</ReactFlow>
			</div>
		</div>
	);
};
