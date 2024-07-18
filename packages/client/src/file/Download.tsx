import {
	linkTo,
	type FileSchema,
	type IHrefProps,
	type WithEntity,
} from "@use-pico/common";
import JsFileDownloader from "js-file-downloader";
import { useRef, useState, useTransition, type FC } from "react";
import { toast } from "sonner";
import { t } from "../i18n/t";
import { DownloadIcon } from "../icon/DownloadIcon";
import { Button } from "../ui/Button";
import { Progress } from "../ui/Progress";

export namespace Download {
	export interface Props
		extends WithEntity.Schema<FileSchema>,
			Omit<Button.Props, "name"> {
		name?(file: FileSchema.Type): string;
		url(file: FileSchema.Type): IHrefProps;
	}
}

export const Download: FC<Download.Props> = ({
	entity,
	name = (file) => file.name,
	url,
	children,
	...props
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(-1);
	const [, startTransition] = useTransition();

	const downloadRef = useRef(
		new JsFileDownloader({
			url: linkTo(url(entity)),
			nameCallback: () => name(entity),
			autoStart: false,
			process: (event: any) => {
				if (!event.lengthComputable) {
					return;
				}
				setProgress(Math.floor((event.loaded / event.total) * 100));
			},
		}),
	);
	return (
		<Button
			icon={{
				enabled: DownloadIcon,
				disabled: DownloadIcon,
			}}
			variant={"subtle"}
			disabled={isLoading}
			loading={isLoading}
			onClick={() => {
				setIsLoading(true);
				downloadRef.current.start().finally(() => {
					startTransition(() => {
						setIsLoading(false);
						setProgress(-1);
						toast.success(t()`File downloaded`);
					});
				});
			}}
			{...props}
		>
			{children ?
				<>
					{children}
					{progress >= 0 && (
						<Progress
							value={progress}
							size={"sm"}
						/>
					)}
				</>
			:	null}
		</Button>
	);
};
