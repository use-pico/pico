import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";

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
				icon={BuildingBaseIcon}
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
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/game/inventory"}
				params={{ locale }}
			>
				<Tx label={"Inventory (menu)"} />
			</MenuLink>
		</Menu>
	);
};
