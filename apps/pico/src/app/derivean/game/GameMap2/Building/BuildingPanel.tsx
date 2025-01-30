import { useParams } from "@tanstack/react-router";
import { LinkTo, Tx } from "@use-pico/client";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { DemandIcon } from "~/app/derivean/icon/DemandIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { QueueIcon } from "~/app/derivean/icon/QueueIcon";
import { SupplyIcon } from "~/app/derivean/icon/SupplyIcon";

const linkCss = [
	"p-4",
	"border",
	"border-slate-300",
	"w-full",
	"justify-start",
];

export namespace BuildingPanel {
	export interface Building {
		id: string;
		name: string;
		land: string;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
	}
}

export const BuildingPanel: FC<BuildingPanel.Props> = ({ building }) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={BuildingIcon}
			textTitle={
				<LinkTo
					to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
					params={{ locale, mapId, buildingId: building.id }}
					search={{ zoomToId: building.id }}
				>
					{building.name}
				</LinkTo>
			}
			textSubTitle={building.land}
		>
			<LinkTo
				icon={ProductionIcon}
				to={
					"/$locale/apps/derivean/map/$mapId/building/$buildingId/production/list"
				}
				params={{ locale, mapId, buildingId: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Building production (label)"} />
			</LinkTo>

			<LinkTo
				icon={QueueIcon}
				to={
					"/$locale/apps/derivean/map/$mapId/building/$buildingId/production/queue"
				}
				params={{ locale, mapId, buildingId: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Production queue (label)"} />
			</LinkTo>

			<LinkTo
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/inventory"}
				params={{ locale, mapId, buildingId: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Building inventory (label)"} />
			</LinkTo>

			<LinkTo
				icon={SupplyIcon}
				to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/supply"}
				params={{ locale, mapId, buildingId: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Supply list (label)"} />
			</LinkTo>

			<LinkTo
				icon={DemandIcon}
				to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/demand"}
				params={{ locale, mapId, buildingId: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Demand list (label)"} />
			</LinkTo>

			<LinkTo
				icon={BuildingIcon}
				to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/link"}
				params={{ locale, mapId, buildingId: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Building links (label)"} />
			</LinkTo>
		</Panel>
	);
};
