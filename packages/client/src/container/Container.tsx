import { type Cls, useCls } from "@use-pico/cls";
import type { FC, HTMLAttributes, Ref } from "react";
import { ContainerCls } from "./ContainerCls";

export namespace Container {
	export interface Props
		extends ContainerCls.Props<HTMLAttributes<HTMLDivElement>> {
		ref?: Ref<HTMLDivElement>;
		height?: Cls.VariantOf<ContainerCls, "height">;
		width?: Cls.VariantOf<ContainerCls, "width">;
		orientation?: Cls.VariantOf<ContainerCls, "orientation">;
		overflow?: Cls.VariantOf<ContainerCls, "overflow">;
		snap?: Cls.VariantOf<ContainerCls, "snap">;
		item?: Cls.VariantOf<ContainerCls, "item">;
		square?: Cls.VariantOf<ContainerCls, "square">;
		gap?: Cls.VariantOf<ContainerCls, "gap">;
		position?: Cls.VariantOf<ContainerCls, "position">;
	}
}

export const Container: FC<Container.Props> = ({
	ref,
	//
	height,
	width,
	orientation,
	overflow,
	snap,
	item,
	square,
	gap,
	position,
	//
	cls = ContainerCls,
	tweak,
	children,
	...props
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			height,
			width,
			orientation,
			overflow,
			snap,
			item,
			square,
			gap,
			position,
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
