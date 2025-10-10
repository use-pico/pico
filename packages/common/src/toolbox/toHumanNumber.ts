export namespace toHumanNumber {
	export interface Props extends Intl.NumberFormatOptions {
		number?: number | null;
		empty?: string;
	}
}

export function toHumanNumber({
	number,
	empty = "-",
	...props
}: toHumanNumber.Props): string {
	if (number === null || number === undefined) {
		return empty;
	}
	try {
		return number.toLocaleString(undefined, props);
	} catch (e) {
		console.error("toHumanNumber", number, e);
		return number.toFixed(2);
	}
}
