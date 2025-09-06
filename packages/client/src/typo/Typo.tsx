import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC, ReactNode } from "react";
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
	}

	export type PropsEx = Omit<Props, "label">;
}

export const BaseTypo: FC<Typo.Props> = ({
	label,
	size = "inherit",
	font = "inherit",
	tone = "inherit",
	theme = "inherit",
	italic = false,
	cls = TypoCls,
	tweak,
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

	return <div className={slots.root()}>{label}</div>;
};

export const Typo = withCls(BaseTypo, TypoCls);
