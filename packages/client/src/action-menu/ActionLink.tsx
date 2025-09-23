import { createLink, type LinkComponent } from "@tanstack/react-router";
import { useCls, withCls } from "@use-pico/cls";
import type { AnchorHTMLAttributes, FC, Ref } from "react";
import { Icon } from "../icon/Icon";
import { ActionLinkCls } from "./ActionLinkCls";

interface BaseActionLinkProps
	extends ActionLinkCls.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	ref?: Ref<HTMLAnchorElement>;
	icon?: Icon.Type;
	iconProps?: Icon.Props;
}

const BaseActionLink: FC<BaseActionLinkProps> = ({
	ref,
	icon = null,
	iconProps,
	cls = ActionLinkCls,
	tweak,
	children,
	...props
}) => {
	/**
	 * Slots, because we're using `ref` here and `tva` does not support `ref`s.
	 */
	const { slots } = useCls(cls, [
		tweak,
	]);

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
};

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
