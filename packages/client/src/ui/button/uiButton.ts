import { ui as coolUi } from "@use-pico/cls";
import type { Ui as CoolUi } from "../Ui";

export namespace uiButton {
	export type Size = CoolUi.Size;

	export interface Ui {
		theme?: CoolUi.Theme;
		tone?: CoolUi.Tone;
		//
		size?: Size;
		inner?: CoolUi.Inner;
		square?: CoolUi.Square;
		gap?: CoolUi.Gap;
		round?: CoolUi.Round;
		snapTo?: CoolUi.SnapTo;
		opacity?: CoolUi.Opacity;
		//
		width?: CoolUi.Width;
		height?: CoolUi.Height;
		//
		flow?: CoolUi.Flow;
		//
		justify?: CoolUi.Justify;
		items?: CoolUi.Items;
		//
		disabled?: CoolUi.Disabled;
		background?: CoolUi.Background;
		backgroundActive?: CoolUi.BackgroundActive;
		border?: CoolUi.Border;
		borderActive?: CoolUi.BorderActive;
		shadow?: CoolUi.Shadow;
		shadowActive?: CoolUi.ShadowActive;
		zIndex?: CoolUi.zIndex;
		//
		text?: CoolUi.Text;
		font?: CoolUi.Font;
		color?: CoolUi.Color;
	}

	export type Component<TRest extends object> = coolUi.Component<Ui, TRest>;

	export interface Props extends coolUi.PropsEx<Ui> {
		//
	}
}

export const uiButton = ({ ui, className }: uiButton.Props) => {
	return coolUi<uiButton.Ui>({
		name: "Button",
		ui: {
			justify: "start",
			items: "center",
			flow: "horizontal",
			round: "default",
			gap: "sm",
			color: "text",
			background: "default",
			border: true,
			shadow: true,
			...ui,
		},
		className,
	});
};
