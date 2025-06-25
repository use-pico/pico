import { createLink, type LinkComponent } from "@tanstack/react-router";
import { Icon } from "@use-pico/client";
import { isString } from "@use-pico/common";
import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from "react";
import { ActionLinkCls } from "./ActionLinkCls";

interface Item
	extends ActionLinkCls.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	icon?: string | ReactNode;
	iconProps?: Icon.Props;
}

const Item = forwardRef<HTMLAnchorElement, Item>(
	(
		{
			icon = null,
			iconProps,
			variant,
			tva = ActionLinkCls,
			css,
			children,
			...props
		},
		ref,
	) => {
		const tv = tva({
			...variant,
			css,
		}).slots;

		return (
			<a
				{...props}
				className={tv.base()}
				ref={ref}
			>
				{isString(icon) ? (
					<Icon
						icon={icon}
						{...iconProps}
					/>
				) : (
					icon
				)}
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
