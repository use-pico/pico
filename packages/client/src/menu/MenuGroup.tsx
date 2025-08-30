import type { Placement } from "@floating-ui/react";
import {
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
import { useCls, type VariantOf } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Float } from "../float/Float";
import { Icon } from "../icon/Icon";
import { MenuGroupCls } from "./MenuGroupCls";

export namespace MenuGroup {
	export interface Props extends MenuGroupCls.Props<PropsWithChildren> {
		icon?: Icon.Type;
		label: ReactNode;
		match?: UseMatchRouteOptions[];
		active?: boolean;
		type?: VariantOf<MenuGroupCls, "type">;
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
	placement = "bottom-start",
	vertical,
	tva = MenuGroupCls,
	cls,
	children,
}) => {
	const matchRoute = useMatchRoute();
	const isActive = match.some((options) => Boolean(matchRoute(options)));

	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			type,
			active: active ?? isActive,
			vertical,
		}),
	}));

	return (
		<Float
			target={(props) => (
				<div
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
			<div className={slots.items()}>{children}</div>
		</Float>
	);
};
