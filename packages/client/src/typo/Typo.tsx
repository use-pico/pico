import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, ReactNode, Ref } from "react";
import { TypoCls } from "./TypoCls";

export namespace Typo {
	export type Value = ReactNode;

	export interface Props extends TypoCls.Props {
		ref?: Ref<HTMLDivElement>;
		label: Value;
		display?: Cls.VariantOf<TypoCls, "display">;
		size?: Cls.VariantOf<TypoCls, "size">;
		font?: Cls.VariantOf<TypoCls, "font">;
		tone?: Cls.VariantOf<TypoCls, "tone">;
		theme?: Cls.VariantOf<TypoCls, "theme">;
		italic?: boolean;
	}

	export type PropsEx = Omit<Props, "label">;
}

const BaseTypo: FC<Typo.Props> = ({
	label,
	display,
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
			display,
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

export const Typo = withCls(BaseTypo, TypoCls);
