import { useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import type { LandPanel } from "~/app/derivean/game/GameMap2/Land/LandPanel";

export namespace Item {
	export interface Props {
		land: LandPanel.Land;
	}
}

export const Item: FC<Item.Props> = ({ land }) => {
	const { locale } = useParams({ from: "/$locale" });

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
					to={"/$locale/apps/derivean/map/$id/view"}
					params={{ locale, id: land.mapId }}
					search={{ zoomToId: land.id }}
				>
					{land.name}
				</LinkTo>
				<div>
					[{land.x} : {land.y}]
				</div>
				<div>
					{land.width} x {land.height}
				</div>
			</div>
		</div>
	);
};
