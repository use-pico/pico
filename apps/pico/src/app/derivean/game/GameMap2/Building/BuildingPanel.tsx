import { useParams } from "@tanstack/react-router";
import { LinkTo, Tx } from "@use-pico/client";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";

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
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/map/building/$id/inventory"}
				params={{ locale, id: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Building inventory (label)"} />
			</LinkTo>

			<LinkTo
				icon={"icon-[gis--route-end]"}
				to={"/$locale/apps/derivean/map/building/$id/routes"}
				params={{ locale, id: building.id }}
				css={{ base: linkCss }}
			>
				<Tx label={"Building routes (label)"} />
			</LinkTo>
		</Panel>
	);
};
