import { useParams } from "@tanstack/react-router";
import { EditIcon, Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace BuildingBaseIndexMenu {
	export interface Props
		extends Menu.Props,
			Entity.Type<BuildingBaseSchema["~output"]> {
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
				icon={EditIcon}
				to={"/$locale/apps/derivean/root/building/base/$id/edit"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Edit (menu)"} />
			</MenuLink>
		</Menu>
	);
};
