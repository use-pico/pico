import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx, UserIcon } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
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
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/root/user/$id/storage/list"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"User storage list (menu)"} />
			</MenuLink>
		</Menu>
	);
};
