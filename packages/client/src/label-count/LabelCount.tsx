import type { ReactNode } from "@tanstack/react-router";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
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
	css,
}) => {
	const { slots } = tva({
		...variant,
		css,
	});

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
