import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Supply/Item";
import { SupplyIcon } from "~/app/derivean/icon/SupplyIcon";

export namespace SupplyPanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Supply {
		id: string;
		name: string;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		supply: Supply[];
	}
}

export const SupplyPanel: FC<SupplyPanel.Props> = ({
	building,
	supply,
	...props
}) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={SupplyIcon}
			textTitle={<Tx label={"Supply of (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: building.id }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/supply"}
						params={{ locale, mapId, buildingId: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
				</>
			}
			{...props}
		>
			{supply.length > 0 ?
				supply.map((item) => {
					return (
						<Item
							key={item.id}
							supply={item}
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
					<Tx label={"This building does not supply anything. (label)"} />
				</div>
			}
		</Panel>
	);
};
