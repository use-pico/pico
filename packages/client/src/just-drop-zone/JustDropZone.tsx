import { useCls } from "@use-pico/cls";
import { isNonEmptyArray, translator } from "@use-pico/common";
import {
	type FC,
	type ReactNode,
	type Ref,
	useCallback,
	useState,
} from "react";
import * as dropzone from "react-dropzone";
import { Icon } from "../icon/Icon";
import { UploadIcon } from "../icon/UploadIcon";
import { JustDropZoneCls } from "./JustDropZoneCls";

const { useDropzone } = dropzone;

export namespace JustDropZone {
	export type OnDrop = (files: File[]) => void;
	export type OnError = (error: Error) => void;

	export interface ChildrenProps {
		files: [
			File,
			...File[],
		];
		clear(): void;
		remove(file: File): void;
	}

	export interface Props
		extends JustDropZoneCls.Props<dropzone.DropzoneOptions> {
		ref?: Ref<HTMLDivElement>;
		id?: string;
		textTile?: ReactNode;
		textMessage?: ReactNode;
		/**
		 * Renders, when file(s) is dropped.
		 */
		children?: FC<ChildrenProps>;
	}
}

export const JustDropZone: FC<JustDropZone.Props> = ({
	ref,
	id,
	accept,
	textTile,
	textMessage,
	cls = JustDropZoneCls,
	tweak,
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

	const { slots } = useCls(cls, tweak, {
		variant: {
			active: isDragActive,
			rejected: isDragReject,
		},
	});

	const clear = useCallback(() => setFiles([]), []);
	const remove = useCallback(
		(file: File) => setFiles((files) => files.filter((f) => f !== file)),
		[],
	);

	return (
		<div
			ref={ref}
			{...getRootProps()}
			data-ui="JustDropZone-root"
			className={slots.root()}
		>
			{Children && isNonEmptyArray(files) ? (
				<Children
					files={files}
					clear={clear}
					remove={remove}
				/>
			) : (
				<label
					htmlFor={id}
					data-ui="JustDropZone-label"
					className={slots.label()}
				>
					<div
						data-ui="JustDropZone-zone"
						className={slots.zone()}
					>
						<Icon
							icon={UploadIcon}
							size="xl"
						/>
						<div className={"mb-2 text-sm font-semibold"}>
							{textTile ||
								translator.rich("Drag 'n' drop a file here")}
						</div>
						{textMessage ? (
							<div className={"text-xs"}>{textMessage}</div>
						) : null}
					</div>
					<input
						id={id}
						type={"file"}
						className={"hidden"}
						{...getInputProps()}
					/>
				</label>
			)}
		</div>
	);
};
