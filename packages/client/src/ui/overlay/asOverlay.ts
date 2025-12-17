import { tvc } from "@use-pico/cls";

export namespace asOverlay {
	export type Type = "overlay" | "subtle";

	export interface Props {
		type?: Type;
		//
		className?: tvc.ClassName;
	}

	export type PropsEx<TProps = unknown> = Omit<TProps, "type"> & Props;
}

export const asOverlay = ({ type, className }: asOverlay.Props) => {
	return {
		"data-ui": "Overlay",
		//
		"data-type": type,
		//
		className: tvc("Overlay", className),
	} as const;
};
