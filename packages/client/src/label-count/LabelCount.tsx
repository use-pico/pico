import { useCls } from "@use-pico/cls";
import { toHumanNumber } from "@use-pico/common";
import type { FC, ReactNode, Ref } from "react";
import { Badge } from "../badge/Badge";
import { LabelCountCls } from "./LabelCountCls";

export namespace LabelCount {
	export interface Props extends LabelCountCls.Props {
		ref?: Ref<HTMLDivElement>;
		label?: ReactNode;
		count?: number | null;
		badgeProps?: Badge.Props;
	}
}

export const LabelCount: FC<LabelCount.Props> = ({
	ref,
	label,
	count,
	badgeProps,
	cls = LabelCountCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak);

	return (
		<div
			data-ui="LabelCount-root"
			ref={ref}
			className={slots.root()}
		>
			<div
				data-ui="LabelCount-label"
				className={slots.label()}
			>
				{label}
			</div>
			<Badge
				{...badgeProps}
				tweak={{
					variant: {
						size: "xs",
						theme: "light",
						border: false,
					},
				}}
			>
				{toHumanNumber({
					number: count,
				})}
			</Badge>
		</div>
	);
};
