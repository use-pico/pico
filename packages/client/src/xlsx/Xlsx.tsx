import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "@tanstack/react-router";
import { xlsxOf } from "@use-pico/common";
import { useState, type FC } from "react";
import { JustDropZone } from "../just-drop-zone/JustDropZone";
import { SheetSelect } from "./SheetSelect";

export namespace Xlsx {
	export interface Result {
		sheet: any[] | undefined;
		data: Record<string | number, any[] | undefined>;
	}

	export interface Props extends JustDropZone.Props {
		load?: (string | number)[];
		map?(result: Result): Promise<Result>;
		onSuccess?(result: Result): Promise<void>;
		children?(result: Result): ReactNode;
	}
}

export const Xlsx: FC<Xlsx.Props> = ({ load = [], map = (result) => result, onSuccess = () => null, children = () => null, ...props }) => {
	const [file, setFile] = useState<File | null>(null);
	const [sheet, setSheet] = useState<string | null>(null);

	const data = useQuery({
		queryKey: ["xlsx", file?.name],
		queryFn: async () => {
			const result: Record<string | number, any[] | undefined> = {};

			for await (const item of load) {
				result[item] = await xlsxOf({ file: file!, sheet: item });
			}

			const data = await map({
				sheet: await xlsxOf({ file: file!, sheet: sheet! }),
				data: result,
			} satisfies Xlsx.Result);

			await onSuccess(data);

			return data;
		},
		enabled: Boolean(file) && Boolean(sheet),
	});

	if (data.isSuccess) {
		return children(data.data);
	}

	return file ? (
		<>
			<SheetSelect
				file={file}
				onItem={({ name }) => {
					setSheet(name);
				}}
			/>
		</>
	) : (
		<JustDropZone
			accept={{
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
				"application/x-excel": [".xlsx"],
				"application/vnd.ms-excel": [".xlsx"],
			}}
			onDropAccepted={async (files) => {
				const [file] = files;
				if (!file) {
					return;
				}

				setFile(file);
			}}
			{...props}
		/>
	);
};
