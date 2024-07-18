import { cssOf, type FileSchema, type WithEntity } from "@use-pico/common";
import type { FC } from "react";

export namespace FileInline {
	export interface Props extends WithEntity.Schema<FileSchema> {}
}

export const FileInline: FC<FileInline.Props> = ({ entity }) => {
	return (
		<div className={cssOf("flex flex-row gap-2 items-center")}>
			<div className={cssOf("text-slate-400")}>{entity.path}</div>
			<div className={cssOf("font-semibold")}>{entity.name}</div>
		</div>
	);
};
