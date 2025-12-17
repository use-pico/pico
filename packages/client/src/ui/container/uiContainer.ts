import { ui as coolUi } from "@use-pico/cls";
import type { Ui as CoolUi } from "../Ui";

export namespace uiContainer {
	export type Layout =
		| "vertical"
		| "vertical-full"
		| "vertical-header-content-footer"
		| "vertical-header-content"
		| "vertical-content-footer"
		| "vertical-centered"
		| "vertical-flex"
		//
		| "horizontal"
		| "horizontal-full"
		| "horizontal-flex";
	export type Scroll = "vertical" | "horizontal";
	export type Snap = "vertical" | "horizontal";
	export type SnapAlign = "start" | "center" | "end";

	export interface Ui {
		theme?: CoolUi.Theme;
		tone?: CoolUi.Tone;
		//
		layout?: Layout;
		height?: CoolUi.Height;
		width?: CoolUi.Width;
		gap?: CoolUi.Gap;
		inner?: CoolUi.Inner;
		snapTo?: CoolUi.SnapTo;
		snap?: Snap;
		snapAlign?: SnapAlign;
		//
		items?: CoolUi.Items;
		justify?: CoolUi.Justify;
		//
		opacity?: CoolUi.Opacity;
		//
		position?: CoolUi.Position;
		//
		scroll?: Scroll;
		//
		round?: CoolUi.Round;
		//
		disabled?: CoolUi.Disabled;
		background?: CoolUi.Background;
		text?: CoolUi.Text;
		border?: CoolUi.Border;
		shadow?: CoolUi.Shadow;
		zIndex?: CoolUi.zIndex;
		color?: CoolUi.Color;
		square?: CoolUi.Square;
		flow?: CoolUi.Flow;
	}

	export type Component<TRest extends object> = coolUi.Component<Ui, TRest>;

	export interface Props extends coolUi.PropsEx<Ui> {
		//
	}
}

export const uiContainer = ({ ui, className }: uiContainer.Props) => {
	return coolUi<uiContainer.Ui>({
		name: "Container",
		ui: {
			...ui,
		},
		className,
	});
};
