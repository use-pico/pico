import { type Cls, useCls } from "@use-pico/cls";
import type { FC, HTMLAttributes, Ref } from "react";
import type { UiProps } from "../../type/UiProps";
import { SheetCls } from "./SheetCls";

export namespace Sheet {
	export interface Props
		extends UiProps<SheetCls.Props<HTMLAttributes<HTMLDivElement>>> {
		ref?: Ref<HTMLDivElement>;
		disabled?: boolean;
		tone?: Cls.VariantOf<SheetCls, "tone">;
		theme?: Cls.VariantOf<SheetCls, "theme">;
		round?: Cls.VariantOf<SheetCls, "round">;
	}
}

export const Sheet: FC<Sheet.Props> = ({
	ui,
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
			data-ui={ui ?? "Sheet-root"}
			ref={ref}
			className={slots.root()}
			{...props}
		/>
	);
};
