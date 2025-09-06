import { useCls } from "@use-pico/cls";
import { toHumanNumber } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { Badge } from "../badge/Badge";
import { LabelCountCls } from "./LabelCountCls";

export namespace LabelCount {
	export interface Props extends LabelCountCls.Props {
		label?: ReactNode;
		count?: number | null;
		badgeProps?: Badge.Props;
	}
}

export const LabelCount: FC<LabelCount.Props> = ({
	label,
	count,
	badgeProps,
	tva = LabelCountCls,
	tweak,
}) => {
	const slots = useCls(tva, tweak);

	return (
		<div className={slots.root()}>
			<div className={slots.label()}>{label}</div>
			<Badge
				{...badgeProps}
				tweak={({ what }) => ({
					variant: what.variant({
						size: "xs",
						theme: "light",
						border: false,
					}),
				})}
			>
				{toHumanNumber({
					number: count,
				})}
			</Badge>
		</div>
	);
};
