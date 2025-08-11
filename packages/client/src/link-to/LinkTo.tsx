import { createLink, type LinkComponent } from "@tanstack/react-router";
import { isString } from "@use-pico/common";
import {
	type ComponentProps,
	forwardRef,
	type PropsWithChildren,
	type ReactNode,
} from "react";
import { Icon } from "../icon/Icon";
import { LinkToCls } from "./LinkToCls";

interface $LinkTo extends LinkToCls.Props<PropsWithChildren> {
	icon?: string | ReactNode;
	iconProps?: Icon.PropsEx;
}

const $LinkTo = forwardRef<HTMLAnchorElement, $LinkTo>(
	({ icon, iconProps, tva = LinkToCls, cls, children, ...props }, ref) => {
		const classes = tva.create(cls);

		return (
			<a
				{...props}
				ref={ref}
				className={classes.base()}
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
