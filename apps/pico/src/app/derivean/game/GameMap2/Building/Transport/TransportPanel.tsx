import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Building/Transport/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { TransportIcon } from "~/app/derivean/icon/TransportIcon";

export namespace TransportPanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Transport {
		id: string;
		resource: string;
		source: string;
		sourceId: string;
		amount: number;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		transport: Transport[];
	}
}

export const TransportPanel: FC<TransportPanel.Props> = ({
	building,
	transport,
	...props
}) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={TransportIcon}
			textTitle={<Tx label={"Transport list (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: building.id }}
					/>
					<LinkTo
						to={
							"/$locale/apps/derivean/map/$mapId/building/$buildingId/transport"
						}
						params={{ locale, mapId, buildingId: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
				</>
			}
			{...props}
		>
			{transport.length > 0 ?
				transport.map((item) => {
					return (
						<Item
							key={item.id}
							transport={item}
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
						"border-green-400",
						"p-4",
						"bg-green-200",
						"font-bold",
					])}
				>
					<Tx label={"There is nothing on the way to this building. (label)"} />
				</div>
			}
		</Panel>
	);
};
