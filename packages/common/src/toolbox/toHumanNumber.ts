export namespace toHumanNumber {
	export interface Props {
		number?: number | null;
		empty?: string;
		max?: number;
		fraction?: number;
		significant?: number;
	}
}

export function toHumanNumber({
	number,
	empty = "-",
	fraction = 2,
	significant = 2,
}: toHumanNumber.Props): string {
	if (number === null || number === undefined) {
		return empty;
	}
	try {
		return number.toLocaleString(undefined, {
			maximumFractionDigits: fraction,
			maximumSignificantDigits: significant,
		});
	} catch (e) {
		console.error("toHumanNumber", number, e);
		return number.toFixed(2);
	}
}
