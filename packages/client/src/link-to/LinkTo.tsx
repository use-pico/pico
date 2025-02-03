import { createLink, type LinkComponent } from "@tanstack/react-router";
import { isString } from "@use-pico/common";
import {
    forwardRef,
    type ComponentProps,
    type PropsWithChildren,
    type ReactNode,
} from "react";
import { Icon } from "../icon/Icon";
import { LinkToCss } from "./LinkToCss";

interface $LinkTo extends LinkToCss.Props<PropsWithChildren> {
	icon?: string | ReactNode;
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
