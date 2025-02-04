import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Road/Transport/Item";
import { TransportIcon } from "~/app/derivean/icon/TransportIcon";

export namespace TransportPanel {
	export interface Road {
		id: string;
	}

	export interface Transport {
		id: string;
		name: string;
		source: string;
		sourceId: string;
		target: string;
		targetId: string;
		amount: number;
		progress: number;
	}

	export interface Props extends Panel.PropsEx {
		road: Road;
		transport: Transport[];
	}
}

export const TransportPanel: FC<TransportPanel.Props> = ({
	road,
	transport,
	...props
}) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={TransportIcon}
			textTitle={<Tx label={"Transport (label)"} />}
			textSubTitle={
				<LinkTo
					icon={BackIcon}
					to={"/$locale/apps/derivean/map/$mapId/road/$roadId/view"}
					params={{ locale, mapId, roadId: road.id }}
				>
					<Tx label={"Road (label)"} />
				</LinkTo>
			}
			{...props}
		>
			{transport.length > 0 ?
				transport.map((transport) => {
					return (
						<Item
							key={transport.id}
							transport={transport}
						/>
					);
				})
			:	<div
					className={tvc([
						"flex",
						"items-center",
						"justify-center",
						"rounded-sm",
						"border",
						"border-amber-400",
						"p-4",
						"bg-amber-200",
						"font-bold",
					])}
				>
					<Tx
						label={
							"There are no resources transported on this waypoint. (label)"
						}
					/>
				</div>
			}
		</Panel>
	);
};
