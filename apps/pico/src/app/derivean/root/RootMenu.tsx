import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ItemIcon } from "~/app/derivean/icon/ItemIcon";
import { SlotIcon } from "~/app/derivean/icon/SlotIcon";

export namespace RootMenu {
	export interface Props extends Menu.Props {
		//
	}
}

export const RootMenu: FC<RootMenu.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={SlotIcon}
				to={"/$locale/apps/derivean/root/slot/list"}
				params={{ locale }}
			>
				<Tx label={"Slot list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ItemIcon}
				to={"/$locale/apps/derivean/root/item/list"}
				params={{ locale }}
			>
				<Tx label={"Item list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/root/inventory/list"}
				params={{ locale }}
			>
				<Tx label={"Inventory list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={BlueprintIcon}
				to={"/$locale/apps/derivean/root/blueprint/list"}
				params={{ locale }}
			>
				<Tx label={"Blueprint list (menu)"} />
			</MenuLink>
		</Menu>
	);
};
