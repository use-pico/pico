import { useParams } from "@tanstack/react-router";
import { Badge, Icon, LinkTo, Progress } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { TransportPanel } from "~/app/derivean/game/GameMap2/Waypoint/Transport/TransportPanel";
import { ArrowRightIcon } from "~/app/derivean/icon/ArrowRightIcon";

export namespace Item {
	export interface Props {
		transport: TransportPanel.Transport;
	}
}

export const Item: FC<Item.Props> = ({ transport }) => {
	const { locale, mapId } = useParams({
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
				<div className={tvc(["flex", "flex-row", "gap-2", "items-center"])}>
					<div className={"font-bold"}>{transport.name}</div>
					<div className={"font-light"}>
						{toHumanNumber({ number: transport.progress })}%
					</div>
				</div>
				<div className={"flex flex-row items-center gap-2"}>
					<LinkTo
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: transport.sourceId }}
						css={{
							base: ["text-slate-500", "font-light"],
						}}
					>
						{transport.source}
					</LinkTo>
					<Icon
						icon={ArrowRightIcon}
						css={{ base: ["text-slate-500"] }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: transport.targetId }}
						css={{
							base: ["text-slate-500", "font-bold"],
						}}
					>
						{transport.target}
					</LinkTo>
				</div>
				<Badge>x{toHumanNumber({ number: transport.amount })}</Badge>
			</div>
			<Progress value={transport.progress} />
		</div>
	);
};
