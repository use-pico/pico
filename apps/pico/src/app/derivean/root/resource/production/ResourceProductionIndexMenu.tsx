import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { RequirementIcon } from "~/app/derivean/icon/RequirementIcon";

export namespace ResourceProductionIndexMenu {
	export interface Props extends Menu.Props, Entity.Schema<IdentitySchema> {
		//
	}
}

export const ResourceProductionIndexMenu: FC<
	ResourceProductionIndexMenu.Props
> = ({ entity, ...props }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/root/resource/production/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={RequirementIcon}
				to={"/$locale/apps/derivean/root/resource/production/$id/requirements"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Resource requirements (menu)"} />
			</MenuLink>
		</Menu>
	);
};
