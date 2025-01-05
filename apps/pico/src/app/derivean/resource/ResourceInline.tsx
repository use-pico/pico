import { CheckIcon, Icon, More } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { ResourceInlineCss } from "~/app/derivean/resource/ResourceInlineCss";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

export namespace ResourceInline {
	export interface Resource {
		id: string;
		resourceId: string;
		resource: ResourceSchema["~output"];
		passive: boolean;
		amount: number;
	}

	export interface Props
		extends ResourceInlineCss.Props<More.PropsEx<Resource>> {
		resources: Resource[];
		diff?: Resource[];
	}
}

export const ResourceInline: FC<ResourceInline.Props> = ({
	resources,
	diff,
	variant,
	tva = ResourceInlineCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<More
			items={resources}
			render={({ entity }) => {
				const resource = diff?.find((r) => r.resourceId === entity.resourceId);

				return (
					<div className={tv.item({ passive: entity.passive })}>
						<div>{entity.resource.name}</div>
						<div className={"text-md font-bold text-slate-500"}>
							x{toHumanNumber({ number: entity.amount })}
						</div>
						{resource ?
							<div>
								<div className={"text-sm text-red-500"}>
									(-{toHumanNumber({ number: resource.amount })})
								</div>
							</div>
						: diff ?
							<Icon icon={CheckIcon} />
						:	null}
					</div>
				);
			}}
			{...props}
		/>
	);
};
