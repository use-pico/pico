import { tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import type { GameManager } from "~/app/derivean/game/manager/GameManager";
import { ProductionLine } from "~/app/derivean/game/manager/GameManager/ProductionLine";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export namespace BuildingItem {
	export interface Props extends Entity.Type<GameManager.Data> {
		userId: string;
		inventory: InventorySchema["~entity-array"];
	}
}

export const BuildingItem: FC<BuildingItem.Props> = ({
	entity,
	userId,
	inventory,
}) => {
	const isProductionLimit = entity.productionCount >= entity.productionLimit;

	return (
		<div className={tvc(["flex", "flex-col", "gap-2"])}>
			<div className={tvc(["flex", "flex-col", "gap-2"])}>
				{entity.production.map((production) => {
					return (
						<ProductionLine
							key={`production-${production.id}-${production.blueprintId}`}
							userId={userId}
							production={production}
							inventory={inventory}
							isProductionLimit={isProductionLimit}
						/>
					);
				})}
			</div>
		</div>
	);
};
