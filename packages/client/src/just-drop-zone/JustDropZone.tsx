import { translator } from "@use-pico/common";
import { useState, type FC, type ReactNode } from "react";
import * as dropzone from "react-dropzone";
import { Icon } from "../icon/Icon";
import { UploadIcon } from "../icon/UploadIcon";
import { JustDropZoneCss } from "./JustDropZoneCss";

const { useDropzone } = dropzone;

export namespace JustDropZone {
	export type OnDrop = (files: File[]) => void;
	export type OnError = (error: Error) => void;

	export interface Props
		extends JustDropZoneCss.Props<dropzone.DropzoneOptions> {
		id?: string;
		textTile?: ReactNode;
		textMessage?: ReactNode;
		/**
		 * Renders, when file(s) is dropped.
		 */
		children?: FC<{ files: File[]; clear(): void; remove(file: File): void }>;
	}
}

export const JustDropZone: FC<JustDropZone.Props> = ({
	id,
	accept,
	textTile,
	textMessage,
	variant,
	tva = JustDropZoneCss,
	css,
	children: Children,
	onDropAccepted,
	...props
}) => {
	const [files, setFiles] = useState<File[]>([]);
	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			noClick: true,
			multiple: false,
			accept,
			maxFiles: 1,
			minSize: 0,
			maxSize: 8 * 1024 ** 2,
			onDropAccepted(files, e) {
				setFiles(files);
				onDropAccepted?.(files, e);
			},
			onError(e) {
				console.error(e);
			},
			...props,
		});

	const tv = tva({
		active: isDragActive,
		rejected: isDragReject,
		...variant,
		css,
	}).slots;

	return (
		<div
			{...getRootProps()}
			className={tv.base()}
		>
			<label
				htmlFor={id}
				className={tv.label()}
			>
				<div className={tv.zone()}>
					<Icon
						icon={UploadIcon}
						variant={{ size: "4xl" }}
					/>
					<div className={"mb-2 text-sm font-semibold"}>
						{textTile || translator.rich("Drag 'n' drop a file here")}
					</div>
					{textMessage ?
						<div className={"text-xs"}>{textMessage}</div>
					:	null}
				</div>
				<input
					id={id}
					type={"file"}
					className={"hidden"}
					{...getInputProps()}
				/>
			</label>

			{Children && files && files.length > 0 ?
				<div className={tv.content()}>
					<Children
						files={files}
						clear={() => {
							setFiles([]);
						}}
						remove={(file) => {
							setFiles(files.filter((f) => f !== file));
						}}
					/>
				</div>
			:	null}
		</div>
	);
};
