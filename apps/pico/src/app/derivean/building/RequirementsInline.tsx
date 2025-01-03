import { More } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";

export namespace RequirementsInline {
	export interface Props {
		requirements: BaseBuildingRequirementSchema["~output-array"];
	}
}

export const RequirementsInline: FC<RequirementsInline.Props> = ({
	requirements,
}) => {
	return (
		<More
			items={requirements}
			render={({ entity }) => {
				return (
					<div
						className={tvc([
							"flex",
							"flex-row",
							"gap-2",
							"items-center",
							"bg-sky-100",
							"border",
							"rounded",
							"border-sky-300",
							"py-1",
							"px-2",
						])}
					>
						<div
							className={tvc(
								entity.passive ? "text-emerald-700" : "text-amber-700",
							)}
						>
							{entity.resource.name}
						</div>
						<div className={"text-sm font-bold text-slate-500"}>
							x{toHumanNumber({ number: entity.amount })}
						</div>
					</div>
				);
			}}
		/>
	);
};
