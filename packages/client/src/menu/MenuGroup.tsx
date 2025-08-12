import {
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
import { useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren, ReactNode } from "react";
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

	return (
		<div className={slots.base()}>
			<div className={slots.label()}>
				{icon ? <Icon icon={icon} /> : null}
				{label}
			</div>

			<div className={slots.items()}>{children}</div>
		</div>
	);
};
