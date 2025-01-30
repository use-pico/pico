import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Building/Link/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace LinkPanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Link {
		id: string;
		name: string;
		land: string;
		landId: string;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		link: Link[];
	}
}

export const LinkPanel: FC<LinkPanel.Props> = ({
	building,
	link,
	...props
}) => {
	const { locale, mapId } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={BuildingIcon}
			textTitle={<Tx label={"Building links (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: building.id }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/link"}
						params={{ locale, mapId, buildingId: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
				</>
			}
			{...props}
		>
			{link.length > 0 ?
				link.map((item) => {
					return (
						<Item
							key={item.id}
							building={building}
							link={item}
						/>
					);
				})
			:	<div
					className={tvc([
						"flex",
						"items-center",
						"justify-center",
						"rounded-sm",
						"border",
						"border-amber-400",
						"p-4",
						"bg-amber-200",
						"font-bold",
					])}
				>
					<Tx label={"No linked buildings. (label)"} />
				</div>
			}
		</Panel>
	);
};
