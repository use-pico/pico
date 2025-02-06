import { useParams } from "@tanstack/react-router";
import { BackIcon, Fulltext, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Inventory/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";

export namespace InventoryPanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Inventory {
		id: string;
		buildingId: string;
		resourceId: string;
		supplyId?: string | null;
		demandId?: string | null;
		name: string;
		limit: number;
		amount: number;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		userId: string;
		inventory: Inventory[];
		fulltextProps: Fulltext.Props;
	}
}

export const InventoryPanel: FC<InventoryPanel.Props> = ({
	building,
	userId,
	inventory,
	fulltextProps,
	...props
}) => {
	const { locale, mapId } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={InventoryIcon}
			textTitle={<Tx label={"Inventory (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
						params={{ locale, mapId, buildingId: building.id }}
					/>
					<LinkTo
						to={
							"/$locale/apps/derivean/map/$mapId/building/$buildingId/inventory"
						}
						params={{ locale, mapId, buildingId: building.id }}
						// search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
				</>
			}
			{...props}
		>
			<Fulltext {...fulltextProps} />

			<div>
				<Tx
					label={"Inventory - storage (label)"}
					css={{ base: ["font-bold", "text-slate-500"] }}
				/>
			</div>
			{inventory.length > 0 ?
				inventory.map((item) => {
					return (
						<Item
							key={item.id}
							mapId={mapId}
							userId={userId}
							inventory={item}
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
					<Tx label={"No inventory storage. (label)"} />
				</div>
			}
		</Panel>
	);
};
