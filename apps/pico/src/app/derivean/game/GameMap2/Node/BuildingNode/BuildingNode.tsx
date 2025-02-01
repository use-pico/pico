import { useNavigate, useParams } from "@tanstack/react-router";
import { Icon, Progress } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FC } from "react";
import { ArrowRightIcon } from "~/app/derivean/icon/ArrowRightIcon";
import { OrderIcon } from "~/app/derivean/icon/OrderIcon";
import { RecurringIcon } from "~/app/derivean/icon/RecurringIcon";

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
	const navigate = useNavigate();

	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-1",
				"w-full",
				"h-full",
				"justify-between",
				"items-start",
				"group",
			])}
			onClick={() => {
				navigate({
					to: "/$locale/apps/derivean/map/$mapId/building/$buildingId/view",
					params: { locale, mapId, buildingId: id },
				});
			}}
		>
			<div
				className={
					"hidden group-hover:flex justify-center w-full rounded-sm bg-slate-50 text-slate-600"
				}
			>
				<div>{data.name}</div>
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
	);
};
