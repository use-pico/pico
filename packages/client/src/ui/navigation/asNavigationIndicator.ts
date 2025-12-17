import { tvc } from "@use-pico/cls";

export namespace asNavigationIndicator {
	export type Tone = "primary";
	export type Theme = "light" | "dark";

	export interface Props {
		tone?: Tone;
		theme?: Theme;
		visible: boolean;
		//
		className?: tvc.ClassName;
	}

	export type PropsEx<TProps = unknown> = Omit<TProps, "className"> & Props;
}

export const asNavigationIndicator = ({
	tone,
	theme,
	visible,
	className,
}: asNavigationIndicator.Props) => {
	return {
		"data-ui": "NavigationIndicator",
		//
		"data-tone": tone,
		"data-theme": theme,
		//
		"data-visible": visible,
		//
		className: tvc("NavigationIndicator", className),
	} as const;
};
