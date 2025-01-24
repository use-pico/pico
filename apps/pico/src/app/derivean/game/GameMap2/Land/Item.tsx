import { tvc } from "@use-pico/common";
import type { FC } from "react";
import type { LandPanel } from "~/app/derivean/game/GameMap2/Land/LandPanel";

export namespace Item {
	export interface Props {
		land: LandPanel.Land;
	}
}

export const Item: FC<Item.Props> = ({ land }) => {
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
			<div className={"flex flex-row items-center justify-between"}>
				<div className={"font-bold"}>{land.name}</div>
			</div>
		</div>
	);
};
