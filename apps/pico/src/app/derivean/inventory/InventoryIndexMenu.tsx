import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { SlotIcon } from "~/app/derivean/icon/SlotIcon";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";

export namespace InventoryIndexMenu {
	export interface Props
		extends Menu.Props,
			Entity.Schema<InventorySchema["entity"]> {
		//
	}
}

export const InventoryIndexMenu: FC<InventoryIndexMenu.Props> = ({
	entity,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/root/inventory/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Inventory detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={SlotIcon}
				to={"/$locale/apps/derivean/root/inventory/$id/slot/list"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Slot list (menu)"} />
			</MenuLink>
		</Menu>
	);
};
