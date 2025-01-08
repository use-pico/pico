import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx, UserIcon } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";

interface Data extends IdentitySchema {
	//
}

export namespace UserIndexMenu {
	export interface Props extends Menu.Props, Entity.Schema<Data> {
		//
	}
}

export const UserIndexMenu: FC<UserIndexMenu.Props> = ({
	entity,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={UserIcon}
				to={"/$locale/apps/derivean/root/user/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={BuildingIcon}
				to={"/$locale/apps/derivean/root/user/$id/building/list"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Building list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/root/user/$id/inventory"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Inventory (label)"} />
			</MenuLink>
		</Menu>
	);
};
