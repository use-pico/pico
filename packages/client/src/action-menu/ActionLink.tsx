import { createLink, type LinkComponent } from "@tanstack/react-router";
import { useCls, withCls } from "@use-pico/cls";
import { type AnchorHTMLAttributes, forwardRef } from "react";
import { Icon } from "../icon/Icon";
import { ActionLinkCls } from "./ActionLinkCls";

interface BaseActionLinkProps
	extends ActionLinkCls.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	icon?: Icon.Type;
	iconProps?: Icon.Props;
}

const BaseActionLink = forwardRef<HTMLAnchorElement, BaseActionLinkProps>(
	(
		{
			icon = null,
			iconProps,
			tva = ActionLinkCls,
			tweak,
			children,
			...props
		},
		ref,
	) => {
		/**
		 * Slots, because we're using `ref` here and `tva` does not support `ref`s.
		 */
		const slots = useCls(tva, tweak);

		return (
			<div className={slots.wrapper()}>
				<a
					{...props}
					className={slots.root()}
					ref={ref}
				>
					<Icon
						icon={icon}
						size={"sm"}
						{...iconProps}
					/>
					{children}
				</a>
			</div>
		);
	},
);

const CreateActionLink = createLink(BaseActionLink);

export const ActionLinkBase: LinkComponent<typeof BaseActionLink> = (props) => {
	return (
		<CreateActionLink
			preload={"intent"}
			{...props}
		/>
	);
};

export const ActionLink = withCls(ActionLinkBase, ActionLinkCls);
