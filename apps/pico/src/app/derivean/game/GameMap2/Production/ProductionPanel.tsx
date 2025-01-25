import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Production/Item";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";

export namespace ProductionPanel {
	export interface Building {
		id: string;
		name: string;
		productionId?: string | null;
		recurringProductionId?: string | null;
	}

	export interface Production {
		id: string;
		name: string;
		amount: number;
		cycles: number;
		withAvailableResources: boolean;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		production: Production[];
	}
}

export const ProductionPanel: FC<ProductionPanel.Props> = ({
	building,
	production,
	...props
}) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={ProductionIcon}
			textTitle={<Tx label={"Building production (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: building.id }}
					/>
					<LinkTo
						to={
							"/$locale/apps/derivean/map/$mapId/building/$buildingId/production/list"
						}
						params={{ locale, mapId, buildingId: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
				</>
			}
			{...props}
		>
			{production.length > 0 ?
				production.map((item) => {
					return (
						<Item
							key={item.id}
							building={building}
							production={item}
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
					<Tx label={"This building does not produce anything. (label)"} />
				</div>
			}
		</Panel>
	);
};
