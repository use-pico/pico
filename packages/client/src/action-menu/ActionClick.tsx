import { isString } from "@use-pico/common";
import type { FC, HTMLAttributes, ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
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
	tva = ActionClickCls,
	cls,
	children,
	...props
}) => {
	const classes = tva.create(cls, {
		variant: {
			loading,
		},
	});

	return (
		<div
			className={classes.base}
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
