import { type Cls, useCls } from "@use-pico/cls";
import type { ComponentProps, FC, PropsWithChildren, Ref } from "react";
import type { UiProps } from "../../type/UiProps";
import { ContainerCls } from "./ContainerCls";

export namespace Container {
	export interface Props
		extends UiProps<ContainerCls.Props<PropsWithChildren>> {
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
		 * - `"fit"` - Fits parent container (h-full with min-h-0 and max-h-full)
		 * - `"auto"` - Adjusts to content (h-auto with min-h-0 and w-full)
		 * - `"viewport"` - Uses dynamic viewport height (h-dvh with min-h-dvh and w-full)
		 *
		 * @default "fit"
		 */
		height?: Cls.VariantOf<ContainerCls, "height">;

		/**
		 * Width behavior of the container.
		 *
		 * - `"unset"` - Default div behavior (no classes applied)
		 * - `"fit"` - Fits parent container (w-full with min-w-0 and max-w-full)
		 * - `"auto"` - Adjusts to content (w-auto with min-w-0 and h-full)
		 * - `"viewport"` - Uses dynamic viewport width (w-dvw with min-w-dvw)
		 *
		 * @default "fit"
		 */
		width?: Cls.VariantOf<ContainerCls, "width">;

		/**
		 * Layout behavior and grid configuration.
		 *
		 * - `"unset"` - No grid layout applied
		 * - `"horizontal"` - Horizontal grid with auto-sized columns
		 * - `"horizontal-full"` - Horizontal grid where each child takes 100% width (snap-scroll friendly)
		 * - `"vertical"` - Vertical grid with auto-sized rows
		 * - `"vertical-full"` - Vertical grid where each child takes 100% height (snap-scroll friendly)
		 * - `"vertical-header-content-footer"` - Three-row grid: header (min-content), flexible content (1fr), footer (min-content)
		 * - `"vertical-header-content"` - Two-row grid: header (min-content), flexible content (1fr)
		 * - `"vertical-content-footer"` - Two-row grid: flexible content (1fr), footer (min-content)
		 * - `"vertical-centered"` - Single-row grid that centers content vertically (useful for centering content in available space)
		 * - `"horizontal-flex"` - Horizontal flexbox layout (flex-row)
		 * - `"vertical-flex"` - Vertical flexbox layout (flex-col)
		 *
		 * @default "unset"
		 */
		layout?: Cls.VariantOf<ContainerCls, "layout">;

		/**
		 * Scroll behavior for scrolling.
		 *
		 * - `"unset"` - No scroll handling
		 * - `"horizontal"` - Horizontal scrolling with stable scrollbar gutter
		 * - `"vertical"` - Vertical scrolling with stable scrollbar gutter
		 * - `"hidden"` - Hide overflow content
		 *
		 * **Note:** When using `snap`, scrolling is automatically enabled and you don't need to specify `scroll` separately.
		 *
		 * @default "unset"
		 */
		scroll?: Cls.VariantOf<ContainerCls, "scroll">;

		/**
		 * Scroll snap behavior for smooth scrolling.
		 *
		 * Automatically enables scrolling in the appropriate direction (horizontal or vertical).
		 * You don't need to specify `scroll` when using `snap` - it's included automatically.
		 *
		 * - `"unset"` - No scroll snap
		 * - `"horizontal-start"` - Snap to start horizontally (includes horizontal scrolling)
		 * - `"horizontal-center"` - Snap to center horizontally (includes horizontal scrolling)
		 * - `"horizontal-end"` - Snap to end horizontally (includes horizontal scrolling)
		 * - `"vertical-start"` - Snap to start vertically (includes vertical scrolling)
		 * - `"vertical-center"` - Snap to center vertically (includes vertical scrolling)
		 * - `"vertical-end"` - Snap to end vertically (includes vertical scrolling)
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
		 * Gap spacing between grid items or flex items.
		 *
		 * - `"unset"` - No gap applied
		 * - `"xs"` - gap-1 (0.25rem)
		 * - `"sm"` - gap-2 (0.5rem)
		 * - `"md"` - gap-3 (0.75rem)
		 * - `"lg"` - gap-4 (1rem)
		 * - `"xl"` - gap-5 (1.25rem)
		 *
		 * @default "unset"
		 */
		gap?: Cls.VariantOf<ContainerCls, "gap">;

		/**
		 * Item alignment for flex layouts (align-items).
		 *
		 * Controls the alignment of items along the cross axis in flex containers.
		 * Use `placeItems` for grid layouts instead.
		 *
		 * - `"unset"` - No alignment applied (default behavior)
		 * - `"start"` - Items aligned to start (items-start)
		 * - `"center"` - Items centered (items-center)
		 * - `"end"` - Items aligned to end (items-end)
		 * - `"stretch"` - Items stretched to fill available space (items-stretch)
		 *
		 * @default "unset"
		 */
		items?: Cls.VariantOf<ContainerCls, "items">;

		/**
		 * Item placement for grid layouts (place-items).
		 *
		 * Controls the alignment of items within their grid cells.
		 * Use `items` for flex layouts instead.
		 *
		 * - `"unset"` - No placement applied (default behavior)
		 * - `"start"` - Items aligned to start (place-items-start)
		 * - `"center"` - Items centered (place-items-center)
		 * - `"end"` - Items aligned to end (place-items-end)
		 * - `"stretch"` - Items stretched to fill grid cells (place-items-stretch)
		 *
		 * @default "unset"
		 */
		placeItems?: Cls.VariantOf<ContainerCls, "place-items">;

		/**
		 * Justify content alignment (for flex layouts only).
		 *
		 * Controls the distribution of items along the main axis.
		 *
		 * - `"unset"` - No justification applied
		 * - `"start"` - Items aligned to start (justify-start)
		 * - `"center"` - Items centered (justify-center)
		 * - `"end"` - Items aligned to end (justify-end)
		 * - `"between"` - Items evenly distributed with space between (justify-between)
		 * - `"around"` - Items evenly distributed with space around (justify-around)
		 * - `"evenly"` - Items evenly distributed with equal space (justify-evenly)
		 *
		 * @default "unset"
		 */
		justify?: Cls.VariantOf<ContainerCls, "justify">;

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
		divProps?: Omit<ComponentProps<"div">, "children" | "className">;
	}
}

export const Container: FC<Container.Props> = ({
	ref,
	ui,
	//
	tone,
	theme,
	height,
	width,
	layout,
	scroll,
	snap,
	lock,
	square,
	gap,
	items,
	placeItems,
	justify,
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
			scroll,
			snap,
			lock,
			square,
			gap,
			items,
			"place-items": placeItems,
			justify,
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
			data-ui={ui ?? "Container-root"}
			className={slots.root()}
			{...divProps}
		>
			{children}
		</div>
	);
};
