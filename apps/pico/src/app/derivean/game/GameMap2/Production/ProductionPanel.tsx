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
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Panel
			icon={ProductionIcon}
			textTitle={<Tx label={"Building production (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/building/$id/view"}
						params={{ locale, id: building.id }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/building/$id/production/list"}
						params={{ locale, id: building.id }}
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
						"rounded",
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
