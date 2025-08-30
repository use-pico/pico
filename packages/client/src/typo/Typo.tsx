import { useCls, type VariantOf, withCls } from "@use-pico/cls";
import type { FC, ReactNode } from "react";
import { TypoCls } from "./TypoCls";

export namespace Typo {
	export type Value = ReactNode;

	export interface Props extends TypoCls.Props {
		label: Value;
		size?: VariantOf<TypoCls, "size">;
		font?: VariantOf<TypoCls, "font">;
		tone?: VariantOf<TypoCls, "tone">;
		theme?: VariantOf<TypoCls, "theme">;
		italic?: boolean;
	}

	export type PropsEx = Omit<Props, "label">;
}

export const BaseTypo: FC<Typo.Props> = ({
	label,
	size = "md",
	font = "normal",
	tone = "inherit",
	theme = "light",
	italic = false,
	tva = TypoCls,
	cls,
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
		variant: what.variant({
			size,
			font,
			tone,
			theme,
			italic,
		}),
	}));

	return <div className={slots.root()}>{label}</div>;
};

export const Typo = withCls(BaseTypo, TypoCls);
