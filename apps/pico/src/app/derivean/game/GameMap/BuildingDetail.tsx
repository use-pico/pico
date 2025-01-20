import { Icon } from "@use-pico/client";
import { type FC } from "react";
import { BuildingItem } from "~/app/derivean/game/GameMap/BuildingItem";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export namespace BuildingDetail {
	export interface Props {
		detail: MapSchema.Type;
		userId: string;
		inventory: InventorySchema["~entity-array"];
	}
}

export const BuildingDetail: FC<BuildingDetail.Props> = ({
	detail,
	userId,
	inventory,
}) => {
	return (
		<div className={"flex flex-col gap-2"}>
			<div className={"flex gap-2 items-center justify-between shadow-md p-4"}>
				<div className={"flex items-center gap-2 font-bold"}>
					<Icon
						icon={ProductionIcon}
						css={{ base: ["text-slate-400"] }}
					/>
					{detail.name}
				</div>
			</div>
			<div className={"max-h-full overflow-auto p-4 flex flex-col gap-4"}>
				<BuildingItem
					userId={userId}
					inventory={inventory}
					entity={detail}
				/>
			</div>
		</div>
	);
};
