import type { FC } from "react";
import { Progress } from "../progress/Progress";
import { useUpload } from "./useUpload";

/**
 * Low level upload component; uses `useUpload` hook under the hood.
 *
 * **Keep in mind** this component executes upload as soon as it gets mounted.
 *
 * @group ui
 */
export namespace Upload {
	export interface Props extends useUpload.Props {
		progressProps?: Omit<Progress.Props, "value">;
	}
}

export const Upload: FC<Upload.Props> = ({ progressProps, ...props }) => {
	const { isRunning, isSuccess, isError, percent } = useUpload(props);
	return (
		<div className={"w-full"}>
			<Progress
				{...progressProps}
				cls={({ what }) => ({
					slot: {
						progress: what.css(
							[
								isSuccess && "bg-green-400",
								isRunning && "bg-blue-400",
								isError && "bg-red-400",
							].filter(Boolean),
						),
					},
				})}
				value={percent()}
			/>
		</div>
	);
};
