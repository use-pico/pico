import { tvc } from "@use-pico/cls";

export namespace asProgress {
	export type Tone =
		| "primary"
		| "secondary"
		| "danger"
		| "warning"
		| "neutral"
		| "subtle"
		| "link";
	export type Theme = "light" | "dark";
	export type Size = "xs" | "sm" | "md" | "lg";

	export interface Props {
		tone?: Tone;
		theme?: Theme;
		size?: Size;
		//
		className?: tvc.ClassName;
	}

	export type PropsEx<TProps = unknown> = Omit<TProps, "className"> & Props;
}

export const asProgress = ({
	tone,
	theme,
	size,
	className,
}: asProgress.Props) => {
	return {
		"data-ui": "Progress",
		//
		"data-tone": tone,
		"data-theme": theme,
		"data-size": size,
		//
		className: tvc("Progress", className),
	} as const;
};
