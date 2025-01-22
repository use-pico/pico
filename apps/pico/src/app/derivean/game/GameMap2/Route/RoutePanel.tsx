import { useParams } from "@tanstack/react-router";
import { LinkTo, Tx } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";

export namespace RoutePanel {
	export interface Data {
		id: string;
		name: string;
	}

	export interface Props extends Panel.PropsEx, Entity.Type<Data> {
		//
	}
}

export const RoutePanel: FC<RoutePanel.Props> = ({ entity, ...props }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Panel
			icon={"icon-[gis--route-end]"}
			textTitle={<Tx label={"Routes (label)"} />}
			textSubTitle={
				<LinkTo
					to={"/$locale/apps/derivean/map/building/$id/routes"}
					params={{ locale, id: entity.id }}
					search={{ zoomToId: entity.id }}
				>
					{entity.name}
				</LinkTo>
			}
			{...props}
		>
			{/* {route.map((item) => {
				return (
					<Item
						key={item.id}
						entity={item}
					/>
				);
			})} */}
		</Panel>
	);
};
