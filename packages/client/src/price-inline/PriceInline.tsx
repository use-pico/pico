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
	minimumFractionDigits = 2,
	maximumFractionDigits = 4,
	...props
}) => {
	if (withVat !== undefined) {
		return (
			<div className={"flex flex-row gap-2 items-center"}>
				<div>
					{toHumanNumber({
						number: price,
						minimumFractionDigits,
						maximumFractionDigits,
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
		number: price,
		minimumFractionDigits,
		maximumFractionDigits,
		...props,
	});
};
