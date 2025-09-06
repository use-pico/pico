import type { linkTo } from "@use-pico/common";
import { type FC, useCallback, useEffect, useState } from "react";
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
			// biome-ignore lint/correctness/useHookAtTopLevel: Inside a component
			const [count, setCount] = useState(files.length);

			// biome-ignore lint/correctness/useHookAtTopLevel: Inside a component
			const $onStart = useCallback<NonNullable<useUpload.onStart>>(
				async (event) => {
					return onStart?.(event);
				},
				[
					onStart,
				],
			);

			// biome-ignore lint/correctness/useHookAtTopLevel: Inside a component
			const $onFinish = useCallback<NonNullable<useUpload.onFinish>>(
				async (event) => {
					remove(event.file);
					setCount((prev) => prev - 1);
					return onFinish?.(event);
				},
				[
					remove,
					onFinish,
				],
			);

			// biome-ignore lint/correctness/useHookAtTopLevel: Inside a component
			const $onError = useCallback<() => void>(() => {
				setCount((prev) => prev - 1);
			}, []);

			// biome-ignore lint/correctness/useHookAtTopLevel: Inside a component
			useEffect(() => {
				if (count <= 0) {
					clear();
					onCompleted?.();
				}
			}, [
				onCompleted,
				clear,
				count,
			]);

			return (
				<div
					className={
						"flex flex-col items-center justify-center h-full"
					}
				>
					<div
						className={
							"flex flex-col items-center justify-center h-full"
						}
					>
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
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "secondary",
								}),
							})}
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
		[
			onStart,
			onCompleted,
			onFinish,
			path,
			chunkHref,
			commitHref,
		],
	);

	return <JustDropZone {...props}>{children}</JustDropZone>;
};
