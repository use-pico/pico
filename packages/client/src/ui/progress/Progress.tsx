import type { ComponentProps, FC } from "react";
import { asProgress } from "./asProgress";

export namespace Progress {
	export interface Props extends asProgress.PropsEx<ComponentProps<"div">> {
		value: number;
	}
}

export const Progress: FC<Progress.Props> = ({
	value,
	size,
	tone,
	theme,
	className,
	...props
}) => {
	return (
		<div
			{...asProgress({
				size,
				tone,
				theme,
				//
				className,
			})}
			{...props}
		>
			<div
				data-ui="Progress-progress"
				style={{
					width: `${Math.max(0, Math.min(100, value))}%`,
				}}
			></div>
		</div>
	);
};
