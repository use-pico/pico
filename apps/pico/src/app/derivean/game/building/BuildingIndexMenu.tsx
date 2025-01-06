import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";

export namespace BuildingIndexMenu {
	export interface Props
		extends Menu.Props,
			Entity.Type<BuildingSchema["~output"]> {
		//
	}
}

export const BuildingIndexMenu: FC<BuildingIndexMenu.Props> = ({
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
