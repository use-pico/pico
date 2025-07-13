import { FloatingTree } from "@floating-ui/react";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Action } from "../action/Action";
import { Float } from "../float/Float";
import { ActionMenuIcon } from "../icon/ActionMenuIcon";
import type { Icon } from "../icon/Icon";
import { ActionMenuCls } from "./ActionMenuCls";

export namespace ActionMenu {
	export interface Props extends ActionMenuCls.Props<PropsWithChildren> {
		icon?: string;
		iconProps?: Omit<Icon.Props, "icon">;
		/**
		 * Override the default target element for the menu
		 */
		target?: ReactNode;
		actionProps?: Action.Props;
	}
}

export const ActionMenu: FC<ActionMenu.Props> = ({
	icon = ActionMenuIcon,
	iconProps,
	target,
	actionProps,
	children,
	variant,
	tva = ActionMenuCls,
	cls,
	...props
}) => {
	const { el } = tva(variant, cls);

	return (
		<FloatingTree>
			<Float
				action={"click"}
				target={
					target ?? (
						<Action
							iconEnabled={icon}
							iconProps={iconProps}
							variant={{
								borderless: true,
								variant: "light",
							}}
							{...actionProps}
						/>
					)
				}
				delay={100}
				float={{
					placement: "bottom-start",
				}}
				closeOnClick
				{...props}
			>
				<el.base.Div>{children}</el.base.Div>
			</Float>
		</FloatingTree>
	);
};
