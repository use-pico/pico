import { createLink, type LinkComponent } from "@tanstack/react-router";
import { ActionLinkCss, Icon } from "@use-pico/client";
import { isString } from "@use-pico/common";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

interface Item
	extends ActionLinkCss.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	icon?: string | ReactNode;
	iconProps?: Icon.Props;
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

export const ActionLink: LinkComponent<typeof Item> = (props) => {
	return (
		<Link
			preload={"intent"}
			{...props}
		/>
	);
};
