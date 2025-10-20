import { FloatingTree, type Placement } from "@floating-ui/react";
import { useCls } from "@use-pico/cls";
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

export const ActionMenu: FC<ActionMenu.Props> = ({
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
	const { slots } = useCls(cls, tweak, {
		slot: {
			root: {
				class: [
					"relative",
				],
			},
		},
	});

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
							tweak={{
								variant: {
									border: true,
									tone: "neutral",
									theme: "light",
								},
							}}
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
				<div
					data-ui="ActionMenu-root"
					className={slots.root()}
				>
					{children}
				</div>
			</Float>
		</FloatingTree>
	);
};
