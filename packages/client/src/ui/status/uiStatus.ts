import { ui as coolUi } from "@use-pico/cls";
import type { Ui as CoolUi } from "../Ui";

export namespace uiStatus {
	export interface Ui {
		theme?: CoolUi.Theme;
		tone?: CoolUi.Tone;
		//
		flow?: CoolUi.Flow;
		width?: CoolUi.Width;
		height?: CoolUi.Height;
		gap?: CoolUi.Gap;
		//
		color?: CoolUi.Color;
		text?: CoolUi.Text;
		inner?: CoolUi.Inner;
		background?: CoolUi.Background;
		border?: CoolUi.Border;
		shadow?: CoolUi.Shadow;
		opacity?: CoolUi.Opacity;
		round?: CoolUi.Round;
	}

	export type Component<TRest extends object> = coolUi.Component<Ui, TRest>;

	export interface Props extends coolUi.PropsEx<Ui> {
		//
	}
}

export const uiStatus = ({ ui, className }: uiStatus.Props) => {
	return coolUi<uiStatus.Ui>({
		name: "Status",
		ui: {
			flow: "vertical",
			color: "lead",
			gap: "default",
			text: "3xl",
			width: "full",
			...ui,
		},
		className,
	});
};
