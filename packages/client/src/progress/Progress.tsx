import { type Cls, useCls, withCls } from "@use-pico/cls";
import type { FC } from "react";
import { ProgressCls } from "./ProgressCls";

export namespace Progress {
	export interface Props extends ProgressCls.Props {
		value: number;
		size?: Cls.VariantOf<ProgressCls, "size">;
	}
}

export const BaseProgress: FC<Progress.Props> = ({
	value,
	size,
	cls = ProgressCls,
	tweak,
}) => {
	const { slots } = useCls(cls, [
		tweak,
		{
			variant: {
				size,
			},
		},
	]);

	return (
		<div
			data-ui="Progress-root"
			className={slots.root()}
		>
			<div
				data-ui="Progress-progress"
				style={{
					width: `${Math.max(0, Math.min(100, value))}%`,
				}}
				className={slots.progress()}
			></div>
		</div>
	);
};

export const Progress = withCls(BaseProgress, ProgressCls);
