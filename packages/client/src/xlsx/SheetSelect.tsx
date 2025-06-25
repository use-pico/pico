import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { readSheetNames } from "read-excel-file";
import { Select } from "../select/Select";

export namespace SheetSelect {
	export interface SheetType {
		id: string;
		name: string;
	}

	export interface Props extends Select.PropsEx<SheetType> {
		file: File;
	}
}

export const SheetSelect: FC<SheetSelect.Props> = ({ file, ...props }) => {
	const result = useQuery({
		queryKey: [
			"sheet-names",
			file.name,
		],
		queryFn: async () => {
			return readSheetNames(file);
		},
	});

	return result.isSuccess ? (
		<Select<SheetSelect.SheetType>
			items={result.data.map((item) => ({
				id: item,
				name: item,
			}))}
			render={({ entity }) => entity.name}
			{...props}
		/>
	) : (
		<Select
			disabled
			items={[]}
			render={() => null}
			{...props}
		/>
	);
};
