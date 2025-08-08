import type { FC } from "react";
import { ProgressCls } from "./ProgressCls";

export namespace Progress {
	export interface Props extends ProgressCls.Props {
		value: number;
	}
}

export const Progress: FC<Progress.Props> = ({
	value,
	tva = ProgressCls,
	cls,
}) => {
	const classes = tva.create(cls);

	return (
		<div className={classes.base}>
			<div
				style={{
					width: `${Math.max(0, Math.min(100, value))}%`,
				}}
				className={classes.progress}
			></div>
		</div>
	);
};
