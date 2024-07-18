import type { FC } from "react";
import { Progress } from "../ui/Progress";
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
		progress?: Omit<Progress.Props, "value">;
	}
}

export const Upload: FC<Upload.Props> = ({ progress, ...props }) => {
	const { isRunning, isSuccess, isError, percent } = useUpload(props);
	return (
		<Progress
			{...progress}
			css={{
				progress: [
					isSuccess && "bg-green-400",
					isRunning && "bg-blue-400",
					isError && "bg-red-400",
				],
			}}
			value={percent()}
		/>
	);
};
