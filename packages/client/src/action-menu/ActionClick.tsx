import type { ReactNode } from "@tanstack/react-router";
import { Icon } from "@use-pico/client";
import { isString } from "@use-pico/common";
import type { FC, HTMLAttributes } from "react";
import { ActionClickCss } from "./ActionClickCss";

export namespace ActionClick {
	export interface Props
		extends ActionClickCss.Props<HTMLAttributes<HTMLDivElement>> {
		icon?: string | ReactNode;
		iconProps?: Icon.Props;
	}
}

export const ActionClick: FC<ActionClick.Props> = ({
	icon,
	iconProps,
	variant,
	tva = ActionClickCss,
	css,
	children,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div
			className={tv.base()}
			{...props}
		>
			{isString(icon) ?
				<Icon
					icon={icon}
					{...iconProps}
				/>
			:	icon}
			{children}
		</div>
	);
};
