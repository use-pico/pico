import {
    createLink,
    useMatchRoute,
    type LinkComponent,
    type UseMatchRouteOptions,
} from "@tanstack/react-router";
import { Icon } from "@use-pico/client";
import { isString } from "@use-pico/common";
import { forwardRef, type PropsWithChildren, type ReactNode } from "react";
import { ActionLinkCss } from "./ActionLinkCss";

interface Item extends ActionLinkCss.Props<PropsWithChildren> {
	icon?: string | ReactNode;
	iconProps?: Icon.Props;
	active?: UseMatchRouteOptions[];
}

const Item = forwardRef<HTMLAnchorElement, Item>(
	(
		{
			icon = null,
			iconProps,
			variant,
			tva = ActionLinkCss,
			css,
			children,
			...props
		},
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
					<Icon
						icon={icon}
						{...iconProps}
					/>
				:	icon}
				{children}
			</a>
		);
	},
);

const Link = createLink(Item);

export const ActionLink: LinkComponent<typeof Item> = ({
	active = [],
	variant,
	...props
}) => {
	const match = useMatchRoute();

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
					) || active.some((options) => Boolean(match(options))),
				...variant,
			}}
			{...props}
		/>
	);
};
