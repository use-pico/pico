import { FloatingTree } from "@floating-ui/react";
import type { ReactNode } from "@tanstack/react-router";
import type { FC, PropsWithChildren } from "react";
import { Float } from "../float/Float";
import { ActionMenuIcon } from "../icon/ActionMenuIcon";
import { Icon } from "../icon/Icon";
import { ActionMenuCss } from "./ActionMenuCss";

export namespace ActionMenu {
	export interface Props extends ActionMenuCss.Props<PropsWithChildren> {
		icon?: string | ReactNode;
		iconProps?: Omit<Icon.Props, "icon">;
	}
}

export const ActionMenu: FC<ActionMenu.Props> = ({
	icon = ActionMenuIcon,
	iconProps,
	children,
	variant,
	tva = ActionMenuCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<FloatingTree>
			<Float
				action={"click"}
				target={
					<Icon
						icon={icon}
						css={{
							base: ["cursor-pointer"],
						}}
						{...iconProps}
					/>
				}
				delay={100}
				float={{
					placement: "bottom-start",
				}}
				closeOnClick
				{...props}
			>
				<div className={tv.base()}>{children}</div>
			</Float>
		</FloatingTree>
	);
};
