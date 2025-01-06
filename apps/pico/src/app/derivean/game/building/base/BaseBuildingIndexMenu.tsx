import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";

export namespace BaseBuildingIndexMenu {
	export interface Props
		extends Menu.Props,
			Entity.Type<BaseBuildingSchema["~output"]> {
		//
	}
}

export const BaseBuildingIndexMenu: FC<BaseBuildingIndexMenu.Props> = ({
	entity,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={BaseBuildingIcon}
				to={"/$locale/apps/derivean/game/building/base/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/game/building/base/$id/production"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Base building production (menu)"} />
			</MenuLink>
		</Menu>
	);
};
