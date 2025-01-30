import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Building/Demand/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { DemandIcon } from "~/app/derivean/icon/DemandIcon";

export namespace DemandPanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Demand {
		id: string;
		name: string;
		amount: number;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		demand: Demand[];
	}
}

export const DemandPanel: FC<DemandPanel.Props> = ({
	building,
	demand,
	...props
}) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={DemandIcon}
			textTitle={<Tx label={"Demand (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: building.id }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/demand"}
						params={{ locale, mapId, buildingId: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
				</>
			}
			{...props}
		>
			{demand.length > 0 ?
				demand.map((item) => {
					return (
						<Item
							key={item.id}
							demand={item}
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
					<Tx label={"This building does not demand anything. (label)"} />
				</div>
			}
		</Panel>
	);
};
