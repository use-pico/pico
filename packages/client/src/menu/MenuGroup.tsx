import {
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Float } from "../float/Float";
import { Icon } from "../icon/Icon";
import { MenuGroupCls } from "./MenuGroupCls";

export namespace MenuGroup {
	export interface Props extends MenuGroupCls.Props<PropsWithChildren> {
		icon?: string;
		label: ReactNode;
		match?: UseMatchRouteOptions[];
	}
}

export const MenuGroup: FC<MenuGroup.Props> = ({
	icon,
	label,
	match = [],
	tva = MenuGroupCls,
	cls,
	children,
}) => {
	const matchRoute = useMatchRoute();
	const isActive = match.some((options) => Boolean(matchRoute(options)));

	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			active: isActive,
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
