import { ui as coolUi } from "@use-pico/cls";
import type { Ui as CoolUi } from "../Ui";

export namespace uiTypo {
	export type Wrap = "wrap" | "nowrap";

	export interface Ui {
		theme?: CoolUi.Theme;
		tone?: CoolUi.Tone;
		//
		text?: CoolUi.Text;
		font?: CoolUi.Font;
		italic?: CoolUi.Italic;
		//
		display?: CoolUi.Display;
		truncate?: boolean;
		wrap?: Wrap;
		color?: CoolUi.Color;
		snapTo?: CoolUi.SnapTo;
		position?: CoolUi.Position;
		opacity?: CoolUi.Opacity;
	}

	export type Component<TRest extends object> = coolUi.Component<Ui, TRest>;

	export interface Props extends coolUi.PropsEx<Ui> {
		//
	}
}

export const uiTypo = ({ ui, className }: uiTypo.Props) => {
	return coolUi({
		name: "Typo",
		ui: {
			display: "inline",
			...ui,
		},
		className,
	});
};
