import type { FC } from "react";
import { ProgressCls } from "./ProgressCls";

export namespace Progress {
	export interface Props extends ProgressCls.Props {
		value: number;
	}
}

export const Progress: FC<Progress.Props> = ({
	value,
	variant,
	tva = ProgressCls,
	cls,
}) => {
	const { slots } = tva(variant, cls);

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
