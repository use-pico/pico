import { useParams } from "@tanstack/react-router";
import { LinkTo, Tx } from "@use-pico/client";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { QueueIcon } from "~/app/derivean/icon/QueueIcon";
import { RouteIcon } from "~/app/derivean/icon/RouteIcon";

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
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
	}
}

export const BuildingPanel: FC<BuildingPanel.Props> = ({ building }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Panel
			icon={BuildingIcon}
			textTitle={building.name}
		>
			<LinkTo
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/map/building/$id/production/list"}
				params={{ locale, id: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Building production (label)"} />
			</LinkTo>

			<LinkTo
				icon={QueueIcon}
				to={"/$locale/apps/derivean/map/building/$id/production/queue"}
				params={{ locale, id: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Production queue (label)"} />
			</LinkTo>

			<LinkTo
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/map/building/$id/inventory"}
				params={{ locale, id: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Building inventory (label)"} />
			</LinkTo>

			<LinkTo
				icon={RouteIcon}
				to={"/$locale/apps/derivean/map/building/$id/routes"}
				params={{ locale, id: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Building routes (label)"} />
			</LinkTo>

			<LinkTo
				icon={"icon-[ph--queue-thin]"}
				to={"/$locale/apps/derivean/map/building/$id/route/priority"}
				params={{ locale, id: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Route priority (label)"} />
			</LinkTo>
		</Panel>
	);
};
