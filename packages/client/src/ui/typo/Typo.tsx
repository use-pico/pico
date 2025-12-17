import type { ComponentProps, FC, ReactNode } from "react";
import { uiTypo } from "./uiTypo";

const presets: Record<Typo.Preset, uiTypo.Ui> = {
	none: {},
	label: {
		text: "lg",
		font: "bold",
	},
	header: {
		text: "3xl",
		font: "bold",
		display: "block",
	},
	subheader: {
		text: "xl",
		font: "bold",
		display: "block",
	},
	blockquote: {},
	paragraph: {},
};

export namespace Typo {
	export type Value = ReactNode;

	export type Preset =
		| "none"
		| "header"
		| "subheader"
		| "label"
		| "paragraph"
		| "blockquote";

	export interface Props extends uiTypo.Component<ComponentProps<"span">> {
		label: Value;
		preset?: Preset;
	}

	export type PropsEx = Omit<Props, "label">;
}

export const Typo: FC<Typo.Props> = ({
	label,
	preset = "none",
	//
	ui,
	className,
	...props
}) => {
	return (
		<span
			{...uiTypo({
				ui: {
					...presets[preset],
					...ui,
				},
				//
				className,
			})}
			//
			{...props}
		>
			{label}
		</span>
	);
};
