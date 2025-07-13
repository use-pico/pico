import {
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
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
	variant,
	tva = MenuGroupCls,
	cls,
	children,
}) => {
	const matchRoute = useMatchRoute();
	const isActive = match.some((options) => Boolean(matchRoute(options)));

	const { el } = tva(
		{
			active: isActive,
			...variant,
		},
		cls,
	);

	return (
		<el.base.Div>
			<el.label.Div>
				{icon ? <Icon icon={icon} /> : null}
				{label}
			</el.label.Div>

			<el.items.Div>{children}</el.items.Div>
		</el.base.Div>
	);
};
