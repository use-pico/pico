import { type FC, memo } from "react";
import { ProgressCss } from "./ProgressCss";

export namespace Progress {
	export interface Props extends ProgressCss.Props {
		value: number;
	}
}

export const Progress: FC<Progress.Props> = memo(
	({ value, variant, tva = ProgressCss, css }) => {
		const tv = tva({ ...variant, css }).slots;

		return (
			<div className={tv.base()}>
				<div
					style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
					className={tv.progress()}
				></div>
			</div>
		);
	},
);
