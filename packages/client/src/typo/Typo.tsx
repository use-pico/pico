import { type Cls, useCls } from "@use-pico/cls";
import type { FC, ReactNode, Ref } from "react";
import { TypoCls } from "./TypoCls";

export namespace Typo {
	export type Value = ReactNode;

	export interface Props extends TypoCls.Props {
		ref?: Ref<HTMLDivElement>;
		label: Value;
		truncate?: boolean;
		display?: Cls.VariantOf<TypoCls, "display">;
		wrap?: Cls.VariantOf<TypoCls, "wrap">;
		size?: Cls.VariantOf<TypoCls, "size">;
		font?: Cls.VariantOf<TypoCls, "font">;
		tone?: Cls.VariantOf<TypoCls, "tone">;
		theme?: Cls.VariantOf<TypoCls, "theme">;
		italic?: boolean;
	}

	export type PropsEx = Omit<Props, "label">;
}

export const Typo: FC<Typo.Props> = ({
	label,
	truncate,
	display,
	wrap,
	size,
	font,
	tone,
	theme,
	italic = false,
	cls = TypoCls,
	tweak,
	ref,
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			truncate,
			display,
			wrap,
			size,
			font,
			italic,
			tone,
			theme,
		},
	});

	return (
		<div
			data-ui="Typo-root"
			ref={ref}
			className={slots.root()}
		>
			{label}
		</div>
	);
};
