import { createLink, type LinkComponent } from "@tanstack/react-router";
import { type Cls, useCls } from "@use-pico/cls";
import type { AnchorHTMLAttributes, ComponentProps, FC, Ref } from "react";
import { Icon } from "../icon/Icon";
import { LinkToCls } from "./LinkToCls";

interface BaseLinkToProps
	extends LinkToCls.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	ref?: Ref<HTMLAnchorElement>;
	icon?: Icon.Type;
	iconProps?: Icon.PropsEx;
	tone?: Cls.VariantOf<LinkToCls, "tone">;
	theme?: Cls.VariantOf<LinkToCls, "theme">;
}

const BaseLinkTo: FC<BaseLinkToProps> = ({
	ref,
	icon,
	iconProps,
	tone,
	theme,
	cls = LinkToCls,
	tweak,
	children,
	...props
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			tone,
			theme,
		},
	});

	return (
		<a
			{...props}
			ref={ref}
			data-ui="LinkTo-root"
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
};

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
