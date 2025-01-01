import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { StorageIcon } from "~/app/derivean/icon/StorageIcon";

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
				icon={StorageIcon}
				to={"/$locale/apps/derivean/root/building/$id/storage/list"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Storage list (label)"} />
			</MenuLink>
		</Menu>
	);
};
