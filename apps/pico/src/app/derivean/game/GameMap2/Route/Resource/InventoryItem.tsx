import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { BlueprintInventorySchema } from "~/app/derivean/game/GameMap2/schema/BlueprintInventorySchema";

export namespace InventoryItem {
	export interface Props extends Entity.Schema<BlueprintInventorySchema> {
		//
	}
}

export const InventoryItem: FC<InventoryItem.Props> = ({ entity }) => {
	return <div>hovno</div>;
};
