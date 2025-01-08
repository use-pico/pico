import { useParams } from "@tanstack/react-router";
import { EditIcon, Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

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
				to={"/$locale/apps/derivean/root/building/base/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/root/building/base/$id/requirements"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Resource requirements (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/root/building/base/$id/production"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Resource production (menu)"} />
			</MenuLink>

			<MenuLink
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/root/building/base/$id/inventory"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Building inventory (menu)"} />
			</MenuLink>

			<MenuLink
				icon={EditIcon}
				to={"/$locale/apps/derivean/root/building/base/$id/edit"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Edit (menu)"} />
			</MenuLink>
		</Menu>
	);
};