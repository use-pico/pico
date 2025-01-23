import { Tx } from "@use-pico/client";
import type { FC } from "react";

export namespace InventoryTypeInline {
	export interface Props extends Tx.Props {
		//
	}
}

export const InventoryTypeInline: FC<InventoryTypeInline.Props> = ({
	label,
	...props
}) => {
	return (
		<Tx
			label={`Inventory type - ${label}`}
			{...props}
		/>
	);
};
