import type { FC, PropsWithChildren, ReactNode } from "react";
import { Float } from "../float/Float";
import { TooltipCls } from "./TooltipCls";

export namespace Tooltip {
	export interface Props extends TooltipCls.Props<PropsWithChildren> {
		target: ReactNode;
	}
}

export const Tooltip: FC<Tooltip.Props> = ({
	target,
	children,
	tva = TooltipCls,
	cls,
}) => {
	const classes = tva.create(cls);

	return (
		<Float
			action={"hover"}
			target={target}
		>
			<div className={classes.base}>{children}</div>
		</Float>
	);
};
