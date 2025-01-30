import { useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import type { LinkPanel } from "~/app/derivean/game/GameMap2/Building/Link/LinkPanel";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { LandIcon } from "~/app/derivean/icon/LandIcon";

export namespace Item {
	export interface Props {
		building: LinkPanel.Building;
		link: LinkPanel.Link;
	}
}

export const Item: FC<Item.Props> = ({ building, link }) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

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
				<LinkTo
					icon={BuildingIcon}
					to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
					params={{ locale, mapId, buildingId: link.id }}
					search={{ zoomToId: link.id }}
				>
					{link.name}
				</LinkTo>

				<LinkTo
					icon={LandIcon}
					to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/link"}
					params={{ locale, mapId, buildingId: building.id }}
					search={{ zoomToId: link.landId }}
				>
					{link.land}
				</LinkTo>
			</div>
		</div>
	);
};
