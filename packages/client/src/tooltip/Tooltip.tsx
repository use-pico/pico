import type { FC, PropsWithChildren, ReactNode } from "react";
import { Float } from "../float/Float";
import { TooltipCss } from "./TooltipCss";

export namespace Tooltip {
	export interface Props extends TooltipCss.Props<PropsWithChildren> {
		target: ReactNode;
	}
}

export const Tooltip: FC<Tooltip.Props> = ({
	target,
	children,
	variant,
	css,
	tva = TooltipCss,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<Float
			action={"hover"}
			target={target}
		>
			<div className={tv.base()}>{children}</div>
		</Float>
	);
};
