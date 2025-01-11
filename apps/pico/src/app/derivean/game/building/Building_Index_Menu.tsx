import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";

export namespace Building_Index_Menu {
	export interface Props extends Menu.Props, Entity.Schema<IdentitySchema> {
		//
	}
}

export const Building_Index_Menu: FC<Building_Index_Menu.Props> = ({
	entity,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });
	return (
		<Menu {...props}>
			<MenuLink
				icon={BuildingIcon}
				to={"/$locale/apps/derivean/game/building/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/game/building/$id/production"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Building production (menu)"} />
			</MenuLink>
		</Menu>
	);
};
