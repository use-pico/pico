import type { linkTo } from "@use-pico/common";
import { useCallback, useEffect, useState, type FC } from "react";
import { Button } from "../button/Button";
import { TrashIcon } from "../icon/TrashIcon";
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
		/**
		 * When all the files are uploaded.
		 */
		onCompleted?(): void;
	}
}

export const DropZone: FC<DropZone.Props> = ({
	path,
	chunkHref,
	commitHref,
	onStart,
	onFinish,
	onCompleted,
	...props
}) => {
	const children = useCallback<NonNullable<JustDropZone.Props["children"]>>(
		({ files, clear, remove }) => {
			const [count, setCount] = useState(files.length);

			const $onStart = useCallback<NonNullable<useUpload.onStart>>(
				async (event) => {
					return onStart?.(event);
				},
				[onStart],
			);
			const $onFinish = useCallback<NonNullable<useUpload.onFinish>>(
				async (event) => {
					remove(event.file);
					setCount((prev) => prev - 1);
					return onFinish?.(event);
				},
				[onFinish],
			);
			const $onError = useCallback<() => void>(() => {
				setCount((prev) => prev - 1);
			}, []);

			useEffect(() => {
				if (count <= 0) {
					clear();
					onCompleted?.();
				}
			}, [count]);

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
									onError={$onError}
									chunkHref={chunkHref}
									commitHref={commitHref}
								/>
							);
						})}
					</div>
					<div>
						<Button
							iconEnabled={TrashIcon}
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
		},
		[path, chunkHref, commitHref],
	);

	return (
		<JustDropZone
			{...props}
			children={children}
		/>
	);
};
