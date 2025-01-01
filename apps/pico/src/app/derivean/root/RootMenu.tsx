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
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ItemIcon } from "~/app/derivean/icon/ItemIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { SlotIcon } from "~/app/derivean/icon/SlotIcon";

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
			>
				<Tx label={"User list (menu)"} />
			</MenuLink>

			<MenuGroup
				icon={BuildingIcon}
				label={<Tx label={"Buildings (menu)"} />}
				active={[
					{ to: "/$locale/apps/derivean/root/building/base/list" },
					{ to: "/$locale/apps/derivean/root/building/list" },
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

			<MenuLink
				icon={SlotIcon}
				to={"/$locale/apps/derivean/root/slot/list"}
				params={{ locale }}
			>
				<Tx label={"Slot list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ItemIcon}
				to={"/$locale/apps/derivean/root/item/list"}
				params={{ locale }}
			>
				<Tx label={"Item list (menu)"} />
			</MenuLink>

			<MenuLink
				icon={InventoryIcon}
				to={"/$locale/apps/derivean/root/inventory/list"}
				params={{ locale }}
			>
				<Tx label={"Inventory list (menu)"} />
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
