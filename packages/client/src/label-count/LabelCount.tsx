import type { ReactNode } from "@tanstack/react-router";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { Badge } from "../badge/Badge";
import { LabelCountCss } from "./LabelCountCss";

export namespace LabelCount {
	export interface Props extends LabelCountCss.Props {
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
	tva = LabelCountCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			<div className={tv.label()}>{label}</div>
			<Badge {...badgeProps}>{toHumanNumber({ number: count })}</Badge>
		</div>
	);
};
