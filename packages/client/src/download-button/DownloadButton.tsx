import { linkTo } from "@use-pico/common";
import JsFileDownloader from "js-file-downloader";
import { type FC, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../button/Button";
import { DownloadIcon } from "../icon/DownloadIcon";
import { Progress } from "../progress/Progress";
import { Tx } from "../tx/Tx";

export namespace DownloadButton {
	export interface Props extends Button.Props {
		toName(): string;
		toUrl(): linkTo.Props;
	}
}

export const DownloadButton: FC<DownloadButton.Props> = ({
	toName,
	toUrl,
	children,
	...props
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(-1);
	const [, startTransition] = useTransition();

	const downloadRef = useRef(
		new JsFileDownloader({
			url: linkTo(toUrl()),
			nameCallback() {
				return toName();
			},
			autoStart: false,
			process(event: ProgressEvent) {
				if (!event.lengthComputable) {
					return;
				}
				setProgress(Math.floor((event.loaded / event.total) * 100));
			},
		}),
	);
	return (
		<Button
			iconEnabled={DownloadIcon}
			iconDisabled={DownloadIcon}
			variant={{
				variant: "light",
				borderless: true,
			}}
			disabled={isLoading}
			loading={isLoading}
			onClick={() => {
				setIsLoading(true);
				toast.promise(
					downloadRef.current.start().finally(() => {
						startTransition(() => {
							setIsLoading(false);
							setProgress(-1);
						});
					}),
					{
						loading: <Tx label={"Downloading file..."} />,
						success: <Tx label={"File downloaded..."} />,
						error: <Tx label={"Cannot download the file..."} />,
					},
				);
			}}
			{...props}
		>
			{children ? (
				<>
					{children}
					{progress >= 0 && (
						<Progress
							value={progress}
							variant={{
								size: "sm",
							}}
						/>
					)}
				</>
			) : null}
		</Button>
	);
};
