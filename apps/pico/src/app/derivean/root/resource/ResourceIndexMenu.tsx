import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { RequirementIcon } from "~/app/derivean/icon/RequirementIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace ResourceIndexMenu {
	export interface Props extends Menu.Props, Entity.Schema<IdentitySchema> {
		//
	}
}

export const ResourceIndexMenu: FC<ResourceIndexMenu.Props> = ({
	entity,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/root/resource/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={RequirementIcon}
				to={"/$locale/apps/derivean/root/resource/$id/production/requirement"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Resource production requirement (menu)"} />
			</MenuLink>
		</Menu>
	);
};
