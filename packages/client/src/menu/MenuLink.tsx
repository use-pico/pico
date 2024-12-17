import {
    createLink,
    useMatchRoute,
    type LinkComponent,
    type UseMatchRouteOptions,
} from "@tanstack/react-router";
import { isString } from "@use-pico/common";
import { forwardRef, type PropsWithChildren, type ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { MenuLinkCss } from "./MenuLinkCss";

interface Item extends MenuLinkCss.Props<PropsWithChildren> {
	icon?: string | ReactNode;
	active?: UseMatchRouteOptions[];
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
	active = [],
	variant,
	...props
}) => {
	const match = useMatchRoute();
	const isActive = active.some((options) => Boolean(match(options)));

	return (
		<Link
			preload={"intent"}
			variant={{
				active:
					Boolean(
						match({
							to: props.to,
							params: props.params,
						} as any),
					) || isActive,
				...variant,
			}}
			{...props}
		/>
	);
};
