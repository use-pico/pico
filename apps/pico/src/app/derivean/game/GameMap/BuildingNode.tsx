import { useParams } from "@tanstack/react-router";
import { Button, Icon, LinkTo, Progress } from "@use-pico/client";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import { type FC } from "react";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildingNode {
	export type Data = MapSchema.Type;

	export interface Props extends NodeProps<Node<Data, "building">> {
		//
	}
}

export const BuildingNode: FC<BuildingNode.Props> = ({
	data,
	isConnectable,
}) => {
	const { locale } = useParams({ from: "/$locale" });

	const production = data.production
		.flatMap(({ queue }) => queue)
		.sort((a, b) => a.cycle - b.cycle)?.[0];

	return (
		<div className={"min-w-[18rem]"}>
			<Handle
				type={"target"}
				position={Position.Left}
				className={"w-4 h-4"}
			/>
			<div className={"flex flex-col gap-2 items-start w-full"}>
				<div
					className={"flex flex-row items-center justify-between gap-1 w-full"}
				>
					<LinkTo
						to={"/$locale/apps/derivean/game/map"}
						params={{ locale }}
						search={({ requirementsOf }) => ({
							blueprintId: data.id,
							requirementsOf,
						})}
						css={{
							base: ["font-bold", "flex-grow"],
						}}
					>
						<Button
							variant={{ variant: "primary" }}
							iconEnabled={BuildingIcon}
							css={{ base: ["w-full"] }}
						>
							{data.name}
						</Button>
					</LinkTo>
					{production ?
						<div className={"flex flex-row items-center gap-1 flex-1"}>
							<Icon
								icon={"icon-[mingcute--arrow-right-line]"}
								css={{ base: ["text-slate-400"] }}
							/>
							<div className={"text-xs text-slate-400"}>{production.name}</div>
						</div>
					:	null}
				</div>
				{production ?
					<Progress
						value={(100 * production.cycle) / (production.to - production.from)}
						variant={{ size: "sm" }}
					/>
				:	null}
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
