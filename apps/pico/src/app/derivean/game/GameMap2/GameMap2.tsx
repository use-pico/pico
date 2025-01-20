import { Outlet, useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo } from "@use-pico/client";
import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow,
} from "@xyflow/react";
import type { FC } from "react";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ZoomToNode } from "~/app/derivean/ui/ZoomToNode";

export namespace GameMap2 {
	export interface Props {
		zoomToId?: string;
	}
}

export const GameMap2: FC<GameMap2.Props> = ({ zoomToId }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<div className={"flex flex-row"}>
			<ReactFlow
				className={"flex-grow h-screen"}
				fitView
				snapGrid={[16, 16]}
				elementsSelectable={false}
			>
				<ZoomToNode nodeId={zoomToId} />
				<Controls
					orientation={"horizontal"}
					showInteractive={false}
					showZoom={true}
				/>
				<MiniMap
					zoomable
					draggable
					pannable
				/>
				<Background
					variant={BackgroundVariant.Dots}
					gap={12}
					size={1}
				/>

				<div
					className={
						"react-flow__panel flex flex-row p-2 border bg-white border-slate-300 shadow-sm"
					}
				>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/game"}
						params={{ locale }}
					/>
					<LinkTo
						icon={BlueprintIcon}
						to={"/$locale/apps/derivean/map/construction"}
						params={{ locale }}
					/>
					<LinkTo
						icon={InventoryIcon}
						to={"/$locale/apps/derivean/map/inventory"}
						params={{ locale }}
					/>
				</div>
			</ReactFlow>
			<Outlet />
		</div>
	);
};
