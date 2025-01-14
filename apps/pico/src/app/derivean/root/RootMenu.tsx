import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, TagIcon, Tx, UserIcon } from "@use-pico/client";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace RootMenu {
	export interface Props extends Menu.Props {
		//
	}
}

export const RootMenu: FC<RootMenu.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={UserIcon}
				to={"/$locale/apps/derivean/root/user/list"}
				params={{ locale }}
				active={[
					{ to: "/$locale/apps/derivean/root/user/$id/view" },
					{ to: "/$locale/apps/derivean/root/user/$id/building/list" },
				]}
			>
				<Tx label={"User list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={BuildingIcon}
				to={"/$locale/apps/derivean/root/blueprint/list"}
				params={{ locale }}
				active={[
					{ to: "/$locale/apps/derivean/root/blueprint/$id/view" },
					{ to: "/$locale/apps/derivean/root/blueprint/$id/dependencies" },
					{ to: "/$locale/apps/derivean/root/blueprint/$id/production" },
					{ to: "/$locale/apps/derivean/root/blueprint/$id/requirements" },
					{ to: "/$locale/apps/derivean/root/blueprint/$id/edit" },
					{
						to: "/$locale/apps/derivean/root/blueprint/production/$id/requirements",
					},
				]}
			>
				<Tx label={"Blueprint list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={"icon-[ph--graph-light]"}
				to={"/$locale/apps/derivean/root/blueprint/graph"}
				params={{ locale }}
			>
				<Tx label={"Blueprint graph (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/root/resource/list"}
				params={{ locale }}
			>
				<Tx label={"Resource list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/root/default/inventory"}
				params={{ locale }}
			>
				<Tx label={"Default inventory (menu)"} />
			</MenuLink>

			<MenuLink
				icon={TagIcon}
				to={"/$locale/apps/derivean/root/tag/list"}
				params={{ locale }}
			>
				<Tx label={"Tag list (menu)"} />
			</MenuLink>
		</Menu>
	);
};
