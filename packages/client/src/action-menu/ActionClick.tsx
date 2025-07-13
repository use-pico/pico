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
	variant,
	tva = ActionClickCls,
	cls,
	children,
	...props
}) => {
	const { el } = tva(variant, cls);

	return (
		<el.base.Div
			variant={{
				loading,
			}}
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
		</el.base.Div>
	);
};
