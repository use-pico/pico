import { createLink, type LinkComponent } from "@tanstack/react-router";
import { useCls } from "@use-pico/cls";
import { type ComponentProps, forwardRef, type PropsWithChildren } from "react";
import { Icon } from "../icon/Icon";
import { LinkToCls } from "./LinkToCls";

interface BaseLinkToProps extends LinkToCls.Props<PropsWithChildren> {
	icon?: Icon.Type;
	iconProps?: Icon.PropsEx;
}

const BaseLinkTo = forwardRef<HTMLAnchorElement, BaseLinkToProps>(
	({ icon, iconProps, tva = LinkToCls, tweak, children, ...props }, ref) => {
		const slots = useCls(tva, tweak);

		return (
			<a
				{...props}
				ref={ref}
				className={slots.root()}
			>
				<Icon
					icon={icon}
					size={"xs"}
					{...iconProps}
				/>
				{children}
			</a>
		);
	},
);

const CreateLinkTo = createLink(BaseLinkTo);

export namespace LinkTo {
	export type Props = ComponentProps<typeof LinkTo>;
}

export const LinkTo: LinkComponent<typeof BaseLinkTo> = (props) => {
	return (
		<CreateLinkTo
			preload={"intent"}
			{...props}
		/>
	);
};
