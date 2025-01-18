import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
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
				icon={"icon-[et--map]"}
				to={"/$locale/apps/derivean/game/map"}
				params={{ locale }}
			>
				<Tx label={"Map (menu)"} />
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
