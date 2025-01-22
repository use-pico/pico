import type { Entity } from "@use-pico/common";
import type { FC } from "react";

export namespace InventoryItem {
	export interface Props extends Entity.Schema<any> {
		//
	}
}

export const InventoryItem: FC<InventoryItem.Props> = ({ entity }) => {
	return <div>hovno</div>;
};
