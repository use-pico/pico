import { Icon, More } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ResourceInlineCss } from "~/app/derivean/resource/ResourceInlineCss";

export namespace RequirementsInline {
	interface Data extends IdentitySchema.Type {
		name: string;
		resourceId: string;
		passive: boolean;
		amount: number;
	}

	interface Diff extends IdentitySchema.Type {
		resourceId: string;
		amount: number;
	}

	export interface Props extends ResourceInlineCss.Props<More.PropsEx<Data>> {
		requirements: Data[];
		diff?: Diff[];
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
						<div>{entity.name}</div>
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
