import type { linkTo } from "@use-pico/common";
import { type FC } from "react";
import { Upload } from "../upload/Upload";
import { JustDropZone } from "./JustDropZone";

export namespace DropZone {
	export interface Props extends JustDropZone.Props {
		path: string;
		chunkHref: linkTo.Props;
		commitHref: linkTo.Props;
	}
}

export const DropZone: FC<DropZone.Props> = ({
	path,
	chunkHref,
	commitHref,
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
									file={file}
									path={path}
									onFinish={async () => {
										clear();
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
