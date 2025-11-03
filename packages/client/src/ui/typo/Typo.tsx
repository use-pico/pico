import { type Cls, useCls } from "@use-pico/cls";
import type { FC, ReactNode, Ref } from "react";
import { TypoCls } from "./TypoCls";

export namespace Typo {
	export type Value = ReactNode;
	export type Preset =
		| "none"
		| "header"
		| "subheader"
		| "label"
		| "paragraph"
		| "blockquote";

	export interface Props extends TypoCls.Props {
		ref?: Ref<HTMLDivElement>;
		label: Value;
		truncate?: boolean;
		preset?: Preset;
		display?: Cls.VariantOf<TypoCls, "display">;
		text?: Cls.VariantOf<TypoCls, "text">;
		wrap?: Cls.VariantOf<TypoCls, "wrap">;
		size?: Cls.VariantOf<TypoCls, "size">;
		font?: Cls.VariantOf<TypoCls, "font">;
		tone?: Cls.VariantOf<TypoCls, "tone">;
		theme?: Cls.VariantOf<TypoCls, "theme">;
		italic?: boolean;
	}

	export type PropsEx = Omit<Props, "label">;
}

const presets: Record<Typo.Preset, Cls.VariantsOf<TypoCls>> = {
	none: {},
	label: {
		size: "lg",
		font: "bold",
	},
	header: {
		size: "3xl",
		font: "bold",
		display: "block",
	},
	subheader: {
		size: "xl",
		font: "bold",
		display: "block",
	},
	blockquote: {},
	paragraph: {},
};

export const Typo: FC<Typo.Props> = ({
	label,
	preset = "none",
	truncate,
	display,
	text,
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
	const { slots } = useCls(
		cls,
		tweak,
		{
			variant: presets[preset],
		},
		{
			variant: {
				truncate,
				display,
				text,
				wrap,
				size,
				font,
				italic,
				tone,
				theme,
			},
		},
	);

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
