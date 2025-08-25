import { FloatingTree } from "@floating-ui/react";
import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Action } from "../action/Action";
import { Float } from "../float/Float";
import { ActionMenuIcon } from "../icon/ActionMenuIcon";
import type { Icon } from "../icon/Icon";
import { ActionMenuCls } from "./ActionMenuCls";

export namespace ActionMenu {
	export interface Props extends ActionMenuCls.Props<PropsWithChildren> {
		icon?: Icon.Type;
		iconProps?: Omit<Icon.Props, "icon">;
		/**
		 * Override the default target element for the menu
		 */
		target?: ReactNode;
		actionProps?: Action.Props;
		/**
		 * Whether to show an overlay backdrop when menu is open
		 */
		withOverlay?: boolean;
	}
}

export const ActionMenu: FC<ActionMenu.Props> = ({
	icon = ActionMenuIcon,
	iconProps,
	target,
	actionProps,
	children,
	tva = ActionMenuCls,
	cls,
	...props
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
		slot: what.slot({
			base: what.css([
				"relative",
			]),
		}),
	}));

	return (
		<FloatingTree>
			<Float
				action={"click"}
				target={
					target ?? (
						<Action
							iconEnabled={icon}
							iconProps={iconProps}
							cls={({ what }) => ({
								variant: what.variant({
									// borderless: true,
									tone: "subtle",
									theme: "light",
								}),
							})}
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
				<div className={slots.base()}>{children}</div>
			</Float>
		</FloatingTree>
	);
};
