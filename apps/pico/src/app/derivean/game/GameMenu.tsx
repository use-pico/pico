import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
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
				icon={BuildingBaseIcon}
				to={"/$locale/apps/derivean/game/building/construction/list"}
				params={{ locale }}
			>
				<Tx label={"Building build list (menu)"} />
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
