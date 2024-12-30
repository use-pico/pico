import { createLink, type LinkComponent } from "@tanstack/react-router";
import { forwardRef, type ComponentProps, type PropsWithChildren } from "react";
import { Icon } from "../icon/Icon";
import { LinkToCss } from "./LinkToCss";

interface $LinkTo extends LinkToCss.Props<PropsWithChildren> {
	icon?: string;
	iconProps?: Icon.PropsEx;
}

const $LinkTo = forwardRef<HTMLAnchorElement, $LinkTo>(
	(
		{ icon, iconProps, variant, tva = LinkToCss, css, children, ...props },
		ref,
	) => {
		const tv = tva({ ...variant, css }).slots;

		return (
			<a
				{...props}
				ref={ref}
				className={tv.base()}
			>
				{icon && (
					<Icon
						icon={icon}
						{...iconProps}
					/>
				)}
				{children}
			</a>
		);
	},
);

const $LinkToLink = createLink($LinkTo);

export namespace LinkTo {
	export type Props = ComponentProps<typeof LinkTo>;
}

export const LinkTo: LinkComponent<typeof $LinkTo> = (props) => {
	return (
		<$LinkToLink
			preload={"intent"}
			{...props}
		/>
	);
};
