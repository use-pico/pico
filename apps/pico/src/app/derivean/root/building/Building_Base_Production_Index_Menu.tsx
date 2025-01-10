import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { RequirementIcon } from "~/app/derivean/icon/RequirementIcon";

export namespace Building_Base_Production_Index_Menu {
	export interface Props extends Menu.Props, Entity.Schema<IdentitySchema> {
		//
	}
}

export const Building_Base_Production_Index_Menu: FC<
	Building_Base_Production_Index_Menu.Props
> = ({ entity, ...props }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/root/building/base/production/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={RequirementIcon}
				to={
					"/$locale/apps/derivean/root/building/base/production/$id/requirements"
				}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Production requirements (menu)"} />
			</MenuLink>
		</Menu>
	);
};
