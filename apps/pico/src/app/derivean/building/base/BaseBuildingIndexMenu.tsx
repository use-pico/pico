import { useParams } from "@tanstack/react-router";
import { EditIcon, Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { StorageIcon } from "~/app/derivean/icon/StorageIcon";

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
				to={"/$locale/apps/derivean/root/building/base/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"View detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/root/building/base/$id/requirement/list"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Base building resource requirement (menu)"} />
			</MenuLink>

			<MenuLink
				icon={StorageIcon}
				to={"/$locale/apps/derivean/root/building/base/$id/limit/list"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Base building limit list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/root/building/base/$id/production"}
				params={{ locale, id: entity.id }}
				active={[
					{
						to: "/$locale/apps/derivean/root/building/base/$id/production/$productionId/requirement/list",
					},
				]}
			>
				<Tx label={"Base building production (menu)"} />
			</MenuLink>

			<MenuLink
				icon={EditIcon}
				to={"/$locale/apps/derivean/root/building/base/$id/edit"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Base building edit (menu)"} />
			</MenuLink>
		</Menu>
	);
};
