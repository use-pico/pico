import { cssOf, type Css, type FileSchema } from "@use-pico/common";
import { useCallback, useState, type FC, type ReactNode } from "react";
import * as dropzone from "react-dropzone";
import { toast } from "sonner";
import { t } from "../i18n/t";
import { UploadIcon } from "../icon/UploadIcon";
import { Icon } from "../ui/Icon";
import { Upload } from "./Upload";

const { useDropzone } = dropzone;

export namespace DropZone {
	export type OnDrop = (files: File[]) => void;
	export type OnError = (error: Error) => void;

	export interface Props extends Css<"root"> {
		id?: string;
		accept?: dropzone.Accept;
		path: string;
		text?: {
			title?: ReactNode;
			message?: ReactNode;
		};
		options?: Omit<
			dropzone.DropzoneOptions,
			"onDropAccepted" | "onError" | "accept"
		>;
		upload?: Omit<Upload.Props, "file" | "path" | "onFinish">;
		onUpload?(file: FileSchema.Type): void;
	}
}

export const DropZone: FC<DropZone.Props> = ({
	id = "drop-zone",
	accept,
	path,
	text,
	options,
	upload,
	onUpload,
	css,
}) => {
	const [file, setFile] = useState<File>();
	const onDropAccepted: DropZone.OnDrop = useCallback((files) => {
		setFile(undefined);
		setTimeout(() => setFile(files[0]), 0);
	}, []);
	const onError: DropZone.OnError = useCallback((error) => {
		console.error(error);
	}, []);
	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			noClick: true,
			multiple: false,
			accept,
			onDropAccepted,
			onError,
			maxFiles: 1,
			minSize: 0,
			maxSize: 8 * 1024 ** 2,
			...options,
		});

	return (
		<div
			{...getRootProps()}
			className={cssOf("flex items-center justify-center w-full", css?.root)}
		>
			<label
				htmlFor={id}
				className={cssOf(
					"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
					isDragActive && "border-blue-300 bg-blue-50",
					isDragReject && "border-red-300 bg-red-50 cursor-not-allowed",
				)}
			>
				<div
					className={cssOf(
						"flex flex-col items-center justify-center pt-5 pb-6 text-slate-500",
						isDragActive && "text-blue-400",
						isDragReject && "text-red-400",
					)}
				>
					<Icon
						icon={UploadIcon}
						size={"4xl"}
					/>
					<p className={"mb-2 text-sm font-semibold"}>
						{text?.title || t()`Drag 'n' drop a file here`}
					</p>
					{text?.message ?
						<p className={"text-xs"}>{text.message}</p>
					:	null}
					{file ?
						<Upload
							file={file}
							path={path}
							replace
							onFinish={async ({ file }) => {
								setFile(undefined);
								onUpload?.(file);
								toast.success(t()`File uploaded successfully`);
							}}
							{...upload}
						/>
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
