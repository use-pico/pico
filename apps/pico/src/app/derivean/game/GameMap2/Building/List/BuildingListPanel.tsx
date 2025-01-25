import { Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Building/List/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildingListPanel {
	export interface Building {
		id: string;
		name: string;
		landId: string;
		land: string;
	}

	export interface Props extends Panel.PropsEx {
		building: Building[];
	}
}

export const BuildingListPanel: FC<BuildingListPanel.Props> = ({
	building,
	...props
}) => {
	return (
		<Panel
			icon={BuildingIcon}
			textTitle={<Tx label={"Building list (label)"} />}
			{...props}
		>
			{building.length > 0 ?
				building.map((item) => {
					return (
						<Item
							key={item.id}
							building={item}
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
					<Tx label={"No buildings yet. (label)"} />
				</div>
			}
		</Panel>
	);
};
