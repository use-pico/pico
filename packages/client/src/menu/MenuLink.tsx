import {
	createLink,
	type LinkComponent,
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
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
	(
		{ icon = null, variant, tva = MenuLinkCls, css, children, ...props },
		ref,
	) => {
		const { slots } = tva({
			...variant,
			css,
		});

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

const Link = createLink(Item);

export const MenuLink: LinkComponent<typeof Item> = ({
	match = [],
	variant,
	tva = MenuLinkCls,
	css,
	...props
}) => {
	const matchRoute = useMatchRoute();
	const isActive = match.some((options) => Boolean(matchRoute(options)));

	return (
		<Link
			preload={"intent"}
			variant={{
				active:
					Boolean(
						matchRoute({
							to: props.to as string,
							params: props.params,
						}),
					) || isActive,
				...variant,
			}}
			tva={tva}
			css={css}
			/**
			 * TODO Another fuckin' any, kill it!
			 */
			{...(props as any)}
		/>
	);
};
