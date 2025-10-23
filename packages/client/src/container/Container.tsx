import { type Cls, useCls } from "@use-pico/cls";
import type { FC, HTMLAttributes, PropsWithChildren, Ref } from "react";
import { ContainerCls } from "./ContainerCls";

export namespace Container {
	export interface Props extends ContainerCls.Props<PropsWithChildren> {
		ref?: Ref<HTMLDivElement>;

		/**
		 * Visual tone of the container.
		 *
		 * @default "unset"
		 */
		tone?: Cls.VariantOf<ContainerCls, "tone">;

		/**
		 * Theme variant for light/dark mode.
		 *
		 * @default "unset"
		 */
		theme?: Cls.VariantOf<ContainerCls, "theme">;

		/**
		 * Height behavior of the container.
		 *
		 * - `"unset"` - Default div behavior (no classes applied)
		 * - `"full"` - Takes full height with min-h-0 and max-h-full
		 * - `"dvh"` - Uses dynamic viewport height (dvh) with min-h-dvh and w-full
		 * - `"auto"` - Auto height with min-h-0 and w-full
		 *
		 * @default "full"
		 */
		height?: Cls.VariantOf<ContainerCls, "height">;

		/**
		 * Width behavior of the container.
		 *
		 * - `"unset"` - Default div behavior (no classes applied)
		 * - `"full"` - Takes full width with min-w-0 and max-w-full
		 * - `"dvw"` - Uses dynamic viewport width (dvw) with min-w-dvw
		 * - `"auto"` - Auto width with min-w-0 and h-full
		 *
		 * @default "full"
		 */
		width?: Cls.VariantOf<ContainerCls, "width">;

		/**
		 * Layout behavior and grid configuration.
		 *
		 * - `"unset"` - No grid layout applied
		 * - `"vertical"` - Vertical grid with auto-sized rows
		 * - `"vertical-header-content-footer"` - Three-row grid: header (min-content), flexible content (1fr), footer (min-content)
		 * - `"vertical-header-content"` - Two-row grid: header (min-content), flexible content (1fr)
		 * - `"vertical-content-footer"` - Two-row grid: flexible content (1fr), footer (min-content)
		 * - `"vertical-full"` - Vertical grid where each child takes 100% height (snap-scroll friendly)
		 * - `"horizontal"` - Horizontal grid with auto-sized columns
		 * - `"horizontal-full"` - Horizontal grid where each child takes 100% width (snap-scroll friendly)
		 *
		 * @default "unset"
		 */
		layout?: Cls.VariantOf<ContainerCls, "layout">;

		/**
		 * Overflow behavior for scrolling.
		 *
		 * - `"unset"` - No overflow handling
		 * - `"horizontal"` - Horizontal scrolling with stable scrollbar gutter
		 * - `"vertical"` - Vertical scrolling with stable scrollbar gutter
		 *
		 * @default "unset"
		 */
		overflow?: Cls.VariantOf<ContainerCls, "overflow">;

		/**
		 * Scroll snap behavior for smooth scrolling.
		 *
		 * - `"unset"` - No scroll snap
		 * - `"horizontal-start"` - Snap to start horizontally
		 * - `"horizontal-center"` - Snap to center horizontally
		 * - `"horizontal-end"` - Snap to end horizontally
		 * - `"vertical-start"` - Snap to start vertically
		 * - `"vertical-center"` - Snap to center vertically
		 * - `"vertical-end"` - Snap to end vertically
		 *
		 * @default "unset"
		 */
		snap?: Cls.VariantOf<ContainerCls, "snap">;

		/**
		 * Touch panning lock behavior for mobile interactions.
		 *
		 * - `"unset"` - No touch panning restrictions
		 * - `"horizontal"` - Locks horizontal panning, allows vertical panning/scrolling
		 * - `"vertical"` - Locks vertical panning, allows horizontal panning/scrolling
		 *
		 * @default "unset"
		 */
		lock?: Cls.VariantOf<ContainerCls, "lock">;

		/**
		 * Square padding using design tokens.
		 *
		 * @default "unset"
		 */
		square?: Cls.VariantOf<ContainerCls, "square">;

		/**
		 * Gap between grid items.
		 *
		 * @default "unset"
		 */
		gap?: Cls.VariantOf<ContainerCls, "gap">;

		/**
		 * CSS position behavior.
		 *
		 * - `"unset"` - No position applied
		 * - `"absolute"` - Absolutely positioned
		 * - `"relative"` - Relatively positioned
		 *
		 * @default "unset"
		 */
		position?: Cls.VariantOf<ContainerCls, "position">;

		/**
		 * Border styling using design tokens.
		 *
		 * @default "unset"
		 */
		border?: Cls.VariantOf<ContainerCls, "border">;

		/**
		 * Border radius using design tokens.
		 *
		 * @default "unset"
		 */
		round?: Cls.VariantOf<ContainerCls, "round">;

		/**
		 * Box shadow using design tokens.
		 *
		 * @default "unset"
		 */
		shadow?: Cls.VariantOf<ContainerCls, "shadow">;

		/**
		 * Props passed to the underlying div element.
		 *
		 * Extracted so they won't pollute the container's props.
		 */
		divProps?: Omit<
			HTMLAttributes<HTMLDivElement>,
			"children" | "className"
		>;
	}
}

export const Container: FC<Container.Props> = ({
	ref,
	//
	tone,
	theme,
	height,
	width,
	layout,
	overflow,
	snap,
	lock,
	square,
	gap,
	position,
	border,
	round,
	shadow,
	//
	cls = ContainerCls,
	tweak,
	//
	children,
	divProps,
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			height,
			width,
			layout,
			overflow,
			snap,
			lock,
			square,
			gap,
			position,
			border,
			round,
			shadow,
			tone,
			theme,
		},
	});

	return (
		<div
			ref={ref}
			data-ui="Container-root"
			className={slots.root()}
			{...divProps}
		>
			{children}
		</div>
	);
};
