import { Badge } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import type { TransportPanel } from "~/app/derivean/game/GameMap2/Building/Transport/TransportPanel";

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
				"flex-row",
				"gap-2",
				"items-center",
				"justify-between",
				"border",
				"p-4",
				"rounded-sm",
				"border-slate-200",
				"hover:border-slate-300",
				"hover:bg-slate-100",
			])}
		>
			<div className={"font-bold"}>{transport.name}</div>
			<Badge>x{transport.amount}</Badge>
		</div>
	);
};
