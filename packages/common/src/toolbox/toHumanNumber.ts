export namespace toHumanNumber {
	export interface Props extends Intl.NumberFormatOptions {
		locale?: string;
		number?: number | null;
		empty?: string;
	}
}

export function toHumanNumber({
	locale,
	number,
	empty = "-",
	...props
}: toHumanNumber.Props): string {
	if (number === null || number === undefined) {
		return empty;
	}
	try {
		return number.toLocaleString(locale, props);
	} catch (e) {
		console.error("toHumanNumber", number, e);
		return number.toFixed(2);
	}
}
