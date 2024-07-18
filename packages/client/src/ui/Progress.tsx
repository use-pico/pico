import { Css, cssOf } from "@use-pico/common";
import { type FC } from "react";

const Size = {
	xs: "h-0.5",
	sm: "h-1",
	md: "h-2",
	lg: "h-4",
} as const;
type Size = typeof Size;

export namespace Progress {
	export interface Props extends Css<"root" | "progress"> {
		value?: number;
		size?: keyof Size;
	}
}

export const Progress: FC<Progress.Props> = ({ value, css, size = "md" }) => {
	return (
		<div
			className={cssOf(
				"w-full bg-slate-200 rounded transition-all",
				css?.root,
				Size[size],
			)}
		>
			<div
				style={{ width: `${value}%` }}
				className={cssOf(
					"h-full bg-blue-400 rounded leading-none",
					"transition-all",
					css?.progress,
				)}
			></div>
		</div>
	);
};
