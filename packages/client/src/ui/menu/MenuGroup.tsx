import type { Placement } from "@floating-ui/react";
import {
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
import { type Cls, useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../../icon/Icon";
import { Float } from "../float/Float";
import { MenuGroupCls } from "./MenuGroupCls";

export namespace MenuGroup {
	export interface Props extends MenuGroupCls.Props<PropsWithChildren> {
		icon?: Icon.Type;
		label: ReactNode;
		match?: UseMatchRouteOptions[];
		active?: boolean;
		type?: Cls.VariantOf<MenuGroupCls, "type">;
		placement?: Placement;
		vertical?: boolean;
	}
}

export const MenuGroup: FC<MenuGroup.Props> = ({
	icon,
	label,
	match = [],
	active,
	type,
	vertical,
	placement = vertical ? "right-start" : "bottom-start",
	cls = MenuGroupCls,
	tweak,
	children,
}) => {
	const matchRoute = useMatchRoute();
	const isActive = match.some((options) => Boolean(matchRoute(options)));

	const { slots } = useCls(cls, tweak, {
		variant: {
			type,
			active: active ?? isActive,
			vertical,
		},
	});

	return (
		<Float
			target={(props) => (
				<div
					data-ui="MenuGroup-root"
					className={slots.root()}
					{...props}
				>
					<Icon
						icon={icon}
						size={"sm"}
					/>
					{label}
				</div>
			)}
			action="hover"
			delay={100}
			float={{
				placement,
			}}
		>
			<div
				data-ui="MenuGroup-items"
				className={slots.items()}
			>
				{children}
			</div>
		</Float>
	);
};
