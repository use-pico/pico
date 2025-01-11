import { useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import type { FC } from "react";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace ProductionIndexMenu {
	export interface Props extends Menu.Props {
		//
	}
}

export const ProductionIndexMenu: FC<ProductionIndexMenu.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Menu {...props}>
			<MenuLink
				icon={ProductionIcon}
				to={"/$locale/apps/derivean/game/building/production/resource/list"}
				params={{ locale }}
			>
				<Tx label={"Resource production (menu)"} />
			</MenuLink>

			<MenuLink
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/game/building/production/resource/queue"}
				params={{ locale }}
			>
				<Tx label={"Resources queue (menu)"} />
			</MenuLink>
		</Menu>
	);
};
