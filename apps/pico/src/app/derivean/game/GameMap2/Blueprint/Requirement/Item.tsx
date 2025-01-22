import { Badge } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { RequirementPanel } from "~/app/derivean/game/GameMap2/Production/Requirement/RequirementPanel";

export namespace Item {
	export interface Props {
		requirement: RequirementPanel.Requirement;
	}
}

export const Item: FC<Item.Props> = ({ requirement }) => {
	return (
		<div
			className={tvc([
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
				"justify-between",
				"border",
				"p-4",
				"rounded",
				"border-slate-200",
				"hover:border-slate-300",
				"hover:bg-slate-100",
				requirement.passive ?
					[
						"border-purple-300",
						"hover:border-purple-500",
						"hover:bg-purple-100",
					]
				:	undefined,
			])}
		>
			<div className={"font-bold"}>{requirement.name}</div>
			<Badge>x{toHumanNumber({ number: requirement.amount })}</Badge>
		</div>
	);
};
