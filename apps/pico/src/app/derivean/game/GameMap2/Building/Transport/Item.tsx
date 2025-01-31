import { useParams } from "@tanstack/react-router";
import { Badge, LinkTo } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import type { TransportPanel } from "~/app/derivean/game/GameMap2/Building/Transport/TransportPanel";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace Item {
	export interface Props {
		transport: TransportPanel.Transport;
	}
}

export const Item: FC<Item.Props> = ({ transport }) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

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
			<div className={"font-bold"}>{transport.resource}</div>
			<LinkTo
				icon={BuildingIcon}
				to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
				params={{ locale, mapId, buildingId: transport.sourceId }}
				search={{ zoomToId: transport.sourceId }}
			>
				{transport.source}
			</LinkTo>
			<Badge>x{transport.amount}</Badge>
		</div>
	);
};
