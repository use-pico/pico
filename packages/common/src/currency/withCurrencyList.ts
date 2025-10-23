export namespace withCurrencyList {
	export interface Info {
		code: string;
		symbol: string;
		name: string;
	}

	export interface Props {
		locale: string;
	}
}

const symbolOf = (locale: string, code: string): string => {
	const nf = new Intl.NumberFormat(locale, {
		style: "currency",
		currency: code,
		currencyDisplay: "symbol",
	});
	return (
		nf.formatToParts(1).find((p) => p.type === "currency")?.value ?? code
	);
};

export const withCurrencyList = ({
	locale,
}: withCurrencyList.Props): withCurrencyList.Info[] => {
	const codes = Intl.supportedValuesOf("currency");
	const name = new Intl.DisplayNames(locale, {
		type: "currency",
		style: "long",
	});

	return codes.map((code) => {
		return {
			code,
			symbol: symbolOf(locale, code),
			name: name.of(code) ?? "unknown",
		} satisfies withCurrencyList.Info;
	});
};
