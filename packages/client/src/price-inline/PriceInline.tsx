import { toHumanNumber, translator } from "@use-pico/common";
import type { FC } from "react";

export namespace PriceInline {
	export interface Props extends Omit<toHumanNumber.Props, "number"> {
		value: {
			price?: number | null;
			withVat?: boolean | null;
		};
	}
}

export const PriceInline: FC<PriceInline.Props> = ({
	value: { price, withVat },
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
					{toHumanNumber({
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

	return toHumanNumber({
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
