import { ui as coolUi } from "@use-pico/cls";
import type { Ui as CoolUi } from "../Ui";

export namespace uiFormField {
	export interface Ui {
		tone?: CoolUi.Tone;
		theme?: CoolUi.Theme;
		//
		size?: CoolUi.Size;
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
		disabled?: CoolUi.Disabled;
	}

	export type Component<TRest extends object> = coolUi.Component<Ui, TRest>;

	export interface Props extends coolUi.PropsEx<Ui> {
		//
	}
}

export const uiFormField = ({ ui, className }: uiFormField.Props) => {
	return coolUi<uiFormField.Ui>({
		name: "FormField",
		ui,
		className,
	});
};
