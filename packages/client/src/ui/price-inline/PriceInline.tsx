import { toLocaleNumber } from "@use-pico/common/to-locale-number";
import { translator } from "@use-pico/common/translator";
import type { FC } from "react";

export namespace PriceInline {
	export interface Props extends Omit<toLocaleNumber.Props, "number"> {
		price: number | null | undefined;
		withVat?: boolean | null | undefined;
	}
}

export const PriceInline: FC<PriceInline.Props> = ({
	price,
	withVat,
	minimumFractionDigits = 0,
	maximumFractionDigits = 4,
	style = "currency",
	trailingZeroDisplay = "stripIfInteger",
	currencyDisplay = "narrowSymbol",
	currencySign = "standard",
	...props
}) => {
	if (withVat !== undefined) {
		return (
			<div className={"flex flex-row gap-2 items-center"}>
				<div>
					{toLocaleNumber({
						style,
						currencyDisplay,
						currencySign,
						number: price,
						minimumFractionDigits,
						maximumFractionDigits,
						trailingZeroDisplay,
						...props,
					})}
				</div>
				<div>
					{withVat
						? translator.rich("With VAT")
						: translator.rich("Without VAT")}
				</div>
			</div>
		);
	}

	return toLocaleNumber({
		style,
		currencyDisplay,
		currencySign,
		number: price,
		minimumFractionDigits,
		maximumFractionDigits,
		trailingZeroDisplay,
		...props,
	});
};
