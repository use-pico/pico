import { More } from "@use-pico/client";
import {
    toHumanNumber,
    tvc,
    type withRepositorySchema,
} from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";

export namespace RequirementsInline {
	export interface Props {
		requirements: withRepositorySchema.Output<BaseBuildingRequirementSchema>[];
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
					<div className={"flex flex-row gap-2 items-center"}>
						<div
							className={tvc("font-light", !entity.passive && "text-amber-700")}
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
