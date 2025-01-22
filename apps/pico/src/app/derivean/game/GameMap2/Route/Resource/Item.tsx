import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { ResourcePanel } from "~/app/derivean/game/GameMap2/Route/Resource/ResourcePanel";

export namespace Item {
	export interface Props extends Entity.Type<ResourcePanel.Data> {
		//
	}
}

export const Item: FC<Item.Props> = ({ entity }) => {
	return <div>pica</div>;
};
