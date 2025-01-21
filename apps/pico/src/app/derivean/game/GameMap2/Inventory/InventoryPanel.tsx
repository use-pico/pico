import { Fulltext, Tx } from "@use-pico/client";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Inventory/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import type { InventorySchema } from "~/app/derivean/game/GameMap2/schema/InventorySchema";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";

export namespace InventoryPanel {
	export interface Props extends Panel.PropsEx {
		inventory: InventorySchema.Type[];
		fulltextProps: Fulltext.Props;
	}
}

export const InventoryPanel: FC<InventoryPanel.Props> = ({
	inventory,
	fulltextProps,
	...props
}) => {
	return (
		<Panel
			icon={InventoryIcon}
			textTitle={<Tx label={"Inventory (label)"} />}
			{...props}
		>
			<Fulltext {...fulltextProps} />
			{inventory.map((item) => {
				return (
					<Item
						key={item.id}
						entity={item}
					/>
				);
			})}
		</Panel>
	);
};
