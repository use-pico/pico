import { ui as coolUi } from "@use-pico/cls";
import type { Ui as CoolUi } from "../ui/Ui";

export namespace uiIcon {
	export type Size = CoolUi.Size;

	export interface Ui {
		theme?: CoolUi.Theme;
		tone?: CoolUi.Tone;
		//
		disabled?: CoolUi.Disabled;
		color?: CoolUi.Color;
		text?: CoolUi.Text;
		//
		opacity?: CoolUi.Opacity;
		//
		snapTo?: CoolUi.SnapTo;
	}

	export type Component<TRest extends object> = coolUi.Component<Ui, TRest>;

	export interface Props extends coolUi.PropsEx<Ui> {
		//
	}
}

export const uiIcon = ({ ui, className }: uiIcon.Props) => {
	return coolUi<uiIcon.Ui>({
		name: "Icon",
		ui: {
			...ui,
		},
		className,
	});
};
