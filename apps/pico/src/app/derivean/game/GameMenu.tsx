import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";

export namespace GameMenu {
	export interface Props extends Menu.Props {
		//
	}
}

export const GameMenu: FC<GameMenu.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				to={"/$locale/apps/derivean/root"}
				params={{ locale }}
			>
				<Tx label={"Root site (menu)"} />
			</MenuLink>
		</Menu>
	);
};
