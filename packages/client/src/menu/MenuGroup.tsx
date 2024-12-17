import {
	useMatchRoute,
	type ReactNode,
	type UseMatchRouteOptions,
} from "@tanstack/react-router";
import type { FC, PropsWithChildren } from "react";
import { Icon } from "../icon/Icon";
import { MenuGroupCss } from "./MenuGroupCss";

export namespace MenuGroup {
	export interface Props extends MenuGroupCss.Props<PropsWithChildren> {
		icon?: string;
		label: ReactNode;
		active?: UseMatchRouteOptions[];
	}
}

export const MenuGroup: FC<MenuGroup.Props> = ({
	icon,
	label,
	active = [],
	variant,
	tva = MenuGroupCss,
	css,
	children,
}) => {
	const match = useMatchRoute();
	const isActive = active.some((options) => Boolean(match(options)));

	const tv = tva({ active: isActive, ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			<div className={tv.label()}>
				{icon ?
					<Icon icon={icon} />
				:	null}
				{label}
			</div>

			<div className={tv.items()}>{children}</div>
		</div>
	);
};
