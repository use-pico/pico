import { type Cls, useCls, VariantProvider } from "@use-pico/cls";
import type { FC, HTMLAttributes, Ref } from "react";
import { BadgeCls } from "./BadgeCls";

/**
 * Simple badge icon; just rounded background with children.
 *
 * @group ui
 */
export namespace Badge {
	export interface Props
		extends BadgeCls.Props<HTMLAttributes<HTMLDivElement>> {
		/**
		 * Ref to the root div element.
		 */
		ref?: Ref<HTMLDivElement>;
		/**
		 * Whether the badge is disabled (reduces opacity and prevents interaction).
		 */
		disabled?: boolean;
		/**
		 * Size of the badge (affects padding and font size).
		 */
		size?: Cls.VariantOf<BadgeCls, "size">;
		/**
		 * Border radius of the badge.
		 */
		round?: Cls.VariantOf<BadgeCls, "round">;
		/**
		 * Color tone of the badge (affects background, text, border, and shadow colors).
		 */
		tone?: Cls.VariantOf<BadgeCls, "tone">;
		/**
		 * Theme variant (light or dark).
		 */
		theme?: Cls.VariantOf<BadgeCls, "theme">;
		/**
		 * Absolute positioning for snapping the badge to corners of a parent container.
		 * Requires the parent element to have relative positioning.
		 */
		snapTo?: Cls.VariantOf<BadgeCls, "snap-to">;
	}
}

export const Badge: FC<Badge.Props> = ({
	ref,
	//
	disabled,
	size,
	round,
	tone,
	theme,
	snapTo,
	//
	cls = BadgeCls,
	tweak,
	children,
	//
	...props
}) => {
	const { slots, variant } = useCls(cls, tweak, {
		variant: {
			disabled,
			size,
			round,
			tone,
			theme,
			"snap-to": snapTo,
		},
	});

	return (
		<div
			ref={ref}
			data-ui="Badge-root"
			className={slots.root()}
			{...props}
		>
			<VariantProvider
				cls={cls}
				variant={{
					tone: variant.tone,
					theme: variant.theme,
				}}
			>
				{children}
			</VariantProvider>
		</div>
	);
};
