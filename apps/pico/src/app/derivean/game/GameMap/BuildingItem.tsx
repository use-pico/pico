import { Tx } from "@use-pico/client";
import { tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import type { GameManager } from "~/app/derivean/game/manager/GameManager";
import { ProductionLine } from "~/app/derivean/game/manager/GameManager/ProductionLine";
import type { InventorySchema } from "~/app/derivean/schema/InventorySchema";

export namespace BuildingItem {
	export interface Props extends Entity.Type<GameManager.Data> {
		userId: string;
		inventory: InventorySchema["~entity-array"];
		productionOf?: string[];
		availableResourceIds?: string[];
	}
}

export const BuildingItem: FC<BuildingItem.Props> = ({
	entity,
	userId,
	inventory,
	productionOf,
	availableResourceIds,
}) => {
	const isProductionLimit = entity.productionCount >= entity.productionLimit;

	const availableProduction = entity.production.filter((production) => {
		if (productionOf && !productionOf.includes(production.resourceId)) {
			return false;
		}
		if (
			availableResourceIds &&
			!availableResourceIds.includes(production.resourceId)
		) {
			return false;
		}

		return true;
	});

	return (
		<div className={tvc(["flex", "flex-col", "gap-2"])}>
			<div className={tvc(["flex", "flex-col", "gap-2"])}>
				{availableProduction.length > 0 ?
					availableProduction.map((production) => {
						return (
							<ProductionLine
								key={`production-${production.id}-${production.blueprintId}`}
								userId={userId}
								production={production}
								inventory={inventory}
								isProductionLimit={isProductionLimit}
							/>
						);
					})
				:	<Tx label={"No production currently available (label)"} />}
			</div>
		</div>
	);
};
