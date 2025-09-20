import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, ReactNode, Ref } from "react";
import { useTone } from "../tone/useTone";
import { TypoCls } from "./TypoCls";

export namespace Typo {
	export type Value = ReactNode;

	export interface Props extends TypoCls.Props {
		ref?: Ref<HTMLDivElement>;
		label: Value;
		size?: Cls.VariantOf<TypoCls, "size">;
		font?: Cls.VariantOf<TypoCls, "font">;
		tone?: Cls.VariantOf<TypoCls, "tone">;
		theme?: Cls.VariantOf<TypoCls, "theme">;
		italic?: boolean;
	}

	export type PropsEx = Omit<Props, "label">;
}

export const BaseTypo: FC<Typo.Props> = ({
	label,
	size,
	font,
	tone,
	theme,
	italic = false,
	cls = TypoCls,
	tweak,
	ref,
}) => {
	const contextTone = useTone({
		tone,
		theme,
	});

	const { slots } = useCls(cls, tweak, {
		variant: {
			size,
			font,
			italic,
			...contextTone,
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
