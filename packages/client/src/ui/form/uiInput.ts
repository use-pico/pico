import { ui as coolUi } from "@use-pico/cls";
import type { Ui as CoolUi } from "../Ui";

export namespace uiInput {
	export interface Ui {
		tone?: CoolUi.Tone;
		theme?: CoolUi.Theme;
		//
		text?: CoolUi.Text;
		font?: CoolUi.Font;
		color?: CoolUi.Color;
		size?: CoolUi.Size;
		inner?: CoolUi.Inner;
		square?: CoolUi.Square;
		gap?: CoolUi.Gap;
		round?: CoolUi.Round;
		background?: CoolUi.Background;
		backgroundActive?: CoolUi.Background;
		border?: CoolUi.Border;
		borderActive?: CoolUi.BorderActive;
		shadow?: CoolUi.Shadow;
		shadowActive?: CoolUi.ShadowActive;
		opacity?: CoolUi.Opacity;
		zIndex?: CoolUi.zIndex;
		disabled?: CoolUi.Disabled;
		width?: CoolUi.Width;
		height?: CoolUi.Height;
	}

	export type Component<TRest extends object> = coolUi.Component<Ui, TRest>;

	export interface Props extends coolUi.PropsEx<Ui> {
		//
	}
}

export const uiInput = ({ ui, className }: uiInput.Props) => {
	return coolUi<uiInput.Ui>({
		name: "Input",
		ui: {
			text: "default",
			color: "text",
			background: "default",
			border: true,
			shadow: true,
			round: "default",
			width: "full",
			inner: "default",
			...ui,
		},
		className,
	});
};
