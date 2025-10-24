import { type Cls, useCls } from "@use-pico/cls";
import type { FC } from "react";
import { ProgressCls } from "./ProgressCls";

export namespace Progress {
	export interface Props extends ProgressCls.Props {
		value: number;
		size?: Cls.VariantOf<ProgressCls, "size">;
		tone?: Cls.VariantOf<ProgressCls, "tone">;
		theme?: Cls.VariantOf<ProgressCls, "theme">;
	}
}

export const Progress: FC<Progress.Props> = ({
	value,
	size,
	tone,
	theme,
	tweak = {},
}) => {
	const { slots } = useCls(ProgressCls, tweak, {
		variant: {
			size,
			tone,
			theme,
		},
	});

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
