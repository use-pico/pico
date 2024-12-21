import { useParams } from "@tanstack/react-router";
import { EditIcon, Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

export namespace BlueprintIndexMenu {
	export interface Props extends Menu.Props, Entity.Schema<BlueprintSchema> {}
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
				to={"/$locale/apps/derivean/root/blueprint/$id/view"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Blueprint detail (menu)"} />
			</MenuLink>

			<MenuLink
				icon={EditIcon}
				to={"/$locale/apps/derivean/root/blueprint/$id/edit"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Blueprint edit (menu)"} />
			</MenuLink>
		</Menu>
	);
};
