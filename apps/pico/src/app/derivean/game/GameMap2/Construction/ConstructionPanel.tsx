import { Tx } from "@use-pico/client";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Construction/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import type { BlueprintSchema } from "~/app/derivean/game/GameMap2/schema/BlueprintSchema";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";

export namespace ConstructionPanel {
	export interface Props extends Panel.PropsEx {
		userId: string;
		blueprints: BlueprintSchema.Type[];
	}
}

export const ConstructionPanel: FC<ConstructionPanel.Props> = ({
	userId,
	blueprints,
	...props
}) => {
	return (
		<Panel
			icon={ConstructionIcon}
			textTitle={<Tx label={"Construction (label)"} />}
			{...props}
		>
			{blueprints.map((item) => {
				return (
					<Item
						key={item.id}
						userId={userId}
						entity={item}
					/>
				);
			})}
		</Panel>
	);
};
