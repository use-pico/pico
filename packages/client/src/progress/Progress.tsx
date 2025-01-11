import { type FC } from "react";
import { ProgressCss } from "./ProgressCss";

export namespace Progress {
	export interface Props extends ProgressCss.Props {
		value?: number;
	}
}

export const Progress: FC<Progress.Props> = ({
	value,
	variant,
	tva = ProgressCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			<div
				style={{ width: `${value}%` }}
				className={tv.progress()}
			></div>
		</div>
	);
};
