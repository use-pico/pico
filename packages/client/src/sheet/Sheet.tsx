import { type Cls, useCls } from "@use-pico/cls";
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

export const Sheet: FC<Sheet.Props> = ({
	ref,
	//
	disabled,
	tone,
	theme,
	round,
	//
	cls = SheetCls,
	tweak,
	//
	...props
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			disabled,
			tone,
			theme,
			round,
		},
	});

	return (
		<div
			data-ui={"Sheet-root"}
			ref={ref}
			className={slots.root()}
			{...props}
		/>
	);
};
