import { useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { LandPanel } from "~/app/derivean/game/GameMap2/Land/LandPanel";

export namespace Item {
	export interface Props {
		land: LandPanel.Land;
	}
}

export const Item: FC<Item.Props> = ({ land }) => {
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
					to={"/$locale/apps/derivean/map/$mapId/land/list"}
					params={{ locale, mapId }}
					search={{ zoomToId: land.id }}
				>
					{land.name}
				</LinkTo>

				<div className={"flex flex-col items-end text-xs"}>
					<div className={"flex flex-row gap-1 items-center"}>
						<div className={"font-bold"}>
							{toHumanNumber({ number: land.x })}
						</div>
						<div>:</div>
						<div className={"font-bold"}>
							{toHumanNumber({ number: land.y })}
						</div>
					</div>

					<div className={"flex flex-row gap-1 items-center"}>
						<div className={"font-bold"}>
							{toHumanNumber({ number: land.width })}
						</div>
						<div>x</div>
						<div className={"font-bold"}>
							{toHumanNumber({ number: land.height })}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
