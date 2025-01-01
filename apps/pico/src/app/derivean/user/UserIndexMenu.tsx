import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx, UserIcon } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import type { UserSchema } from "~/app/user/UserSchema";

export namespace UserIndexMenu {
	export interface Props
		extends Menu.Props,
			Entity.Schema<UserSchema["output"]> {
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
				<Tx label={"User detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={BuildingIcon}
				to={"/$locale/apps/derivean/root/user/$id/building/list"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Building list (menu)"} />
			</MenuLink>
		</Menu>
	);
};
