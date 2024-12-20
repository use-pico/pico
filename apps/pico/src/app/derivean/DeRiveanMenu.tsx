import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { KingdomIcon } from "~/app/derivean/icon/KingdomIcon";

export namespace DeRiveanMenu {
	export interface Props extends Menu.Props {
		//
	}
}

export const DeRiveanMenu: FC<DeRiveanMenu.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={KingdomIcon}
				to={"/$locale/apps/derivean/kingdom/list"}
				params={{ locale }}
			>
				<Tx label={"Kingdom list (menu)"} />
			</MenuLink>
		</Menu>
	);
};
