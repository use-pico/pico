import { Tx } from "@use-pico/client";
import { tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";
import { ProductionLine } from "~/app/derivean/game/manager/GameManager/ProductionLine";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export namespace BuildingItem {
	export interface Props extends Entity.Type<MapSchema.Type> {
		userId: string;
		inventory: InventorySchema["~entity-array"];
	}
}

export const BuildingItem: FC<BuildingItem.Props> = ({
	entity,
	userId,
	inventory,
}) => {
	// const availableProduction = entity.production.filter((production) => {
	// 	if (productionOf && !productionOf.includes(production.resourceId)) {
	// 		return false;
	// 	}
	// 	if (
	// 		availableResourceIds &&
	// 		!availableResourceIds.includes(production.resourceId)
	// 	) {
	// 		return false;
	// 	}

	// 	return true;
	// });

	return (
		<div className={tvc(["flex", "flex-col", "gap-2"])}>
			<div className={tvc(["flex", "flex-col", "gap-2"])}>
				{entity.production.length > 0 ?
					entity.production.map((production) => {
						return (
							<ProductionLine
								entity={entity}
								key={`production-${production.id}-${production.blueprintId}`}
								userId={userId}
								production={production}
								inventory={inventory}
							/>
						);
					})
				:	<Tx label={"No production currently available (label)"} />}
			</div>
		</div>
	);
};
