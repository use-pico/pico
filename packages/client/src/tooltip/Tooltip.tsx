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
	variant,
	css,
	tva = TooltipCls,
}) => {
	const tv = tva({
		...variant,
		css,
	}).slots;

	return (
		<Float
			action={"hover"}
			target={target}
		>
			<div className={tv.base()}>{children}</div>
		</Float>
	);
};
