import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import type { RouteResourceSchema } from "~/app/derivean/game/GameMap2/schema/RouteResourceSchema";

export namespace Item {
	export interface Props extends Entity.Schema<RouteResourceSchema> {
		//
	}
}

export const Item: FC<Item.Props> = ({ entity }) => {
	return <div>pica</div>;
};
