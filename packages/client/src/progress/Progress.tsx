import { type Cls, useCls } from "@use-pico/cls";
import type { FC } from "react";
import { ProgressCls } from "./ProgressCls";

export namespace Progress {
	export interface Props extends ProgressCls.Props {
		value: number;
		size?: Cls.VariantOf<ProgressCls, "size">;
	}
}

export const Progress: FC<Progress.Props> = ({
	value,
	size,
	cls = ProgressCls,
	tweak,
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			size,
		}),
	}));

	return (
		<div className={slots.base()}>
			<div
				style={{
					width: `${Math.max(0, Math.min(100, value))}%`,
				}}
				className={slots.progress()}
			></div>
		</div>
	);
};
