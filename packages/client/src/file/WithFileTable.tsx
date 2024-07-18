import {
	toHumanBytes,
	type FileQuerySchema,
	type FileSchema,
	type WithEntity,
} from "@use-pico/common";
import type { FC } from "react";
import { DateTimeInline } from "../i18n/DateTimeInline";
import { t } from "../i18n/t";
import { WithTable } from "../table/WithTable";
import { filterEqual } from "../table/filterEqual";
import { FileInline } from "./FileInline";

export namespace WithFileTable {
	export type Columns =
		| "name"
		| "path"
		| "mime"
		| "size"
		| "created"
		| "ttl"
		| "native";

	export interface Props
		extends Omit<
			WithTable.Props<Columns, FileQuerySchema, FileSchema>,
			"render"
		> {
		download?: FC<WithEntity.Schema<FileSchema>>;
	}
}

export const WithFileTable: FC<WithFileTable.Props> = ({
	download: Download = FileInline,
	...props
}) => {
	return (
		<WithTable<WithFileTable.Columns, FileQuerySchema, FileSchema>
			render={{
				name: {
					title: t()`File name`,
					render: Download,
					sort: "name",
					css: ["w-[50rem]"],
				},
				path: {
					title: t()`File path`,
					render: ({ entity }) => entity.path,
					filters: {
						equal: filterEqual("path", "path"),
					},
					sort: "path",
					css: ["w-[12rem]"],
				},
				size: {
					title: t()`File size`,
					render: ({ entity }) => toHumanBytes(entity.size),
					sort: "size",
					css: ["w-[12rem]"],
				},
				mime: {
					title: t()`File mime type`,
					render: ({ entity }) => entity.mime,
					sort: "mime",
					css: ["w-[32rem]"],
				},
				created: {
					title: t()`Created`,
					render: ({ entity }) => <DateTimeInline date={entity.created} />,
					sort: "created",
					css: ["w-[12rem]"],
				},
				ttl: {
					title: t()`File TTL`,
					render: ({ entity }) => entity.ttl,
					css: ["w-[12rem]"],
				},
				native: {
					title: t()`File native path`,
					render: ({ entity }) => entity.native,
					css: ["w-[64rem]"],
				},
			}}
			{...props}
		/>
	);
};
