import { ui as coolUi } from "@use-pico/cls";
import type { Ui as CoolUi } from "../Ui";

export namespace uiBadge {
	export interface Ui {
		theme?: CoolUi.Theme;
		tone?: CoolUi.Tone;
		//
		round?: CoolUi.Round;
		size?: CoolUi.Size;
		//
		height?: CoolUi.Height;
		width?: CoolUi.Width;
		inner?: CoolUi.Inner;
		//
		flow?: CoolUi.Flow;
		items?: CoolUi.Items;
		justify?: CoolUi.Justify;
		gap?: CoolUi.Gap;
		//
		position?: CoolUi.Position;
		//
		snapTo?: CoolUi.SnapTo;
		//
		opacity?: CoolUi.Opacity;
		//
		text?: CoolUi.Text;
		font?: CoolUi.Font;
		italic?: CoolUi.Italic;
		//
		border?: CoolUi.Border;
		shadow?: CoolUi.Shadow;
		zIndex?: CoolUi.zIndex;
		//
		color?: CoolUi.Color;
		background?: CoolUi.Background;
	}

	export type Component<TRest extends object> = coolUi.Component<Ui, TRest>;

	export interface Props extends coolUi.PropsEx<Ui> {
		//
	}
}

export const uiBadge = ({ ui, className }: uiBadge.Props) => {
	return coolUi<uiBadge.Ui>({
		name: "Badge",
		ui: {
			theme: "light",
			tone: "primary",
			background: "default",
			round: "default",
			border: true,
			shadow: true,
			...ui,
		},
		className,
	});
};
