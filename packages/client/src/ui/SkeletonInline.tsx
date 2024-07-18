import { Css, cssOf } from "@use-pico/common";
import { type FC } from "react";

export namespace SkeletonInline {
	export interface Props extends Css.Style {}
}

export const SkeletonInline: FC<SkeletonInline.Props> = ({ css }) => {
	return (
		<div
			className={cssOf("w-32 h-4 animate-pulse bg-slate-200 rounded", css)}
		></div>
	);
};
