import type { ReactNode } from "@tanstack/react-router";
import { Icon, LoaderIcon } from "@use-pico/client";
import { isString } from "@use-pico/common";
import type { FC, HTMLAttributes } from "react";
import { ActionClickCls } from "./ActionClickCls";

export namespace ActionClick {
	export interface Props
		extends ActionClickCls.Props<HTMLAttributes<HTMLDivElement>> {
		icon?: string | ReactNode;
		iconProps?: Icon.Props;
		loading?: boolean;
	}
}

export const ActionClick: FC<ActionClick.Props> = ({
	icon,
	iconProps,
	loading = false,
	variant,
	tva = ActionClickCls,
	css,
	children,
	...props
}) => {
	const { slots } = tva({
		...variant,
		css,
	});

	return (
		<div
			className={slots.base({
				loading,
			})}
			{...props}
		>
			{isString(icon) ? (
				<Icon
					icon={loading ? LoaderIcon : icon}
					{...iconProps}
				/>
			) : (
				icon
			)}
			{children}
		</div>
	);
};
