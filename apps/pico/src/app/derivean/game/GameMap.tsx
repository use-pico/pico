import type { FC } from "react";
import type { MapSchema } from "~/app/derivean/game/GameMap/MapSchema";

export namespace GameMap {
	export interface Props {
		data: MapSchema.Type[];
		userId: string;
	}
}

export const GameMap: FC<GameMap.Props> = ({ data, userId }) => {
	return "map";
};
