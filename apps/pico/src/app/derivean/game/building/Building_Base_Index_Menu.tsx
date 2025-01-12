import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BlueprintIcon } from "~/app/derivean/icon/BuildingBaseIcon";

export namespace Building_Base_Index_Menu {
	export interface Props extends Menu.Props, Entity.Type<IdentitySchema.Type> {
		//
	}
}

export const Building_Base_Index_Menu: FC<Building_Base_Index_Menu.Props> = ({
	entity,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={BlueprintIcon}
				to={"/$locale/apps/derivean/game/building/base/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>
		</Menu>
	);
};
