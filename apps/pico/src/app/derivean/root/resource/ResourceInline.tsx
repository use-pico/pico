import { Icon, More } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import type { ResourceRequirementSchema } from "~/app/derivean/resource/requirement/ResourceRequirementSchema";
import { ResourceInlineCss } from "~/app/derivean/root/resource/ResourceInlineCss";

export namespace RequirementsInline {
	export interface Props
		extends ResourceInlineCss.Props<
			More.PropsEx<ResourceRequirementSchema["~output"]>
		> {
		requirements: ResourceRequirementSchema["~output-array"];
		diff?: InventorySchema["~output-array"];
	}
}

export const RequirementsInline: FC<RequirementsInline.Props> = ({
	requirements,
	diff,
	variant,
	tva = ResourceInlineCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<More
			items={requirements}
			render={({ entity }) => {
				const resource = diff?.find((r) => r.resourceId === entity.resourceId);

				return (
					<div className={tv.item({ passive: entity.passive })}>
						<div>{entity.requirement.name}</div>
						<div className={"text-md font-bold text-slate-500"}>
							x{toHumanNumber({ number: entity.amount })}
						</div>
						{resource ?
							<>
								{resource.amount > 0 ?
									<div className={"text-sm text-red-500"}>
										(-{toHumanNumber({ number: resource.amount })})
									</div>
								:	<Icon
										icon={"icon-[charm--cross]"}
										css={{
											base: ["text-red-500"],
										}}
									/>
								}
							</>
						: diff ?
							<Icon
								icon={"icon-[pajamas--check-sm]"}
								css={{
									base: ["text-emerald-600"],
								}}
							/>
						:	null}
					</div>
				);
			}}
			{...props}
		/>
	);
};
