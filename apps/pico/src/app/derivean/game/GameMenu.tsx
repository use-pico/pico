import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
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
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/game/building/resource/list"}
				params={{ locale }}
			>
				<Tx label={"Resource list (menu)"} />
			</MenuLink>
		</Menu>
	);
};
