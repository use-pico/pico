import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, HTMLAttributes, Ref } from "react";
import { SheetCls } from "./SheetCls";

export namespace Sheet {
	export interface Props
		extends SheetCls.Props<HTMLAttributes<HTMLDivElement>> {
		ref?: Ref<HTMLDivElement>;
		disabled?: boolean;
		tone?: Cls.VariantOf<SheetCls, "tone">;
		theme?: Cls.VariantOf<SheetCls, "theme">;
		round?: Cls.VariantOf<SheetCls, "round">;
	}
}

export const BaseSheet: FC<Sheet.Props> = ({
	ref,
	//
	disabled,
	tone,
	theme,
	round,
	//
	cls = SheetCls,
	tweak,
	tweakSlot,
	tweakVariant,
	tweakToken,
	//
	...props
}) => {
	const { slots } = useCls(
		cls,
		tweak,
		{
			slot: tweakSlot,
			variant: tweakVariant,
			token: tweakToken,
		},
		{
			variant: {
				disabled,
				tone,
				theme,
				round,
			},
		},
	);

	return (
		<div
			data-ui={"Sheet-root"}
			ref={ref}
			className={slots.root()}
			{...props}
		/>
	);
};

export const Sheet = withCls(BaseSheet, SheetCls);
