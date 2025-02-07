import type { linkTo } from "@use-pico/common";
import { useCallback, type FC } from "react";
import { Button } from "../button/Button";
import { Tx } from "../tx/Tx";
import { Upload } from "../upload/Upload";
import type { useUpload } from "../upload/useUpload";
import { JustDropZone } from "./JustDropZone";

export namespace DropZone {
	export interface Props extends JustDropZone.Props {
		path: string;
		chunkHref: linkTo.Props;
		commitHref: linkTo.Props;
		onStart?: useUpload.onStart;
		/**
		 * Called for each file when it's uploaded.
		 */
		onFinish?: useUpload.onFinish;
	}
}

export const DropZone: FC<DropZone.Props> = ({
	path,
	chunkHref,
	commitHref,
	onStart,
	onFinish,
	...props
}) => {
	return (
		<JustDropZone {...props}>
			{({ files, clear }) => {
				/**
				 * TODO Track uploaded files, fire an event when all of them are uploaded (prevent re-renders/re-mounts).
				 */

				const $onStart = useCallback<NonNullable<useUpload.onStart>>(
					async (event) => {
						return onStart?.(event);
					},
					[onStart],
				);
				const $onFinish = useCallback<NonNullable<useUpload.onFinish>>(
					async (event) => {
						return onFinish?.(event);
					},
					[onFinish],
				);

				return (
					<div className={"flex flex-col items-center justify-center h-full"}>
						<div className={"flex flex-col items-center justify-center h-full"}>
							{files.map((file) => {
								return (
									<Upload
										key={file.name}
										file={file}
										path={path}
										onStart={$onStart}
										onFinish={$onFinish}
										chunkHref={chunkHref}
										commitHref={commitHref}
									/>
								);
							})}
						</div>

						<div>
							<Button
								variant={{ variant: "subtle" }}
								onClick={() => {
									clear();
								}}
							>
								<Tx label={"Clear files"} />
							</Button>
						</div>
					</div>
				);
			}}
		</JustDropZone>
	);
};
