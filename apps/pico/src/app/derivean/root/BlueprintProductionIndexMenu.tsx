import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { Entity, IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { RequirementIcon } from "~/app/derivean/icon/RequirementIcon";

export namespace BlueprintProductionIndexMenu {
	export interface Props extends Menu.Props, Entity.Schema<IdentitySchema> {
		//
	}
}

export const BlueprintProductionIndexMenu: FC<
	BlueprintProductionIndexMenu.Props
> = ({ entity, ...props }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={RequirementIcon}
				to={"/$locale/apps/derivean/root/blueprint/production/$id/requirements"}
				params={{ locale, id: entity.id }}
			>
				<Tx label={"Production requirements (menu)"} />
			</MenuLink>
		</Menu>
	);
};
