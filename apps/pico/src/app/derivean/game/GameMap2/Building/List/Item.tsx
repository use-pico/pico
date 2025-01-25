import { useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingListPanel } from "~/app/derivean/game/GameMap2/Building/List/BuildingListPanel";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { LandIcon } from "~/app/derivean/icon/LandIcon";

export namespace Item {
	export interface Props {
		building: BuildingListPanel.Building;
	}
}

export const Item: FC<Item.Props> = ({ building }) => {
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
					params={{ locale, mapId, buildingId: building.id }}
					search={{ zoomToId: building.id }}
				>
					{building.name}
				</LinkTo>

				<LinkTo
					icon={LandIcon}
					to={"/$locale/apps/derivean/map/$mapId/building/list"}
					params={{ locale, mapId }}
					search={{ zoomToId: building.landId }}
				>
					{building.land}
				</LinkTo>
			</div>
		</div>
	);
};
