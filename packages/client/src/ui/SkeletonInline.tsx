import {cn}      from "@use-pico/common";
import {type FC} from "react";

export namespace SkeletonInline {
	export interface Props extends cn.WithClass {
	}
}

export const SkeletonInline: FC<SkeletonInline.Props> = (
	{
		cx,
	}
) => {
	return <div
		className={cn(
			"w-32 h-4 bg-slate-200 rounded",
			cx,
		)}
	></div>;
};
