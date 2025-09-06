import {
	createLink,
	type LinkComponent,
	type UseMatchRouteOptions,
	useMatchRoute,
} from "@tanstack/react-router";
import { type Cls, useCls } from "@use-pico/cls";
import { type AnchorHTMLAttributes, forwardRef } from "react";
import { Icon } from "../icon/Icon";
import { MenuLinkCls } from "./MenuLinkCls";

interface BaseMenuLinkProps
	extends MenuLinkCls.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	icon?: Icon.Type;
	active?: boolean;
	match?: UseMatchRouteOptions[];
	variantType?: Cls.VariantOf<MenuLinkCls, "type">;
	vertical?: boolean;
}

const BaseMenuLink = forwardRef<HTMLAnchorElement, BaseMenuLinkProps>(
	(
		{
			icon,
			active,
			variantType,
			vertical,
			tva = MenuLinkCls,
			match = [],
			tweak,
			children,
			...props
		},
		ref,
	) => {
		const matchRoute = useMatchRoute();
		const isActive = match.some((options) => Boolean(matchRoute(options)));

		const slots = useCls(tva, tweak, ({ what }) => ({
			variant: what.variant({
				type: variantType,
				active: active ?? isActive,
				vertical,
			}),
		}));

		return (
			<a
				{...props}
				className={slots.root()}
				ref={ref}
			>
				<Icon
					icon={icon}
					size={"sm"}
				/>
				{children}
			</a>
		);
	},
);

const CreateMenuLink = createLink(BaseMenuLink);

export const MenuLink: LinkComponent<typeof BaseMenuLink> = ({
	match = [],
	...props
}) => {
	return (
		<CreateMenuLink
			preload={"intent"}
			/**
			 * No, don't look at this. This is very nice and elegant hack.
			 *
			 * Bleh.
			 *
			 * So, match defaults to "link" specified on MenuLink itself _and_ on
			 * eventual match user specifies. But thanks to overcomplicated types
			 * from TanStack Router, we've to use this kind of shit (but logically somehow safe).
			 */
			match={match.concat(props as any) as any}
			{...(props as any)}
		/>
	);
};
