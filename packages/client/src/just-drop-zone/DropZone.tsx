import type { linkTo } from "@use-pico/common";
import { type FC } from "react";
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
				return (
					<div className={"flex flex-col items-center justify-center h-full"}>
						{files.map((file) => {
							return (
								<Upload
									key={file.name}
									file={file}
									path={path}
									onStart={async (event) => {
										onStart?.(event);
									}}
									onFinish={async (event) => {
										clear();
										onFinish?.(event);
									}}
									chunkHref={chunkHref}
									commitHref={commitHref}
								/>
							);
						})}
					</div>
				);
			}}
		</JustDropZone>
	);
};
