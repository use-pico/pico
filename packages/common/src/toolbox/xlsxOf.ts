import readXlsxFile from "read-excel-file";
import { safeParse, z } from "zod";

export namespace xlsxOf {
	export interface Meta<TValue> {
		header: string;
		value: TValue;
	}

	export interface Props<TSchema extends z.core.$ZodObject> {
		/**
		 * Sheet you want to load; if it does not exist, it will return an empty array.
		 */
		sheet: string | number;
		/**
		 * Selected file to load.
		 */
		file: File;
		/**
		 * Schema to validate the row.
		 */
		schema: TSchema;
		/**
		 * If you provide translations, every row will be translated according to the translations.
		 *
		 * This is useful if you have e.g. localized headers in the Excel and you want to map them to a common schema.
		 */
		translations?: Record<string, string>;
		/**
		 * You may provide default values for the schema.
		 *
		 * Those values get validated against the (partial) schema; if it fails, an empty array is returned.
		 */
		defaults?: Partial<z.infer<TSchema>>;
		/**
		 * Map gets pure data from the Excel, without any validations, thus "any" as a type.
		 */
		map?<T>(props: Meta<any>): Meta<T>;
	}
}

/**
 * Reads an xlsx file and returns the data as an array of objects.
 */
export const xlsxOf = async <TSchema extends z.core.$ZodObject>({
	sheet,
	file,
	schema,
	translations,
	defaults = {},
	map = (props) => props,
}: xlsxOf.Props<TSchema>): Promise<z.infer<TSchema>[]> => {
	try {
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
			.map((row, index) => {
				const item = row.reduce(
					(acc, cell, i) => {
						const { header: $header, value } = map({
							header:
								translations?.[`${header[i]}`] ||
								`${header[i]}`,
							value: translations?.[cell as string] || cell,
						});
						acc[$header] = value;

						return acc;
					},
					{} as Record<string | number, any>,
				);
				const validate = safeParse(schema, {
					...defaults,
					...item,
				});
				if (!validate.success) {
					console.warn(
						`${sheet} - #${index + 1}: Invalid row\n${z.prettifyError(validate.error)}`,
					);
					return undefined;
				}
				return validate.data;
			})
			.filter(Boolean) as z.infer<TSchema>[];
	} catch (e) {
		console.warn(e);
		return [];
	}
};
