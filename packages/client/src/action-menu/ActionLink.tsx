import { createLink, type LinkComponent } from "@tanstack/react-router";
import { isString } from "@use-pico/common";
import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from "react";
import { Icon } from "../icon/Icon";
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
			tva = ActionLinkCls,
			cls,
			children,
			...props
		},
		ref,
	) => {
		/**
		 * Slots, because we're using `ref` here and `tva` does not support `ref`s.
		 */
		const classes = tva.create(cls);

		return (
			<a
				{...props}
				className={classes.base()}
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
