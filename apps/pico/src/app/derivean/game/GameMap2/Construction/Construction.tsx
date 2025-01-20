import { Tx } from "@use-pico/client";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Construction/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import type { ConstructionSchema } from "~/app/derivean/game/GameMap2/schema/ConstructionSchema";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";

export namespace Construction {
	export interface Props extends Panel.PropsEx {
		construction: ConstructionSchema.Type[];
	}
}

export const Construction: FC<Construction.Props> = ({
	construction,
	...props
}) => {
	return (
		<Panel
			icon={ConstructionIcon}
			textTitle={<Tx label={"Construction (label)"} />}
			{...props}
		>
			{construction.map((item) => {
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
