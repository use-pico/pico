import { Badge } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { TransportPanel } from "~/app/derivean/game/GameMap2/Waypoint/Transport/TransportPanel";

export namespace Item {
	export interface Props {
		transport: TransportPanel.Transport;
	}
}

export const Item: FC<Item.Props> = ({ transport }) => {
	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-2",
				"rounded-md",
				"border",
				"border-slate-300",
				"p-2",
				"cursor-default",
				"hover:bg-slate-100",
			])}
		>
			<div className={"flex flex-row items-center justify-between"}>
				<div className={tvc(["flex", "flex-row", "gap-2", "items-center"])}>
					<div className={"font-bold"}>{transport.name}</div>
				</div>
				<Badge>x{toHumanNumber({ number: transport.amount })}</Badge>
			</div>
		</div>
	);
};
