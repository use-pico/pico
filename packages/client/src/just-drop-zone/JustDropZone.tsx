import { translator } from "@use-pico/common";
import { type FC, type ReactNode } from "react";
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
		text?: {
			title?: ReactNode;
			message?: ReactNode;
		};
	}
}

export const JustDropZone: FC<JustDropZone.Props> = ({
	id,
	accept,
	text,
	variant,
	tva = JustDropZoneCss,
	css,
	...props
}) => {
	const { t } = translator.useRich();

	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			noClick: true,
			multiple: false,
			accept,
			maxFiles: 1,
			minSize: 0,
			maxSize: 8 * 1024 ** 2,
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
					<p className={"mb-2 text-sm font-semibold"}>
						{text?.title || t("Drag 'n' drop a file here")}
					</p>
					{text?.message ?
						<p className={"text-xs"}>{text.message}</p>
					:	null}
				</div>
				<input
					id={id}
					type={"file"}
					className={"hidden"}
					{...getInputProps()}
				/>
			</label>
		</div>
	);
};
