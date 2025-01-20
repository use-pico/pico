import { Badge } from "@use-pico/client";
import { tvc, type Entity } from "@use-pico/common";
import type { FC } from "react";
import type { ConstructionSchema } from "~/app/derivean/game/GameMap2/schema/ConstructionSchema";

export namespace Item {
	export interface Props extends Entity.Schema<ConstructionSchema> {
		//
	}
}

export const Item: FC<Item.Props> = ({ entity }) => {
	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-2",
				"rounded-md",
				"border",
				"border-slate-300",
				"p-2",
				"cursor-default",
				"hover:bg-slate-100",
			])}
		>
			<div className={"flex flex-row gap-2 items-center"}>
				<Badge>x{entity.count}</Badge>
				<div className={"font-bold"}>{entity.name}</div>
			</div>
		</div>
	);
};
