import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { QueueIcon } from "~/app/derivean/icon/QueueIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace GameMenu {
	export interface Props extends Menu.Props {
		//
	}
}

export const GameMenu: FC<GameMenu.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={BaseBuildingIcon}
				to={"/$locale/apps/derivean/game/building/base/list"}
				params={{ locale }}
			>
				<Tx label={"Building build list (label)"} />
			</MenuLink>

			<MenuLink
				icon={BuildingIcon}
				to={"/$locale/apps/derivean/game/building/list"}
				params={{ locale }}
			>
				<Tx label={"Building list (label)"} />
			</MenuLink>

			<MenuLink
				icon={ConstructionIcon}
				to={"/$locale/apps/derivean/game/building/queue/construction/list"}
				params={{ locale }}
			>
				<Tx label={"Building queue list (label)"} />
			</MenuLink>

			<MenuLink
				icon={QueueIcon}
				to={"/$locale/apps/derivean/game/building/queue/production/list"}
				params={{ locale }}
			>
				<Tx label={"Production queue (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/game/building/resource/list"}
				params={{ locale }}
			>
				<Tx label={"Resource list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/game/inventory"}
				params={{ locale }}
			>
				<Tx label={"Inventory (menu)"} />
			</MenuLink>
		</Menu>
	);
};
