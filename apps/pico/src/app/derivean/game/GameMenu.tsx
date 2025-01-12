import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { GameIcon } from "~/app/derivean/icon/GameIcon";
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
				icon={GameIcon}
				to={"/$locale/apps/derivean/game/management"}
				params={{ locale }}
			>
				<Tx label={"Management (menu)"} />
			</MenuLink>

			{/* 	<MenuLink
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/game/building/production/resource/list"}
				params={{ locale }}
			>
				<Tx label={"Resource production (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/game/building/production/resource/queue"}
				params={{ locale }}
			>
				<Tx label={"Resources queue (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ConstructionIcon}
				to={"/$locale/apps/derivean/game/building/construction/queue/list"}
				params={{ locale }}
			>
				<Tx label={"Building queue (menu)"} />
			</MenuLink>

			<MenuLink
				icon={BuildingIcon}
				to={"/$locale/apps/derivean/game/building/list"}
				params={{ locale }}
				active={[
					{
						to: "/$locale/apps/derivean/game/building/$id/production/list",
					},
					{ to: "/$locale/apps/derivean/game/building/$id/view" },
				]}
			>
				<Tx label={"My buildings (menu)"} />
			</MenuLink> */}

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
