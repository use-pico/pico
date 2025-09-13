import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, ReactNode, Ref } from "react";
import { TypoCls } from "./TypoCls";

export namespace Typo {
	export type Value = ReactNode;

	export interface Props extends TypoCls.Props {
		label: Value;
		size?: Cls.VariantOf<TypoCls, "size">;
		font?: Cls.VariantOf<TypoCls, "font">;
		tone?: Cls.VariantOf<TypoCls, "tone">;
		theme?: Cls.VariantOf<TypoCls, "theme">;
		italic?: boolean;
		ref?: Ref<HTMLDivElement>;
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
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			size,
			font,
			tone,
			theme,
			italic,
		}),
	}));

	return (
		<div
			ref={ref}
			className={slots.root()}
		>
			{label}
		</div>
	);
};

export const Typo = withCls(BaseTypo, TypoCls);
