import {
	createLink,
	type LinkComponent,
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
import { useCls } from "@use-pico/cls";
import { isString } from "@use-pico/common";
import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { MenuLinkCls } from "./MenuLinkCls";

interface BaseMenuLinkProps
	extends MenuLinkCls.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	icon?: string | ReactNode;
	match?: UseMatchRouteOptions[];
	inner?: boolean;
	vertical?: boolean;
}

const BaseMenuLink = forwardRef<HTMLAnchorElement, BaseMenuLinkProps>(
	(
		{
			icon = null,
			inner = false,
			vertical = false,
			tva = MenuLinkCls,
			match = [],
			cls,
			children,
			...props
		},
		ref,
	) => {
		const matchRoute = useMatchRoute();
		const isActive = match.some((options) => Boolean(matchRoute(options)));

		const slots = useCls(tva, cls, ({ what }) => ({
			variant: what.variant({
				inner,
				vertical,
				active: isActive,
			}),
		}));

		return (
			<a
				{...props}
				className={slots.base()}
				ref={ref}
			>
				{isString(icon) ? <Icon icon={icon} /> : icon}
				{children}
			</a>
		);
	},
);

const CreateMenuLink = createLink(BaseMenuLink);

export const MenuLink: LinkComponent<typeof BaseMenuLink> = (props) => {
	return (
		<CreateMenuLink
			preload={"intent"}
			{...props}
		/>
	);
};
