import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";

interface Data extends IdentitySchema.Type {
	//
}

export namespace BuildingBaseIndexMenu {
	export interface Props extends Menu.Props, Entity.Type<Data> {
		//
	}
}

export const BuildingBaseIndexMenu: FC<BuildingBaseIndexMenu.Props> = ({
	entity,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={BuildingBaseIcon}
				to={"/$locale/apps/derivean/game/building/base/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>
		</Menu>
	);
};
