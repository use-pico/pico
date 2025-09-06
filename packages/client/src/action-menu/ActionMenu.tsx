import { FloatingTree, type Placement } from "@floating-ui/react";
import { useCls, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren } from "react";
import { Action } from "../action/Action";
import { Float } from "../float/Float";
import { ActionMenuIcon } from "../icon/ActionMenuIcon";
import type { Icon } from "../icon/Icon";
import { ActionMenuCls } from "./ActionMenuCls";

export namespace ActionMenu {
	export interface Props extends ActionMenuCls.Props<PropsWithChildren> {
		icon?: Icon.Type;
		iconProps?: Icon.PropsEx;
		/**
		 * Override the default target element for the menu
		 */
		target?: Float.Target.TargetFn;
		placement?: Placement;
		actionProps?: Action.Props;
		/**
		 * Whether to show an overlay backdrop when menu is open
		 */
		withOverlay?: boolean;
	}
}

export const BaseActionMenu: FC<ActionMenu.Props> = ({
	icon = ActionMenuIcon,
	iconProps,
	target,
	placement = "right-start",
	actionProps,
	children,
	cls = ActionMenuCls,
	tweak,
	...props
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
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
					target ??
					((props) => (
						<Action
							iconEnabled={icon}
							iconProps={iconProps}
							size={"sm"}
							tweak={({ what }) => ({
								variant: what.variant({
									border: true,
									tone: "neutral",
									theme: "light",
								}),
							})}
							{...actionProps}
							{...props}
						/>
					))
				}
				delay={100}
				float={{
					placement,
				}}
				closeOnClick
				{...props}
			>
				<div className={slots.base()}>{children}</div>
			</Float>
		</FloatingTree>
	);
};

export const ActionMenu = withCls(BaseActionMenu, ActionMenuCls);
