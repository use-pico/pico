import { ui as coolUi } from "@use-pico/cls";
import type { Ui as CoolUi } from "../Ui";

export namespace uiLinkTo {
	export interface Ui {
		tone?: CoolUi.Tone;
		theme?: CoolUi.Theme;
		size?: CoolUi.Size;
		text?: CoolUi.Text;
		justify?: CoolUi.Justify;
		items?: CoolUi.Items;
		gap?: CoolUi.Gap;
		round?: CoolUi.Round;
		snapTo?: CoolUi.SnapTo;
		color?: CoolUi.Color;
		flow?: CoolUi.Flow;
		display?: CoolUi.Display;
		width?: CoolUi.Width;
		height?: CoolUi.Height;
		opacity?: CoolUi.Opacity;
		background?: CoolUi.Background;
		border?: CoolUi.Border;
		shadow?: CoolUi.Shadow;
	}

	export type Component<TRest extends object> = coolUi.Component<Ui, TRest>;

	export interface Props extends coolUi.PropsEx<Ui> {
		//
	}
}

export const uiLinkTo = ({ ui, className }: uiLinkTo.Props) => {
	return coolUi<uiLinkTo.Ui>({
		name: "LinkTo",
		ui: {
			tone: "link",
			theme: "light",
			text: "default",
			color: "lead",
			flow: "horizontal",
			gap: "default",
			items: "center",
			justify: "start",
			...ui,
		},
		className,
	});
};
