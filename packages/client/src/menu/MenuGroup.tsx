import {
	type ReactNode,
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
import type { FC, PropsWithChildren } from "react";
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
	variant,
	tva = MenuGroupCls,
	cls,
	children,
}) => {
	const matchRoute = useMatchRoute();
	const isActive = match.some((options) => Boolean(matchRoute(options)));

	const { slots } = tva(
		{
			active: isActive,
			...variant,
		},
		cls,
	);

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
