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
	variant,
	tva = LabelCountCls,
	cls,
}) => {
	const { slots } = tva(variant, cls);

	return (
		<div className={slots.base()}>
			<div className={slots.label()}>{label}</div>
			<Badge
				{...badgeProps}
				variant={{
					size: "xs",
					variant: "light",
					borderless: true,
				}}
			>
				{toHumanNumber({
					number: count,
				})}
			</Badge>
		</div>
	);
};
