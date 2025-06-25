import { toHumanNumber, translator } from "@use-pico/common";
import type { FC } from "react";

export namespace PriceInline {
	export interface Props {
		value: {
			price?: number | null;
			withVat?: boolean | null;
		};
	}
}

export const PriceInline: FC<PriceInline.Props> = ({
	value: { price, withVat },
}) => {
	if (withVat !== undefined) {
		return (
			<div className={"flex flex-row gap-2 items-center"}>
				<div>
					{toHumanNumber({
						number: price,
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
	});
};
