import { useParams } from "@tanstack/react-router";
import {
    Menu,
    MenuGroup,
    MenuLink,
    SettingsIcon,
    TagIcon,
    Tx,
    UserIcon,
} from "@use-pico/client";
import type { FC } from "react";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
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

			<MenuGroup
				icon={BuildingIcon}
				label={<Tx label={"Buildings (menu)"} />}
				active={[
					{ to: "/$locale/apps/derivean/root/building/base/list" },
					{ to: "/$locale/apps/derivean/root/building/list" },
					{ to: "/$locale/apps/derivean/root/building/$id/view" },
					{ to: "/$locale/apps/derivean/root/building/base/$id/view" },
					{
						to: "/$locale/apps/derivean/root/building/base/$id/requirement/list",
					},
					{
						to: "/$locale/apps/derivean/root/building/base/$id/limit/list",
					},
					{
						to: "/$locale/apps/derivean/root/building/base/$id/edit",
					},
					{
						to: "/$locale/apps/derivean/root/building/$id/resource/list",
					},
					{
						to: "/$locale/apps/derivean/root/building/base/$id/resource/list",
					},
				]}
			>
				<MenuLink
					icon={BaseBuildingIcon}
					to={"/$locale/apps/derivean/root/building/base/list"}
					params={{ locale }}
					variant={{ inner: true }}
				>
					<Tx label={"Base building list (menu)"} />
				</MenuLink>

				<MenuLink
					icon={BuildingIcon}
					to={"/$locale/apps/derivean/root/building/list"}
					params={{ locale }}
					variant={{ inner: true }}
				>
					<Tx label={"Building list (menu)"} />
				</MenuLink>
			</MenuGroup>

			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/root/resource/list"}
				params={{ locale }}
			>
				<Tx label={"Resource list (menu)"} />
			</MenuLink>

			<MenuGroup
				icon={SettingsIcon}
				label={<Tx label={"Settings (menu)"} />}
			>
				<MenuLink
					icon={TagIcon}
					to={"/$locale/apps/derivean/root/tag/list"}
					params={{ locale }}
					variant={{ inner: true }}
				>
					<Tx label={"Tag list (menu)"} />
				</MenuLink>
			</MenuGroup>
		</Menu>
	);
};
