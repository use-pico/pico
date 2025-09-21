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
	cls = TooltipCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak);

	return (
		<Float
			action={"hover"}
			target={target}
		>
			<div
				data-ui="Tooltip-root"
				className={slots.root()}
			>
				{children}
			</div>
		</Float>
	);
};
