import { Badge, Icon, More } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import { Building_Production_InlineCss } from "~/app/derivean/root/building/Building_Production_InlineCss";

export namespace Building_Production_Inline {
	interface Data extends IdentitySchema.Type {
		name: string;
		amount: number;
		cycles: number;
		limit: number;
	}

	export interface Props
		extends Building_Production_InlineCss.Props<More.PropsEx<Data>> {
		productions: Data[];
	}
}

export const Building_Production_Inline: FC<
	Building_Production_Inline.Props
> = ({
	productions,
	variant,
	tva = Building_Production_InlineCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<More
			items={productions}
			css={{
				base: ["flex", "flex-col", "gap-2", "w-fit", "items-start"],
			}}
			render={({ entity }) => {
				return (
					<div className={tv.item()}>
						<div>{entity.name}</div>
						<Badge
							css={{
								base: [
									"bg-emerald-100",
									"border-emerald-400",
									"text-emerald-600",
								],
							}}
						>
							<Icon icon={"icon-[charm--cross]"} />
							{toHumanNumber({ number: entity.amount })}
						</Badge>
						<Badge
							css={{
								base: ["bg-purple-100", "border-purple-400", "text-purple-600"],
							}}
						>
							<Icon icon={CycleIcon} />
							{toHumanNumber({ number: entity.cycles })}
						</Badge>
						<Badge
							css={{
								base: ["bg-amber-100", "border-amber-400", "text-amber-600"],
							}}
						>
							<Icon icon={"icon-[hugeicons--limitation]"} />
							{toHumanNumber({ number: entity.limit })}
						</Badge>
					</div>
				);
			}}
			{...props}
		/>
	);
};
