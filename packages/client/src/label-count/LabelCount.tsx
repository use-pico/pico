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
	cls,
}) => {
	const classes = tva.create(cls);

	return (
		<div className={classes.base}>
			<div className={classes.label}>{label}</div>
			<Badge
				{...badgeProps}
				cls={{
					variant: {
						size: "xs",
						variant: "light",
						borderless: true,
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
