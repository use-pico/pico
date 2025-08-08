import {
	createLink,
	type LinkComponent,
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
import { merge } from "@use-pico/cls";
import { isString } from "@use-pico/common";
import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { MenuLinkCls } from "./MenuLinkCls";

interface Item
	extends MenuLinkCls.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	icon?: string | ReactNode;
	match?: UseMatchRouteOptions[];
}

const Item = forwardRef<HTMLAnchorElement, Item>(
	({ icon = null, tva = MenuLinkCls, cls, children, ...props }, ref) => {
		const classes = tva.create(cls);

		return (
			<a
				{...props}
				className={classes.base}
				ref={ref}
			>
				{isString(icon) ? <Icon icon={icon} /> : icon}
				{children}
			</a>
		);
	},
);

const Link = createLink(Item);

export const MenuLink: LinkComponent<typeof Item> = ({
	match = [],
	tva = MenuLinkCls,
	cls,
	...props
}) => {
	const matchRoute = useMatchRoute();
	const isActive = match.some((options) => Boolean(matchRoute(options)));

	return (
		<Link
			preload={"intent"}
			tva={tva}
			cls={merge(cls, {
				variant: {
					active:
						Boolean(
							matchRoute({
								to: props.to as string,
								params: props.params,
							}),
						) || isActive,
				},
			})}
			/**
			 * TODO Another fuckin' any, kill it!
			 */
			{...(props as any)}
		/>
	);
};
