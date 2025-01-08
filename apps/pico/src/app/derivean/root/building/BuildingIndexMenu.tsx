import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildingIndexMenu {
	export interface Props extends Menu.Props, Entity.Schema<IdentitySchema> {
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
				to={"/$locale/apps/derivean/root/building/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (label)"} />
			</MenuLink>
		</Menu>
	);
};
