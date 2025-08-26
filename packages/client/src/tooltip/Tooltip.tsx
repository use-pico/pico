import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren } from "react";
import { Float } from "../float/Float";
import { TooltipCls } from "./TooltipCls";

export namespace Tooltip {
	export interface Props extends TooltipCls.Props<PropsWithChildren> {
		target: Float.Target.TargetFn;
	}
}

export const Tooltip: FC<Tooltip.Props> = ({
	target,
	children,
	tva = TooltipCls,
	cls,
}) => {
	const slots = useCls(tva, cls);

	return (
		<Float
			action={"hover"}
			target={target}
		>
			<div className={slots.root()}>{children}</div>
		</Float>
	);
};
