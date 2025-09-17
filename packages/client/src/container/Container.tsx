import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, HTMLAttributes, Ref } from "react";
import { ContainerCls } from "./ContainerCls";

export namespace Container {
	export interface Props
		extends ContainerCls.Props<HTMLAttributes<HTMLDivElement>> {
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
	className,
	//
	children,
	...props
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		slot: what.slot({
			root: what.css(className),
		}),
		variant: what.variant({
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
		}),
	}));

	return (
		<div
			ref={ref}
			data-ui="Container-root"
			className={slots.root()}
			{...props}
		>
			{children}
		</div>
	);
};

export const Container = withCls(BaseContainer, ContainerCls);
