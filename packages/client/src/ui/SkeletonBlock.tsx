import {cn}      from "@use-pico/common";
import {type FC} from "react";

export namespace SkeletonBlock {
	export interface Props extends cn.WithClass {
	}
}

export const SkeletonBlock: FC<SkeletonBlock.Props> = (
	{
		cx,
	}
) => {
	return <div
		className={cn(
			"w-full h-full bg-slate-200 rounded",
			cx,
		)}
	>
	</div>;
};
