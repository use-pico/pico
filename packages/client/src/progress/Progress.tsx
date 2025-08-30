import { useCls, type VariantOf } from "@use-pico/cls";
import type { FC } from "react";
import { ProgressCls } from "./ProgressCls";

export namespace Progress {
	export interface Props extends ProgressCls.Props {
		value: number;
		size?: VariantOf<ProgressCls, "size">;
	}
}

export const Progress: FC<Progress.Props> = ({
	value,
	size,
	tva = ProgressCls,
	cls,
}) => {
	const slots = useCls(tva, cls, ({ what }) => ({
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
