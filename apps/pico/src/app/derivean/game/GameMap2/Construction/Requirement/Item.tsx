import { Progress } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { RequirementPanel } from "~/app/derivean/game/GameMap2/Construction/Requirement/RequirementPanel";

export namespace Item {
	export interface Props {
		requirement: RequirementPanel.Requirement;
	}
}

export const Item: FC<Item.Props> = ({ requirement }) => {
	const available = requirement.available || 0;

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
				requirement.amount > available ?
					[
						"border-red-400",
						"bg-red-50",
						"hover:border-red-600",
						"hover:bg-red-50",
					]
				:	undefined,
			])}
		>
			<div className={"flex flex-row items-center justify-between"}>
				<div className={"font-bold"}>{requirement.name}</div>

				<div className={"flex flex-row gap-1 items-center"}>
					<div>{toHumanNumber({ number: available })}</div>
					<div>/</div>
					<div className={"font-bold"}>
						{toHumanNumber({ number: requirement.amount })}
					</div>
				</div>
			</div>

			<Progress value={(100 * available) / requirement.amount} />
		</div>
	);
};
