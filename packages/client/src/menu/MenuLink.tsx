import {
	createLink,
	useMatchRoute,
	type LinkComponent,
	type UseMatchRouteOptions,
} from "@tanstack/react-router";
import { isString } from "@use-pico/common";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { MenuLinkCss } from "./MenuLinkCss";

interface Item
	extends MenuLinkCss.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	icon?: string | ReactNode;
	match?: UseMatchRouteOptions[];
}

const Item = forwardRef<HTMLAnchorElement, Item>(
	(
		{ icon = null, variant, tva = MenuLinkCss, css, children, ...props },
		ref,
	) => {
		const tv = tva({ ...variant, css }).slots;

		return (
			<a
				{...props}
				className={tv.base()}
				ref={ref}
			>
				{isString(icon) ?
					<Icon icon={icon} />
				:	icon}
				{children}
			</a>
		);
	},
);

const Link = createLink(Item);

export const MenuLink: LinkComponent<typeof Item> = ({
	match = [],
	variant,
	tva = MenuLinkCss,
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
