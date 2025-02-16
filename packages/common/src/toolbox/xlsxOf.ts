import readXlsxFile from "read-excel-file";
import type { z } from "zod";

export namespace xlsxOf {
	export interface Meta<TValue> {
		header: string;
		value: TValue;
	}

	export interface Props<TSchema extends z.ZodObject<any, any, any, any, any>> {
		sheet: string | number;
		file: File;
		schema: TSchema;
		/**
		 * Map gets pure data from the Excel, without any validations, thus "any" as a type.
		 */
		map?<T>(props: Meta<any>): Meta<T>;
	}

	export type Result<TSchema extends z.ZodObject<any, any, any, any, any>> =
		z.infer<TSchema>[];
}

/**
 * Reads an xlsx file and returns the data as an array of objects.
 */
export const xlsxOf = async <
	TSchema extends z.ZodObject<any, any, any, any, any>,
>({
	sheet,
	file,
	schema,
	map = (props) => props,
}: xlsxOf.Props<TSchema>): Promise<xlsxOf.Result<TSchema>> => {
	const data = await readXlsxFile(file, {
		sheet,
	});
	if (!data) {
		return [];
	}

	const header = data.shift();
	if (!header) {
		return [];
	}

	return data
		.map((row) => {
			const item = row.reduce(
				(acc, cell, i) => {
					const { header: $header, value } = map({
						header: `${header[i]}`,
						value: cell,
					});
					acc[$header] = value;
					return acc;
				},
				{} as Record<string | number, any>,
			);
			const validate = schema.safeParse(item);
			if (!validate.success!) {
				console.warn("Invalid row", {
					item,
					error: validate.error.issues,
				});
				return undefined;
			}
			return validate.data;
		})
		.filter(Boolean);
};
