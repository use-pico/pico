import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace BlueprintIndexMenu {
	export interface Props extends Menu.Props, Entity.Schema<IdentitySchema> {
		//
	}
}

export const BlueprintIndexMenu: FC<BlueprintIndexMenu.Props> = ({
	entity,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={BlueprintIcon}
				to={"/$locale/apps/derivean/game/management/blueprint/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={BuildingIcon}
				to={"/$locale/apps/derivean/game/management/blueprint/$id/dependencies"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Blueprint dependencies (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/game/management/blueprint/$id/requirements"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Required resources (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/game/management/blueprint/$id/production"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Resource production (menu)"} />
			</MenuLink>

			<MenuLink
				icon={"icon-[solar--bomb-minimalistic-outline]"}
				to={"/$locale/apps/derivean/game/management/blueprint/$id/conflicts"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Blueprint conflicts (menu)"} />
			</MenuLink>
		</Menu>
	);
};
