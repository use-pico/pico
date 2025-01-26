import { useParams } from "@tanstack/react-router";
import { Button, Icon, LinkTo, Progress } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import {
    Handle,
    NodeToolbar,
    Position,
    type Node,
    type NodeProps,
} from "@xyflow/react";
import type { FC } from "react";
import { ToolbarCss } from "~/app/derivean/game/GameMap2/Node/ToolbarCss";
import { ArrowRightIcon } from "~/app/derivean/icon/ArrowRightIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { OrderIcon } from "~/app/derivean/icon/OrderIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { RecurringIcon } from "~/app/derivean/icon/RecurringIcon";
import { SupplyIcon } from "~/app/derivean/icon/SupplyIcon";

export namespace BuildingNode {
	export interface Production {
		id: string;
		name: string;
		cycles: number;
		cycle: number;
	}

	export interface Data {
		id: string;
		name: string;
		landId: string;
		userId: string;
		x: number;
		y: number;
		productionName?: string | null;
		recurringProductionName?: string | null;
		production?: Production | null;
		[key: string]: unknown;
	}

	export type BuildingNode = Node<Data, "building">;

	export interface Props extends NodeProps<BuildingNode> {
		//
	}
}

export const BuildingNode: FC<BuildingNode.Props> = ({ id, data }) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<>
			<NodeToolbar className={tvc(ToolbarCss)}>
				<div
					className={"flex flex-row gap-2 items-center justify-between w-full"}
				>
					<LinkTo
						icon={BuildingIcon}
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: id }}
						css={{
							base: ["font-bold"],
						}}
					>
						{data.name}
					</LinkTo>

					<div className={"flex flex-row gap-1 items-end"}>
						<LinkTo
							to={
								"/$locale/apps/derivean/map/$mapId/building/$buildingId/inventory"
							}
							params={{ locale, mapId, buildingId: id }}
						>
							<Button
								iconEnabled={InventoryIcon}
								variant={{ variant: "subtle", size: "sm" }}
							/>
						</LinkTo>
						<LinkTo
							to={
								"/$locale/apps/derivean/map/$mapId/building/$buildingId/production/list"
							}
							params={{ locale, mapId, buildingId: id }}
						>
							<Button
								iconEnabled={ProductionIcon}
								variant={{ variant: "subtle", size: "sm" }}
							/>
						</LinkTo>
						<LinkTo
							to={
								"/$locale/apps/derivean/map/$mapId/building/$buildingId/supply"
							}
							params={{ locale, mapId, buildingId: id }}
						>
							<Button
								iconEnabled={SupplyIcon}
								variant={{ variant: "subtle", size: "sm" }}
							/>
						</LinkTo>
					</div>
				</div>
			</NodeToolbar>
			<div
				className={tvc([
					"flex",
					"flex-col",
					"gap-1",
					"w-full",
					"h-full",
					"justify-between",
					"items-start",
				])}
			>
				<div
					className={"flex flex-row gap-2 items-center justify-between w-full"}
				>
					<LinkTo
						icon={BuildingIcon}
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: id }}
						css={{
							base: ["font-bold"],
						}}
					>
						{data.name}
					</LinkTo>
				</div>

				<div className={"flex flex-row items-center justify-between w-full"}>
					<div>
						{data.productionName ?
							<div className={"flex flex-row gap-2 text-xs text-slate-400"}>
								<Icon
									icon={OrderIcon}
									variant={{ size: "xs" }}
								/>
								<div>{data.productionName}</div>
							</div>
						: data.recurringProductionName ?
							<div className={"flex flex-row gap-2 text-xs text-slate-400"}>
								<Icon
									icon={RecurringIcon}
									variant={{ size: "xs" }}
								/>
								<div>{data.recurringProductionName}</div>
							</div>
						:	null}
					</div>

					{data.production ?
						<div
							className={"flex flex-row gap-2 text-xs text-slate-400 font-bold"}
						>
							<Icon icon={ArrowRightIcon} />
							<div>{data.production.name}</div>
						</div>
					:	null}
				</div>

				{data.production ?
					<Progress
						value={(100 * data.production.cycle) / data.production.cycles}
					/>
				:	null}

				<Handle
					className={"hidden"}
					position={Position.Right}
					type={"source"}
					isConnectable={false}
				/>
				<Handle
					className={"hidden"}
					position={Position.Left}
					type={"target"}
					isConnectable={false}
				/>
			</div>
		</>
	);
};
