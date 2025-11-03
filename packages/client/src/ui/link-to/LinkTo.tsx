import { createLink, type LinkComponent } from "@tanstack/react-router";
import { type Cls, useCls, VariantProvider } from "@use-pico/cls";
import type { AnchorHTMLAttributes, ComponentProps, FC, Ref } from "react";
import { PicoCls } from "../../cls/PicoCls";
import { Icon } from "../../icon/Icon";
import { LinkToCls } from "./LinkToCls";

interface BaseLinkToProps
	extends LinkToCls.Props<AnchorHTMLAttributes<HTMLAnchorElement>> {
	/**
	 * Ref to the anchor element.
	 */
	ref?: Ref<HTMLAnchorElement>;
	/**
	 * Icon to display in the link.
	 */
	icon?: Icon.Type;
	/**
	 * Additional props to pass to the icon component.
	 */
	iconProps?: Icon.PropsEx;
	/**
	 * Position of the icon relative to the content.
	 * @default "left"
	 */
	iconPosition?: Cls.VariantOf<LinkToCls, "icon-position">;
	/**
	 * Display mode of the link.
	 * @default "unset"
	 */
	display?: Cls.VariantOf<LinkToCls, "display">;
	/**
	 * Whether the link should take full width of its container.
	 * @default false
	 */
	full?: boolean;
	/**
	 * Color tone of the link (affects text, background, and border colors).
	 * @default "link"
	 */
	tone?: Cls.VariantOf<LinkToCls, "tone">;
	/**
	 * Theme variant (light or dark).
	 * @default "light"
	 */
	theme?: Cls.VariantOf<LinkToCls, "theme">;
}

const BaseLinkTo: FC<BaseLinkToProps> = ({
	ref,
	icon,
	iconProps,
	iconPosition = "left",
	display,
	full,
	tone,
	theme,
	cls = LinkToCls,
	tweak,
	children,
	...props
}) => {
	const { slots, variant } = useCls(cls, tweak, {
		variant: {
			display,
			full,
			tone,
			theme,
			"icon-position": iconPosition,
		},
	});

	return (
		<VariantProvider
			cls={PicoCls}
			variant={variant}
		>
			<a
				{...props}
				ref={ref}
				data-ui="LinkTo-root"
				className={slots.root()}
			>
				{iconPosition === "left" && (
					<Icon
						icon={icon}
						size={"sm"}
						{...iconProps}
					/>
				)}
				{children}
				{iconPosition === "right" && (
					<Icon
						icon={icon}
						size={"sm"}
						{...iconProps}
					/>
				)}
			</a>
		</VariantProvider>
	);
};

const CreateLinkTo = createLink(BaseLinkTo);

export namespace LinkTo {
	export type Props = ComponentProps<typeof LinkTo>;
}

export const LinkTo: LinkComponent<typeof BaseLinkTo> = (props) => {
	return <CreateLinkTo {...props} />;
};
