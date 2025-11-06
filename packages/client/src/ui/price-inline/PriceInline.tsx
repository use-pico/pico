import { toLocaleNumber } from "@use-pico/common/to-locale-number";
import type { FC } from "react";
import { Mx } from "../mx/Mx";

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
					<Mx label={withVat ? "With VAT" : "Without VAT"} />
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
