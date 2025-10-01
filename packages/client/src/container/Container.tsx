import { type Cls, useCls, withCls } from "@use-pico/cls";
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
		 * - `"vertical"` - Grid with row flow, auto rows, single column
		 * - `"vertical-header-content-footer"` - Grid with header, content, and footer rows
		 * - `"vertical-header-content"` - Grid with header and content rows
		 * - `"vertical-content-footer"` - Grid with content and footer rows
		 * - `"vertical-full"` - Grid with row flow, 100% rows, full width/height
		 * - `"horizontal"` - Grid with column flow, auto columns, single row
		 * - `"horizontal-full"` - Grid with column flow, 100% columns, full width/height
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
		 * Item sizing behavior within the container.
		 *
		 * - `"unset"` - No specific item sizing
		 * - `"col"` - Items take full height, auto width
		 * - `"row"` - Items take full width, auto height
		 * - `"full"` - Items take both full width and height
		 *
		 * @default "unset"
		 */
		item?: Cls.VariantOf<ContainerCls, "item">;

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

export const BaseContainer: FC<Container.Props> = ({
	ref,
	//
	tone,
	theme,
	height,
	width,
	layout,
	overflow,
	snap,
	item,
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
			item,
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

export const Container = withCls(BaseContainer, ContainerCls);
