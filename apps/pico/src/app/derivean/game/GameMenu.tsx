import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

export namespace GameMenu {
	export interface Props extends Menu.Props {
		//
	}
}

export const GameMenu: FC<GameMenu.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink icon={BlueprintIcon}>
				<Tx label={"[Dummy] (menu)"} />
			</MenuLink>
		</Menu>
	);
};
