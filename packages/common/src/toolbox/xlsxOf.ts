import readXlsxFile from "read-excel-file";

export namespace xlsxOf {
	export interface Props {
		sheet: string | number;
		file: File;
	}
}

/**
 * Reads an xlsx file and returns the data as an array of objects.
 */
export const xlsxOf = async ({ sheet, file }: xlsxOf.Props) => {
	const data = await readXlsxFile(file, {
		sheet,
	});
	if (!data) {
		return;
	}

	const header = data.shift();
	if (!header) {
		return;
	}

	return data.map((row) =>
		row.reduce((acc, cell, i) => ({ ...acc, [header[i] as string]: cell }), {}),
	);
};
