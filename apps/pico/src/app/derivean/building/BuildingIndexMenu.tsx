import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace BuildingIndexMenu {
	export interface Props
		extends Menu.Props,
			Entity.Schema<BuildingSchema["output"]> {
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
				<Tx label={"Building detail (label)"} />
			</MenuLink>

			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/root/building/$id/resource/list"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Building resource list (label)"} />
			</MenuLink>
		</Menu>
	);
};
