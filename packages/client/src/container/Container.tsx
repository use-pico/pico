import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, HTMLAttributes, PropsWithChildren, Ref } from "react";
import { ContainerCls } from "./ContainerCls";

export namespace Container {
	export interface Props extends ContainerCls.Props<PropsWithChildren> {
		ref?: Ref<HTMLDivElement>;
		tone?: Cls.VariantOf<ContainerCls, "tone">;
		theme?: Cls.VariantOf<ContainerCls, "theme">;
		height?: Cls.VariantOf<ContainerCls, "height">;
		width?: Cls.VariantOf<ContainerCls, "width">;
		orientation?: Cls.VariantOf<ContainerCls, "orientation">;
		overflow?: Cls.VariantOf<ContainerCls, "overflow">;
		snap?: Cls.VariantOf<ContainerCls, "snap">;
		item?: Cls.VariantOf<ContainerCls, "item">;
		square?: Cls.VariantOf<ContainerCls, "square">;
		gap?: Cls.VariantOf<ContainerCls, "gap">;
		position?: Cls.VariantOf<ContainerCls, "position">;
		border?: Cls.VariantOf<ContainerCls, "border">;
		round?: Cls.VariantOf<ContainerCls, "round">;
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
	orientation,
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
	const { slots } = useCls(
		cls,
		{
			variant: {
				height,
				width,
				orientation,
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
		},
		tweak,
	);

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
