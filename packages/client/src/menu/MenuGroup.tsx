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

	const target = (
		<div className={slots.root()}>
			{icon ? <Icon icon={icon} /> : null}
			{label}
		</div>
	);

	return (
		<Float
			target={target}
			action="hover"
			delay={100}
			float={{
				placement: "bottom-start",
			}}
		>
			<div className={slots.items()}>{children}</div>
		</Float>
	);
};
